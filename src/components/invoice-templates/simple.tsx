
'use client';

import type { Invoice } from '@/lib/types';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { format } from 'date-fns';

const primaryColor = 'hsl(var(--primary-invoice))';

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

interface TemplateProps {
    invoice: Invoice;
    isQuotation?: boolean;
    validUntil?: Date;
}

export default function SimpleInvoice({ invoice, isQuotation = false, validUntil }: TemplateProps) {
  const subtotal = invoice.items.reduce((acc, item) => acc + item.quantity * item.price, 0);
  const taxAmount = subtotal * (invoice.taxRate / 100);
  const total = subtotal + taxAmount;
  const docType = isQuotation ? "QUOTATION" : "INVOICE";
  const docNumberLabel = isQuotation ? "Quotation #:" : "Invoice #:";
  const billToLabel = isQuotation ? "Quote To:" : "Bill To:";

  return (
    <div className="p-10 bg-card text-card-foreground rounded-lg font-serif text-sm">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold" style={{color: primaryColor}}>{docType}</h1>
        {invoice.companyLogo && <img src={invoice.companyLogo} data-ai-hint="logo" alt="Company Logo" className="h-14 w-auto" />}
      </div>

      <div className="grid grid-cols-2 gap-8 mb-8">
        <div>
          <p className="font-bold">{invoice.companyName || 'Your Company Inc.'}</p>
          <p className="whitespace-pre-wrap">{invoice.companyAddress || '123 Business Rd, Suite 100\nBusiness City, 12345'}</p>
          <p>{invoice.companyEmail || 'your-email@company.com'}</p>
        </div>
        <div className="text-right">
          <p><strong>{docNumberLabel}</strong> {invoice.invoiceNumber}</p>
          <p><strong>Date:</strong> {format(invoice.date, 'PPP')}</p>
          {isQuotation && validUntil && <p><strong>Valid Until:</strong> {format(validUntil, 'PPP')}</p>}
        </div>
      </div>
      
      <div className="mb-8 p-4 border rounded-md">
        <h3 className="font-semibold mb-2">{billToLabel}</h3>
        <p className="font-bold">{invoice.clientName || 'Client Name'}</p>
        <p className="whitespace-pre-wrap">{invoice.clientAddress || 'Client Address'}</p>
        <p>{invoice.clientEmail || 'client@email.com'}</p>
      </div>

      <div>
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-100">
              <TableHead className="w-[60%]">Item Description</TableHead>
              <TableHead className="text-center">Qty</TableHead>
              <TableHead className="text-right">Rate</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoice.items.length > 0 ? (
              invoice.items.map((item) => (
                <TableRow key={item.id}>
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
        <div className="w-full max-w-xs">
          <div className="flex justify-between py-1">
            <span className="text-muted-foreground">Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="text-muted-foreground">Tax ({invoice.taxRate}%)</span>
            <span>{formatCurrency(taxAmount)}</span>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between py-1 font-bold text-lg" style={{color: primaryColor}}>
            <span>Total</span>
            <span>{formatCurrency(total)}</span>
          </div>
        </div>
      </div>
      
      {invoice.notes && (
        <div className="mt-8">
          <h3 className="font-semibold mb-2">Notes</h3>
          <p className="text-xs text-muted-foreground border p-3 rounded-md whitespace-pre-wrap">{invoice.notes}</p>
        </div>
      )}

      <div className="mt-16 text-center text-xs text-muted-foreground">
        <p>Thank you for your business!</p>
      </div>
    </div>
  );
}
