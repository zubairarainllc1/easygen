
'use client';

import React from 'react';
import { Plus, Trash2, Upload } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { CvData } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

interface CvFormProps {
  cvData: CvData;
  setCvData: (data: CvData) => void;
  withProfileImage: boolean;
}

export default function CvForm({ cvData, setCvData, withProfileImage }: CvFormProps) {
  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCvData({
      ...cvData,
      personalInfo: { ...cvData.personalInfo, [name]: value },
    });
  };

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if(event.target?.result) {
            setCvData({
            ...cvData,
            personalInfo: { ...cvData.personalInfo, profileImage: event.target.result as string },
            });
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  
  const handleSummaryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
     setCvData({ ...cvData, summary: e.target.value });
  }

  const handleExperienceChange = (id: string, field: string, value: string) => {
    const newExperience = cvData.experience.map((exp) =>
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    setCvData({ ...cvData, experience: newExperience });
  };
  
  const addExperience = () => {
    const newExp = { id: Date.now().toString(), company: '', title: '', startDate: '', endDate: '', description: '' };
    setCvData({ ...cvData, experience: [...cvData.experience, newExp] });
  };

  const removeExperience = (id: string) => {
    setCvData({ ...cvData, experience: cvData.experience.filter((exp) => exp.id !== id) });
  };
  
  const handleEducationChange = (id: string, field: string, value: string) => {
    const newEducation = cvData.education.map((edu) =>
      edu.id === id ? { ...edu, [field]: value } : edu
    );
    setCvData({ ...cvData, education: newEducation });
  };

  const addEducation = () => {
    const newEdu = { id: Date.now().toString(), school: '', degree: '', startDate: '', endDate: '' };
    setCvData({ ...cvData, education: [...cvData.education, newEdu] });
  };
  
  const removeEducation = (id: string) => {
     setCvData({ ...cvData, education: cvData.education.filter((edu) => edu.id !== id) });
  };
  
  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const skills = e.target.value.split(',').map(skill => skill.trim());
      setCvData({...cvData, skills });
  }

  return (
    <Card className="shadow-lg h-full">
      <CardHeader>
        <CardTitle className="font-sans text-primary">CV Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Accordion type="multiple" defaultValue={['personal', 'summary', 'experience', 'education', 'skills']} className="w-full">
          <AccordionItem value="personal">
            <AccordionTrigger className="text-lg font-medium text-primary font-sans">Personal Information</AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
              {withProfileImage && (
                <div className="space-y-2">
                    <Label htmlFor="profileImage">Profile Image</Label>
                    <div className="flex items-center gap-4">
                        {cvData.personalInfo.profileImage && <img src={cvData.personalInfo.profileImage} alt="Profile" className="w-16 h-16 rounded-full object-cover"/>}
                        <Input id="profileImage" name="profileImage" type="file" accept="image/*" onChange={handleProfileImageChange} className="w-auto"/>
                    </div>
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" value={cvData.personalInfo.name} onChange={handlePersonalInfoChange} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" value={cvData.personalInfo.email} onChange={handlePersonalInfoChange} />
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" name="phone" value={cvData.personalInfo.phone} onChange={handlePersonalInfoChange} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" name="address" value={cvData.personalInfo.address} onChange={handlePersonalInfoChange} />
              </div>
               <div className="space-y-2">
                <Label htmlFor="website">Website/Portfolio</Label>
                <Input id="website" name="website" value={cvData.personalInfo.website} onChange={handlePersonalInfoChange} />
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="summary">
            <AccordionTrigger className="text-lg font-medium text-primary font-sans">Summary</AccordionTrigger>
            <AccordionContent className="pt-4">
              <div className="space-y-2">
                <Label htmlFor="summary">Professional Summary</Label>
                <Textarea id="summary" value={cvData.summary} onChange={handleSummaryChange} rows={5}/>
              </div>
            </AccordionContent>
          </AccordionItem>
          
          <AccordionItem value="experience">
            <AccordionTrigger className="text-lg font-medium text-primary font-sans">Work Experience</AccordionTrigger>
            <AccordionContent className="pt-4 space-y-4">
              {cvData.experience.map((exp, index) => (
                <div key={exp.id} className="p-4 border rounded-lg space-y-4 relative">
                   <button onClick={() => removeExperience(exp.id)} className="absolute top-2 right-2 p-1 rounded-full hover:bg-destructive/10"><Trash2 className="h-4 w-4 text-destructive"/></button>
                   <div className="space-y-2">
                      <Label htmlFor={`exp-title-${index}`}>Job Title</Label>
                      <Input id={`exp-title-${index}`} value={exp.title} onChange={(e) => handleExperienceChange(exp.id, 'title', e.target.value)} />
                    </div>
                   <div className="space-y-2">
                      <Label htmlFor={`exp-company-${index}`}>Company</Label>
                      <Input id={`exp-company-${index}`} value={exp.company} onChange={(e) => handleExperienceChange(exp.id, 'company', e.target.value)} />
                    </div>
                   <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-2">
                        <Label htmlFor={`exp-start-${index}`}>Start Date</Label>
                        <Input id={`exp-start-${index}`} value={exp.startDate} onChange={(e) => handleExperienceChange(exp.id, 'startDate', e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`exp-end-${index}`}>End Date</Label>
                        <Input id={`exp-end-${index}`} value={exp.endDate} onChange={(e) => handleExperienceChange(exp.id, 'endDate', e.target.value)} />
                      </div>
                   </div>
                   <div className="space-y-2">
                      <Label htmlFor={`exp-desc-${index}`}>Description</Label>
                      <Textarea id={`exp-desc-${index}`} value={exp.description} onChange={(e) => handleExperienceChange(exp.id, 'description', e.target.value)} />
                    </div>
                </div>
              ))}
              <Button onClick={addExperience} variant="outline" className="w-full"><Plus className="mr-2"/> Add Experience</Button>
            </AccordionContent>
          </AccordionItem>

           <AccordionItem value="education">
            <AccordionTrigger className="text-lg font-medium text-primary font-sans">Education</AccordionTrigger>
            <AccordionContent className="pt-4 space-y-4">
              {cvData.education.map((edu, index) => (
                <div key={edu.id} className="p-4 border rounded-lg space-y-4 relative">
                   <button onClick={() => removeEducation(edu.id)} className="absolute top-2 right-2 p-1 rounded-full hover:bg-destructive/10"><Trash2 className="h-4 w-4 text-destructive"/></button>
                   <div className="space-y-2">
                      <Label htmlFor={`edu-school-${index}`}>School/University</Label>
                      <Input id={`edu-school-${index}`} value={edu.school} onChange={(e) => handleEducationChange(edu.id, 'school', e.target.value)} />
                    </div>
                   <div className="space-y-2">
                      <Label htmlFor={`edu-degree-${index}`}>Degree</Label>
                      <Input id={`edu-degree-${index}`} value={edu.degree} onChange={(e) => handleEducationChange(edu.id, 'degree', e.target.value)} />
                    </div>
                   <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-2">
                        <Label htmlFor={`edu-start-${index}`}>Start Year</Label>
                        <Input id={`edu-start-${index}`} value={edu.startDate} onChange={(e) => handleEducationChange(edu.id, 'startDate', e.target.value)} />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`edu-end-${index}`}>End Year</Label>
                        <Input id={`edu-end-${index}`} value={edu.endDate} onChange={(e) => handleEducationChange(edu.id, 'endDate', e.target.value)} />
                      </div>
                   </div>
                </div>
              ))}
              <Button onClick={addEducation} variant="outline" className="w-full"><Plus className="mr-2"/> Add Education</Button>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="skills">
            <AccordionTrigger className="text-lg font-medium text-primary font-sans">Skills</AccordionTrigger>
            <AccordionContent className="pt-4">
               <div className="space-y-2">
                <Label htmlFor="skills">Skills (comma-separated)</Label>
                <Input id="skills" value={cvData.skills.join(', ')} onChange={handleSkillsChange} />
              </div>
            </AccordionContent>
          </AccordionItem>

        </Accordion>
      </CardContent>
    </Card>
  );
}
