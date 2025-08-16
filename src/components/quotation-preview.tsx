
'use client';

import type { Quotation } from '@/lib/types';
import ProfessionalInvoice from './invoice-templates/professional';
import ModernInvoice from './invoice-templates/modern';
import SimpleInvoice from './invoice-templates/simple';

interface QuotationPreviewProps {
    quotation: Quotation;
    template: 'professional' | 'modern' | 'simple';
    primaryColor: string;
}

export default function QuotationPreview({ quotation, template, primaryColor }: QuotationPreviewProps) {
  const templates = {
    professional: ProfessionalInvoice,
    modern: ModernInvoice,
    simple: SimpleInvoice,
  };

  const SelectedTemplate = templates[template] || ProfessionalInvoice;
  
  const quotationStyle = {
    '--primary-invoice': primaryColor
  } as React.CSSProperties;

  // Adapt quotation to invoice type for template reuse
  const invoiceData = {
    ...quotation,
    invoiceNumber: quotation.quotationNumber,
    // Quotations don't need currency conversion in the same way, but we pass it for consistency
    currency: quotation.currency || 'USD',
  }

  return (
    <div className="p-0 bg-card text-card-foreground rounded-lg" style={quotationStyle}>
      <SelectedTemplate invoice={invoiceData} isQuotation={true} validUntil={quotation.validUntil} />
    </div>
  );
}
