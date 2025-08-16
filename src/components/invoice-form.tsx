'use client';

import React, { useState, useTransition } from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Download, Plus, Trash2, Wand2, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Invoice, InvoiceItem } from '@/lib/types';
import { getSuggestions } from '@/lib/actions';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

interface InvoiceFormProps {
  invoice: Invoice;
  setInvoice: (invoice: Invoice) => void;
  onGeneratePDF: () => void;
}

export default function InvoiceForm({ invoice, setInvoice, onGeneratePDF }: InvoiceFormProps) {
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInvoice({ ...invoice, [name]: value });
  };
  
  const handleItemChange = (id: string, field: keyof Omit<InvoiceItem, 'id'>, value: string | number) => {
    const newItems = invoice.items.map((item) => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    });
    setInvoice({ ...invoice, items: newItems });
  };

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      name: '',
      quantity: 1,
      price: 0,
    };
    setInvoice({ ...invoice, items: [...invoice.items, newItem] });
  };

  const removeItem = (id: string) => {
    setInvoice({ ...invoice, items: invoice.items.filter((item) => item.id !== id) });
  };
  
  const handleAISuggestions = async () => {
    setIsSuggesting(true);
    const draft = `Client: ${invoice.clientName}\nItems already present:\n${invoice.items.map(i => `- ${i.name}`).join('\n')}`;
    try {
      const result = await getSuggestions(draft);
      if(result.length > 0) {
          setSuggestions(result);
          setIsSuggestionsOpen(true);
      } else {
          toast({ variant: "default", title: "AI Suggestion", description: "No new suggestions found based on the current invoice details." });
      }
    } catch (e) {
      toast({ variant: "destructive", title: "Error", description: "Could not fetch AI suggestions." });
    } finally {
      setIsSuggesting(false);
    }
  };

  const addSuggestionToItems = (suggestion: string) => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      name: suggestion,
      quantity: 1,
      price: 0,
    };
    setInvoice({ ...invoice, items: [...invoice.items, newItem] });
    setIsSuggestionsOpen(false);
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-headline text-primary">Invoice Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="invoiceNumber">Invoice Number</Label>
            <Input id="invoiceNumber" name="invoiceNumber" value={invoice.invoiceNumber} onChange={handleInputChange} />
          </div>
          <div className="space-y-2">
            <Label>Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn('w-full justify-start text-left font-normal', !invoice.date && 'text-muted-foreground')}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {invoice.date ? format(invoice.date, 'PPP') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={invoice.date} onSelect={(date) => date && setInvoice({ ...invoice, date })} initialFocus />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium text-primary font-headline">Client Information</h3>
          <div className="space-y-2">
            <Label htmlFor="clientName">Client Name</Label>
            <Input id="clientName" name="clientName" value={invoice.clientName} onChange={handleInputChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="clientEmail">Client Email</Label>
            <Input id="clientEmail" name="clientEmail" type="email" value={invoice.clientEmail} onChange={handleInputChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="clientAddress">Client Address</Label>
            <Textarea id="clientAddress" name="clientAddress" value={invoice.clientAddress} onChange={handleInputChange} />
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
             <h3 className="text-lg font-medium text-primary font-headline">Items</h3>
             <Button variant="outline" size="sm" onClick={handleAISuggestions} disabled={isSuggesting}>
                {isSuggesting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                Suggest
             </Button>
          </div>
          <div className="border rounded-md">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[50%]">Name</TableHead>
                        <TableHead>Qty</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {invoice.items.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>
                                <Input value={item.name} onChange={(e) => handleItemChange(item.id, 'name', e.target.value)} className="h-8" />
                            </TableCell>
                            <TableCell>
                                <Input type="number" value={item.quantity} onChange={(e) => handleItemChange(item.id, 'quantity', parseInt(e.target.value, 10) || 0)} className="h-8 w-16 text-center" />
                            </TableCell>
                            <TableCell>
                                <Input type="number" value={item.price} onChange={(e) => handleItemChange(item.id, 'price', parseFloat(e.target.value) || 0)} className="h-8 w-24 text-right" />
                            </TableCell>
                             <TableCell className="text-right">
                                <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
                                    <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
          </div>
          <Button onClick={addItem} variant="outline" className="mt-2 w-full">
            <Plus className="mr-2 h-4 w-4" /> Add Item
          </Button>
        </div>
        
        <div className="space-y-2">
            <Label htmlFor="taxRate">Tax Rate (%)</Label>
            <Input id="taxRate" name="taxRate" type="number" value={invoice.taxRate} onChange={(e) => setInvoice({...invoice, taxRate: parseFloat(e.target.value) || 0 })} />
        </div>
        
        <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" name="notes" placeholder="Any additional information..." value={invoice.notes} onChange={handleInputChange} />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onGeneratePDF} className="w-full bg-accent text-accent-foreground hover:bg-accent/90 transition-colors">
            <Download className="mr-2 h-4 w-4" />
            Generate Invoice
        </Button>
      </CardFooter>

      <Dialog open={isSuggestionsOpen} onOpenChange={setIsSuggestionsOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>AI Suggestions</DialogTitle>
                <DialogDescription>Click a suggestion to add it as a new item.</DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
                {suggestions.map((s, i) => (
                    <Button key={i} variant="ghost" className="justify-start" onClick={() => addSuggestionToItems(s)}>
                        {s}
                    </Button>
                ))}
            </div>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
