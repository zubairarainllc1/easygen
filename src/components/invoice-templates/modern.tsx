
'use client';

import type { Invoice } from '@/lib/types';
import { Separator } from '@/components/ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { format } from 'date-fns';

const primaryColor = 'hsl(var(--primary-invoice))';
const primaryColorLight = 'hsla(var(--primary-invoice), 0.1)';

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

export default function ModernInvoice({ invoice, isQuotation = false, validUntil }: TemplateProps) {
  const subtotal = invoice.items.reduce((acc, item) => acc + item.quantity * item.price, 0);
  const taxAmount = subtotal * (invoice.taxRate / 100);
  const total = subtotal + taxAmount;
  const docType = isQuotation ? "QUOTATION" : "INVOICE";
  const docNumberLabel = isQuotation ? "Quotation No." : "Invoice No.";
  const dateLabel = isQuotation ? "Date of Issue" : "Date of Issue";
  const billedToLabel = isQuotation ? "Quote To" : "Billed To";

  return (
    <div className="p-10 bg-card text-card-foreground rounded-lg font-sans">
      <div className="flex justify-between items-start mb-4">
        <div>
            <h1 className="text-4xl font-extrabold" style={{color: primaryColor}}>{invoice.companyName}</h1>
        </div>
        <div className="text-right">
             {invoice.companyLogo && <img src={invoice.companyLogo} alt="Company Logo" data-ai-hint="logo" className="h-12 w-auto ml-auto mb-2" />}
            <p className="text-muted-foreground">
                {invoice.companyAddress.split('\n').map((line, i) => <span key={i}>{line}<br/></span>)}
            </p>
        </div>
      </div>
      
      <div className="w-1/2">
        <h2 className="text-4xl font-bold tracking-tight">{docType}</h2>
        <div className="w-24 h-1.5 rounded-full my-3" style={{backgroundColor: primaryColor}}></div>
      </div>

      <div className="grid grid-cols-3 gap-8 my-8">
        <div>
            <h3 className="font-semibold mb-2 text-sm uppercase tracking-wider" style={{color: primaryColor}}>{billedToLabel}</h3>
             <p className="font-bold">{invoice.clientName || 'Client Name'}</p>
            <p className="text-sm text-muted-foreground">{invoice.clientEmail || 'client@email.com'}</p>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">{invoice.clientAddress || 'Client Address'}</p>
        </div>
        <div>
            <h3 className="font-semibold mb-2 text-sm uppercase tracking-wider" style={{color: primaryColor}}>{docNumberLabel}</h3>
            <p>{invoice.invoiceNumber}</p>
        </div>
        <div>
             <h3 className="font-semibold mb-2 text-sm uppercase tracking-wider" style={{color: primaryColor}}>{dateLabel}</h3>
             <p>{format(invoice.date, 'PPP')}</p>
             {isQuotation && validUntil && <>
                <h3 className="font-semibold mt-4 mb-2 text-sm uppercase tracking-wider" style={{color: primaryColor}}>Valid Until</h3>
                <p>{format(validUntil, 'PPP')}</p>
             </>}
        </div>
      </div>

      <div>
        <Table>
          <TableHeader>
            <TableRow className="border-b" style={{borderColor: primaryColor}}>
              <TableHead className="w-[50%] font-bold text-base" style={{color: primaryColor}}>Description</TableHead>
              <TableHead className="text-center font-bold text-base" style={{color: primaryColor}}>Qty</TableHead>
              <TableHead className="text-right font-bold text-base" style={{color: primaryColor}}>Unit Price</TableHead>
              <TableHead className="text-right font-bold text-base" style={{color: primaryColor}}>Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoice.items.length > 0 ? (
              invoice.items.map((item) => (
                <TableRow key={item.id} className="border-0">
                  <TableCell className="font-medium py-3">{item.name}</TableCell>
                  <TableCell className="text-center py-3">{item.quantity}</TableCell>
                  <TableCell className="text-right py-3">{formatCurrency(item.price)}</TableCell>
                  <TableCell className="text-right font-medium py-3">{formatCurrency(item.quantity * item.price)}</TableCell>
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

       <div className="flex mt-8">
         <div className="w-1/2">
            {invoice.notes && (
                <>
                <h3 className="font-semibold mb-2 text-sm uppercase tracking-wider" style={{color: primaryColor}}>Notes</h3>
                <p className="text-xs text-muted-foreground whitespace-pre-wrap">{invoice.notes}</p>
                </>
            )}
         </div>
        <div className="w-1/2">
            <div className="p-4 rounded-lg" style={{backgroundColor: primaryColorLight}}>
              <div className="flex justify-between py-1 text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between py-1 text-sm">
                <span className="text-muted-foreground">Tax ({invoice.taxRate}%)</span>
                <span className="font-medium">{formatCurrency(taxAmount)}</span>
              </div>
              <Separator className="my-2 bg-gray-300" />
              <div className="flex justify-between py-1 text-lg font-bold" style={{color: primaryColor}}>
                <span>Total</span>
                <span>{formatCurrency(total)}</span>
              </div>
            </div>
        </div>
      </div>
      
      <div className="mt-16 text-center text-xs text-muted-foreground">
        <p>Thank you for your business!</p>
      </div>
    </div>
  );
}
