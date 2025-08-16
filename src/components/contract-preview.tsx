
'use client';

import type { ContractData } from '@/lib/types';
import { format } from 'date-fns';

export default function ContractPreview({ contract }: { contract: ContractData }) {
  const renderSection = (title: string, content: string) => (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-primary border-b pb-2 mb-3">{title}</h3>
      <p className="text-sm text-gray-700 whitespace-pre-wrap">{content}</p>
    </div>
  );

  return (
    <div className="p-8 bg-card text-card-foreground rounded-lg font-serif">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold uppercase tracking-wider">{contract.title || "Contract Agreement"}</h1>
        <p className="text-sm text-muted-foreground mt-2">
          Effective Date: {format(contract.effectiveDate, 'PPP')}
        </p>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Parties Involved</h2>
        <div className="grid grid-cols-2 gap-8 text-sm">
            <div>
                <p className="font-semibold text-primary">Client</p>
                <p>{contract.clientName || 'Client Name'}</p>
            </div>
             <div>
                <p className="font-semibold text-primary">Contractor</p>
                <p>{contract.contractorName || 'Contractor Name'}</p>
            </div>
        </div>
      </div>
      
      {renderSection("1. Scope of Work", contract.scopeOfWork)}
      {renderSection("2. Payment Terms", contract.paymentTerms)}
      {renderSection("3. Terms and Conditions", contract.termsAndConditions)}

      <div className="mt-12">
        <h2 className="text-xl font-bold mb-8 text-center">Signatures</h2>
        <div className="grid grid-cols-2 gap-16 text-sm">
            <div className="border-t pt-2">
                <p className="font-semibold">{contract.clientName}</p>
                <p className="text-gray-500">Client</p>
            </div>
            <div className="border-t pt-2">
                <p className="font-semibold">{contract.contractorName}</p>
                <p className="text-gray-500">Contractor</p>
            </div>
        </div>
      </div>

      <div className="mt-16 text-center text-xs text-muted-foreground">
        <p>This is a legally binding document.</p>
      </div>
    </div>
  );
}
