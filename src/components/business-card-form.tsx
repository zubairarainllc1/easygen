
'use client';

import React from 'react';
import type { BusinessCardData } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

interface BusinessCardFormProps {
  cardData: BusinessCardData;
  setCardData: (data: BusinessCardData) => void;
}

export default function BusinessCardForm({ cardData, setCardData }: BusinessCardFormProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCardData({
      ...cardData,
      [name]: value,
    });
  };
  
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if(event.target?.result) {
            setCardData({
                ...cardData,
                logoUrl: event.target.result as string,
            });
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="font-sans text-primary">Business Card Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input id="name" name="name" value={cardData.name} onChange={handleChange} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="title">Title/Position</Label>
          <Input id="title" name="title" value={cardData.title} onChange={handleChange} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="companyName">Company Name</Label>
          <Input id="companyName" name="companyName" value={cardData.companyName} onChange={handleChange} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" value={cardData.email} onChange={handleChange} />
            </div>
             <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" name="phone" value={cardData.phone} onChange={handleChange} />
            </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="website">Website</Label>
          <Input id="website" name="website" value={cardData.website} onChange={handleChange} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Textarea id="address" name="address" value={cardData.address} onChange={handleChange} rows={3}/>
        </div>
        <div className="space-y-2">
            <Label htmlFor="logoUrl">Company Logo</Label>
            <div className="flex items-center gap-4">
                {cardData.logoUrl && <img src={cardData.logoUrl} alt="Logo" className="w-24 h-auto bg-gray-200 p-1 rounded"/>}
                <Input id="logoUrl" name="logoUrl" type="file" accept="image/*" onChange={handleLogoChange} className="w-auto"/>
            </div>
        </div>
        <div className="space-y-2">
            <Label htmlFor="accentColor">Accent Color</Label>
            <Input id="accentColor" name="accentColor" type="color" value={cardData.accentColor} onChange={handleChange} className="w-24 h-10 p-1"/>
        </div>
      </CardContent>
    </Card>
  );
}
