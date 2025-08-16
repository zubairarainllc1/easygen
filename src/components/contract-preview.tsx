
'use client';

import React from 'react';
import type { ContractData } from '@/lib/types';
import { format } from 'date-fns';

const primaryColorStyle = 'hsl(var(--primary-contract))';

const FormalTemplate = ({ contract }: { contract: ContractData }) => (
  <div className="p-8 bg-card text-card-foreground rounded-lg font-serif">
    {contract.companyLogo && (
        <div className="mb-8 text-center">
            <img src={contract.companyLogo} alt="Company Logo" data-ai-hint="logo" className="h-16 w-auto mx-auto"/>
        </div>
    )}
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
              <p className="font-semibold" style={{ color: primaryColorStyle }}>Client</p>
              <p>{contract.clientName || 'Client Name'}</p>
          </div>
            <div>
              <p className="font-semibold" style={{ color: primaryColorStyle }}>Contractor</p>
              <p>{contract.contractorName || 'Contractor Name'}</p>
          </div>
      </div>
    </div>
    
    <div className="mb-6">
      <h3 className="text-lg font-semibold border-b pb-2 mb-3" style={{ borderColor: primaryColorStyle, color: primaryColorStyle }}>1. Scope of Work</h3>
      <p className="text-sm text-gray-700 whitespace-pre-wrap">{contract.scopeOfWork}</p>
    </div>

    <div className="mb-6">
      <h3 className="text-lg font-semibold border-b pb-2 mb-3" style={{ borderColor: primaryColorStyle, color: primaryColorStyle }}>2. Payment Terms</h3>
      <p className="text-sm text-gray-700 whitespace-pre-wrap">{contract.paymentTerms}</p>
    </div>

    <div className="mb-6">
      <h3 className="text-lg font-semibold border-b pb-2 mb-3" style={{ borderColor: primaryColorStyle, color: primaryColorStyle }}>3. Terms and Conditions</h3>
      <p className="text-sm text-gray-700 whitespace-pre-wrap">{contract.termsAndConditions}</p>
    </div>

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

const ModernTemplate = ({ contract }: { contract: ContractData }) => (
    <div className="p-8 bg-card text-card-foreground rounded-lg font-sans">
        <div className="grid grid-cols-3 gap-8">
            <div className="col-span-1" style={{ borderRight: `2px solid ${primaryColorStyle}`}}>
                {contract.companyLogo && (
                    <div className="mb-8">
                        <img src={contract.companyLogo} alt="Company Logo" data-ai-hint="logo" className="h-12 w-auto"/>
                    </div>
                )}
                <h2 className="text-xl font-extrabold mb-6" style={{ color: primaryColorStyle }}>Parties</h2>
                 <div className="space-y-4 text-sm">
                    <div>
                        <p className="font-bold">Client</p>
                        <p className="text-muted-foreground">{contract.clientName}</p>
                    </div>
                    <div>
                        <p className="font-bold">Contractor</p>
                        <p className="text-muted-foreground">{contract.contractorName}</p>
                    </div>
                 </div>
                 <h2 className="text-xl font-extrabold mt-8 mb-6" style={{ color: primaryColorStyle }}>Date</h2>
                 <p className="text-sm text-muted-foreground">{format(contract.effectiveDate, 'PPP')}</p>
            </div>
            <div className="col-span-2 pl-4">
                <h1 className="text-4xl font-bold mb-8">{contract.title}</h1>
                 <div className="space-y-6 text-sm">
                    <div>
                        <h3 className="text-lg font-bold mb-2">1. Scope of Work</h3>
                        <p className="text-muted-foreground whitespace-pre-wrap">{contract.scopeOfWork}</p>
                    </div>
                     <div>
                        <h3 className="text-lg font-bold mb-2">2. Payment Terms</h3>
                        <p className="text-muted-foreground whitespace-pre-wrap">{contract.paymentTerms}</p>
                    </div>
                     <div>
                        <h3 className="text-lg font-bold mb-2">3. Terms & Conditions</h3>
                        <p className="text-muted-foreground whitespace-pre-wrap">{contract.termsAndConditions}</p>
                    </div>
                 </div>

                 <div className="mt-12">
                    <h2 className="text-xl font-bold mb-8">Signatures</h2>
                    <div className="grid grid-cols-2 gap-16 text-sm">
                        <div className="border-t border-dashed pt-2">
                            <p className="font-semibold">{contract.clientName}</p>
                            <p className="text-gray-500">Client</p>
                        </div>
                        <div className="border-t border-dashed pt-2">
                            <p className="font-semibold">{contract.contractorName}</p>
                            <p className="text-gray-500">Contractor</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const SimpleTemplate = ({ contract }: { contract: ContractData }) => (
    <div className="p-8 bg-card text-card-foreground rounded-lg font-sans text-base">
        {contract.companyLogo && (
            <div className="mb-8">
                <img src={contract.companyLogo} alt="Company Logo" data-ai-hint="logo" className="h-14 w-auto"/>
            </div>
        )}
        <h1 className="text-3xl font-bold mb-2">{contract.title}</h1>
        <p className="text-muted-foreground mb-6">Effective Date: {format(contract.effectiveDate, 'PPP')}</p>

        <div className="p-4 bg-muted/50 rounded-lg mb-6 text-sm">
             <h2 className="text-lg font-semibold mb-3">Parties</h2>
             <p><strong>Client:</strong> {contract.clientName}</p>
             <p><strong>Contractor:</strong> {contract.contractorName}</p>
        </div>
        
        <div className="space-y-6">
            <div>
                <h3 className="text-xl font-semibold mb-2" style={{color: primaryColorStyle}}>Scope of Work</h3>
                <p className="text-gray-700 whitespace-pre-wrap">{contract.scopeOfWork}</p>
            </div>
            <div>
                <h3 className="text-xl font-semibold mb-2" style={{color: primaryColorStyle}}>Payment Terms</h3>
                <p className="text-gray-700 whitespace-pre-wrap">{contract.paymentTerms}</p>
            </div>
            <div>
                <h3 className="text-xl font-semibold mb-2" style={{color: primaryColorStyle}}>Terms and Conditions</h3>
                <p className="text-gray-700 whitespace-pre-wrap">{contract.termsAndConditions}</p>
            </div>
        </div>

        <div className="mt-12 text-sm">
            <div className="flex justify-between gap-16">
                <div className="w-1/2">
                    <div className="border-t pt-2 mt-8">
                        <p className="font-semibold">{contract.clientName}</p>
                        <p className="text-gray-500">Client Signature</p>
                    </div>
                </div>
                <div className="w-1/2">
                    <div className="border-t pt-2 mt-8">
                        <p className="font-semibold">{contract.contractorName}</p>
                        <p className="text-gray-500">Contractor Signature</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

interface ContractPreviewProps {
    contract: ContractData;
    template: 'formal' | 'modern' | 'simple';
    primaryColor: string;
}

export default function ContractPreview({ contract, template, primaryColor }: ContractPreviewProps) {

  const templates = {
    formal: FormalTemplate,
    modern: ModernTemplate,
    simple: SimpleTemplate,
  };

  const SelectedTemplate = templates[template] || FormalTemplate;
  
  const contractStyle = {
    '--primary-contract': primaryColor
  } as React.CSSProperties;

  return (
    <div className="p-0 bg-card text-card-foreground rounded-lg" style={contractStyle}>
      <SelectedTemplate contract={contract} />
    </div>
  );
}
