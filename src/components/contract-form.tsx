
'use client';

import React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ContractData } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';

interface ContractFormProps {
  contract: ContractData;
  setContract: (contract: ContractData) => void;
}

export default function ContractForm({ contract, setContract }: ContractFormProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContract({ ...contract, [name]: value });
  };
  
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-sans text-primary">Contract Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
            <Label htmlFor="title">Contract Title</Label>
            <Input id="title" name="title" value={contract.title} onChange={handleInputChange} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="clientName">Client Name</Label>
            <Input id="clientName" name="clientName" value={contract.clientName} onChange={handleInputChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contractorName">Contractor Name</Label>
            <Input id="contractorName" name="contractorName" value={contract.contractorName} onChange={handleInputChange} />
          </div>
        </div>

        <div className="space-y-2">
            <Label>Effective Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn('w-full justify-start text-left font-normal', !contract.effectiveDate && 'text-muted-foreground')}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {contract.effectiveDate ? format(contract.effectiveDate, 'PPP') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={contract.effectiveDate} onSelect={(date) => date && setContract({ ...contract, effectiveDate: date })} initialFocus />
              </PopoverContent>
            </Popover>
        </div>

        <div className="space-y-2">
            <Label htmlFor="scopeOfWork">Scope of Work</Label>
            <Textarea id="scopeOfWork" name="scopeOfWork" value={contract.scopeOfWork} onChange={handleInputChange} rows={5}/>
        </div>

        <div className="space-y-2">
            <Label htmlFor="paymentTerms">Payment Terms</Label>
            <Textarea id="paymentTerms" name="paymentTerms" value={contract.paymentTerms} onChange={handleInputChange} rows={4}/>
        </div>

        <div className="space-y-2">
            <Label htmlFor="termsAndConditions">Terms and Conditions</Label>
            <Textarea id="termsAndConditions" name="termsAndConditions" value={contract.termsAndConditions} onChange={handleInputChange} rows={6}/>
        </div>
      </CardContent>
    </Card>
  );
}
