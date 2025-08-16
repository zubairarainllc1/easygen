
'use client';

import type { Invoice } from '@/lib/types';
import ProfessionalInvoice from './invoice-templates/professional';
import ModernInvoice from './invoice-templates/modern';
import SimpleInvoice from './invoice-templates/simple';


interface InvoicePreviewProps {
    invoice: Invoice;
    template: 'professional' | 'modern' | 'simple';
    primaryColor: string;
}

export default function InvoicePreview({ invoice, template, primaryColor }: InvoicePreviewProps) {
  const templates = {
    professional: ProfessionalInvoice,
    modern: ModernInvoice,
    simple: SimpleInvoice,
  };

  const SelectedTemplate = templates[template] || ProfessionalInvoice;
  
  const invoiceStyle = {
    '--primary-invoice': primaryColor
  } as React.CSSProperties;

  return (
    <div className="p-0 bg-card text-card-foreground rounded-lg" style={invoiceStyle}>
      <SelectedTemplate invoice={invoice} />
    </div>
  );
}
