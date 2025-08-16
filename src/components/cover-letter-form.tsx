
'use client';

import React from 'react';
import type { CoverLetterData } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

interface CoverLetterFormProps {
  coverLetterData: CoverLetterData;
  setCoverLetterData: (data: CoverLetterData) => void;
  withProfileImage: boolean;
}

export default function CoverLetterForm({ coverLetterData, setCoverLetterData, withProfileImage }: CoverLetterFormProps) {
  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCoverLetterData({
      ...coverLetterData,
      personalInfo: { ...coverLetterData.personalInfo, [name]: value },
    });
  };

  const handleRecipientInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCoverLetterData({
      ...coverLetterData,
      recipientInfo: { ...coverLetterData.recipientInfo, [name]: value },
    });
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCoverLetterData({ ...coverLetterData, [name]: value });
  };
  
  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if(event.target?.result) {
            setCoverLetterData({
                ...coverLetterData,
                personalInfo: { ...coverLetterData.personalInfo, profileImage: event.target.result as string },
            });
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  return (
    <Card className="shadow-lg h-full">
      <CardHeader>
        <CardTitle className="font-sans text-primary">Cover Letter Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Accordion type="multiple" defaultValue={['personal', 'recipient', 'letter']} className="w-full">
          <AccordionItem value="personal">
            <AccordionTrigger className="text-lg font-medium text-primary font-sans">Your Information</AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              {withProfileImage && (
                <div className="space-y-2">
                    <Label htmlFor="profileImage">Profile Image</Label>
                    <div className="flex items-center gap-4">
                        {coverLetterData.personalInfo.profileImage && <img src={coverLetterData.personalInfo.profileImage} alt="Profile" className="w-16 h-16 rounded-full object-cover"/>}
                        <Input id="profileImage" name="profileImage" type="file" accept="image/*" onChange={handleProfileImageChange} className="w-auto"/>
                    </div>
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" value={coverLetterData.personalInfo.name} onChange={handlePersonalInfoChange} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" value={coverLetterData.personalInfo.email} onChange={handlePersonalInfoChange} />
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" name="phone" value={coverLetterData.personalInfo.phone} onChange={handlePersonalInfoChange} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" name="address" value={coverLetterData.personalInfo.address} onChange={handlePersonalInfoChange} />
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="recipient">
            <AccordionTrigger className="text-lg font-medium text-primary font-sans">Recipient Information</AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
               <div className="space-y-2">
                <Label htmlFor="recipientName">Recipient Name</Label>
                <Input id="recipientName" name="name" value={coverLetterData.recipientInfo.name} onChange={handleRecipientInfoChange} />
              </div>
               <div className="space-y-2">
                <Label htmlFor="recipientTitle">Recipient Title</Label>
                <Input id="recipientTitle" name="title" value={coverLetterData.recipientInfo.title} onChange={handleRecipientInfoChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input id="company" name="company" value={coverLetterData.recipientInfo.company} onChange={handleRecipientInfoChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="recipientAddress">Company Address</Label>
                <Textarea id="recipientAddress" name="address" value={coverLetterData.recipientInfo.address} onChange={handleRecipientInfoChange} rows={3}/>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="letter">
            <AccordionTrigger className="text-lg font-medium text-primary font-sans">Letter Content</AccordionTrigger>
            <AccordionContent className="pt-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" name="subject" value={coverLetterData.subject} onChange={handleInputChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="body">Body</Label>
                <Textarea id="body" name="body" value={coverLetterData.body} onChange={handleInputChange} rows={15}/>
              </div>
              <div className="space-y-2">
                <Label htmlFor="closing">Closing</Label>
                <Input id="closing" name="closing" value={coverLetterData.closing} onChange={handleInputChange} />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}
