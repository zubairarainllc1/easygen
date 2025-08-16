
'use client';

import React from 'react';
import type { BusinessCardData } from '@/lib/types';
import { Mail, Phone, Globe, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';


// Template Components
const SleekFront = React.forwardRef<HTMLDivElement, { cardData: BusinessCardData }>(({ cardData }, ref) => (
  <div ref={ref} className="w-[336px] h-[192px] bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between" style={{ fontFamily: 'sans-serif' }}>
    <div>
      <h2 className="text-2xl font-bold" style={{ color: cardData.accentColor }}>{cardData.name}</h2>
      <p className="text-sm text-gray-600 font-medium">{cardData.title}</p>
    </div>
    <div className="text-xs text-gray-500 text-right">
      <p className="font-semibold text-base" style={{ color: cardData.accentColor }}>{cardData.companyName}</p>
      <p>{cardData.address}</p>
    </div>
  </div>
));
SleekFront.displayName = "SleekFront";

const SleekBack = React.forwardRef<HTMLDivElement, { cardData: BusinessCardData }>(({ cardData }, ref) => (
  <div ref={ref} className="w-[336px] h-[192px] bg-white rounded-lg shadow-lg p-6 flex items-center" style={{ fontFamily: 'sans-serif' }}>
    <div className="w-1/3 flex justify-center items-center">
        {cardData.logoUrl ? 
            <img src={cardData.logoUrl} alt="Company Logo" data-ai-hint="logo" className="max-w-full h-auto max-h-20" /> : 
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-2xl font-bold" style={{ color: cardData.accentColor }}>
                {cardData.companyName.charAt(0)}
            </div>
        }
    </div>
    <div className="w-2/3 pl-4 border-l-2" style={{ borderColor: cardData.accentColor }}>
        <h3 className="font-bold text-lg leading-tight" style={{ color: cardData.accentColor }}>{cardData.name}</h3>
        <p className="text-xs text-gray-500 mb-2">{cardData.title}</p>
        <div className="text-xs space-y-1 text-gray-700">
            <p className="flex items-center gap-2"><Phone size={12}/> {cardData.phone}</p>
            <p className="flex items-center gap-2"><Mail size={12}/> {cardData.email}</p>
            <p className="flex items-center gap-2"><Globe size={12}/> {cardData.website}</p>
        </div>
    </div>
  </div>
));
SleekBack.displayName = "SleekBack";

const MinimalFront = React.forwardRef<HTMLDivElement, { cardData: BusinessCardData }>(({ cardData }, ref) => (
  <div ref={ref} className="w-[336px] h-[192px] bg-gray-50 rounded-lg shadow-lg p-6 flex flex-col justify-center items-center text-center" style={{ fontFamily: 'sans-serif' }}>
    <h2 className="text-3xl font-light tracking-wider">{cardData.name}</h2>
    <div className="h-px w-16 bg-gray-300 my-2"></div>
    <p className="text-sm text-gray-500 tracking-widest uppercase">{cardData.title}</p>
  </div>
));
MinimalFront.displayName = "MinimalFront";

const MinimalBack = React.forwardRef<HTMLDivElement, { cardData: BusinessCardData }>(({ cardData }, ref) => (
  <div ref={ref} className="w-[336px] h-[192px] bg-gray-50 rounded-lg shadow-lg p-6 flex flex-col justify-center items-center text-center" style={{ fontFamily: 'sans-serif' }}>
    {cardData.logoUrl && <img src={cardData.logoUrl} alt="Company Logo" data-ai-hint="logo" className="max-h-10 mb-4"/>}
    <p className="font-semibold text-lg" style={{ color: cardData.accentColor }}>{cardData.companyName}</p>
    <div className="text-xs text-gray-600 mt-2 space-y-1">
        <p>{cardData.phone}</p>
        <p>{cardData.email}</p>
        <p>{cardData.website}</p>
    </div>
  </div>
));
MinimalBack.displayName = "MinimalBack";

const BoldFront = React.forwardRef<HTMLDivElement, { cardData: BusinessCardData }>(({ cardData }, ref) => (
  <div ref={ref} className="w-[336px] h-[192px] rounded-lg shadow-lg p-6 flex flex-col justify-end" style={{ backgroundColor: cardData.accentColor, fontFamily: 'sans-serif' }}>
    <h2 className="text-3xl font-extrabold text-white">{cardData.name}</h2>
    <p className="text-md font-light text-white opacity-90">{cardData.title}</p>
  </div>
));
BoldFront.displayName = "BoldFront";

const BoldBack = React.forwardRef<HTMLDivElement, { cardData: BusinessCardData }>(({ cardData }, ref) => (
  <div ref={ref} className="w-[336px] h-[192px] bg-white rounded-lg shadow-lg p-6 flex flex-col justify-between" style={{ fontFamily: 'sans-serif' }}>
    <div>
        {cardData.logoUrl ? 
            <img src={cardData.logoUrl} alt="Company Logo" data-ai-hint="logo" className="max-h-8 mb-2" /> :
            <h3 className="text-xl font-bold" style={{ color: cardData.accentColor }}>{cardData.companyName}</h3>
        }
    </div>
    <div className="text-xs text-right text-gray-700 space-y-1">
        <p>{cardData.phone}</p>
        <p>{cardData.email}</p>
        <p>{cardData.website}</p>
        <p className="pt-1 text-gray-500">{cardData.address}</p>
    </div>
  </div>
));
BoldBack.displayName = "BoldBack";


const templates = {
    sleek: { Front: SleekFront, Back: SleekBack },
    minimal: { Front: MinimalFront, Back: MinimalBack },
    bold: { Front: BoldFront, Back: BoldBack },
};

interface BusinessCardPreviewProps {
  cardData: BusinessCardData;
  frontRef: React.RefObject<HTMLDivElement>;
  backRef: React.RefObject<HTMLDivElement>;
  isBack: boolean;
  template: 'sleek' | 'minimal' | 'bold';
  inPreviewPane?: boolean;
}

export default function BusinessCardPreview({ cardData, frontRef, backRef, isBack, template, inPreviewPane = true }: BusinessCardPreviewProps) {
  const { Front, Back } = templates[template] || templates.sleek;
  
  if (!inPreviewPane) {
      return isBack ? <Back cardData={cardData} ref={backRef} /> : <Front cardData={cardData} ref={frontRef} />;
  }

  return (
    <div className="w-[336px] h-[192px] perspective-[1000px]">
        <div className={cn("relative w-full h-full transition-transform duration-700 transform-style-3d", isBack ? 'rotate-y-180' : '')}>
            <div className="absolute w-full h-full backface-hidden">
                <Front cardData={cardData} ref={frontRef}/>
            </div>
            <div className="absolute w-full h-full backface-hidden rotate-y-180">
                <Back cardData={cardData} ref={backRef} />
            </div>
        </div>
         <style jsx global>{`
          .transform-style-3d { transform-style: preserve-3d; }
          .perspective-1000 { perspective: 1000px; }
          .rotate-y-180 { transform: rotateY(180deg); }
          .backface-hidden { backface-visibility: hidden; }
        `}</style>
    </div>
  );
}
