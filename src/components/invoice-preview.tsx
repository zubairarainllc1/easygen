'use client';

import type { Invoice } from '@/lib/types';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { format } from 'date-fns';
import { Logo } from './logo';

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

export default function InvoicePreview({ invoice }: { invoice: Invoice }) {
  const subtotal = invoice.items.reduce((acc, item) => acc + item.quantity * item.price, 0);
  const taxAmount = subtotal * (invoice.taxRate / 100);
  const total = subtotal + taxAmount;

  return (
    <div className="p-8 bg-card text-card-foreground rounded-lg">
      <div className="flex justify-between items-start mb-8 flex-wrap gap-4">
        <Logo />
        <div className="text-right flex-shrink-0">
          <h2 className="text-2xl font-bold text-primary font-headline">INVOICE</h2>
          <p className="text-muted-foreground">#{invoice.invoiceNumber}</p>
          <p className="text-muted-foreground mt-1">Date: {format(invoice.date, 'PPP')}</p>
        </div>
      </div>

      <Separator className="my-8" />

      <div className="grid grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="font-semibold mb-2 text-primary">Billed To:</h3>
          <p className="font-bold">{invoice.clientName || 'Client Name'}</p>
          <p>{invoice.clientEmail || 'client@email.com'}</p>
          <p className="whitespace-pre-wrap">{invoice.clientAddress || 'Client Address'}</p>
        </div>
        <div className="text-right">
          <h3 className="font-semibold mb-2 text-primary">From:</h3>
          <p className="font-bold">Your Company Inc.</p>
          <p>your-email@company.com</p>
          <p>123 Business Rd, Suite 100<br/>Business City, 12345</p>
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[50%] bg-muted/50">Item</TableHead>
              <TableHead className="text-center bg-muted/50">QTY</TableHead>
              <TableHead className="text-right bg-muted/50">Price</TableHead>
              <TableHead className="text-right bg-muted/50">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoice.items.length > 0 ? (
              invoice.items.map((item) => (
                <TableRow key={item.id} className="odd:bg-muted/30">
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell className="text-center">{item.quantity}</TableCell>
                  <TableCell className="text-right">{formatCurrency(item.price)}</TableCell>
                  <TableCell className="text-right font-medium">{formatCurrency(item.quantity * item.price)}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                  No items added yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-end mt-8">
        <div className="w-full max-w-sm">
          <div className="flex justify-between py-2">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-medium">{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-muted-foreground">Tax ({invoice.taxRate}%)</span>
            <span className="font-medium">{formatCurrency(taxAmount)}</span>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between py-2 text-lg font-bold text-primary bg-primary/10 px-4 rounded-lg">
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </div>
        </div>
      </div>
      
      {invoice.notes && (
        <>
          <Separator className="my-8" />
          <div>
            <h3 className="font-semibold mb-2 text-primary">Notes</h3>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">{invoice.notes}</p>
          </div>
        </>
      )}

      <div className="mt-16 text-center text-xs text-muted-foreground">
        <p>Thank you for your business!</p>
        <p>Your Company Inc. | 123 Business Rd, Business City, 12345 | your-email@company.com</p>
      </div>
    </div>
  );
}
