
'use client';

import React from 'react';
import type { BusinessCardData } from '@/lib/types';
import { Mail, Phone, Globe, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BusinessCardPreviewProps {
  cardData: BusinessCardData;
  frontRef: React.RefObject<HTMLDivElement>;
  backRef: React.RefObject<HTMLDivElement>;
  isBack: boolean;
}

const BusinessCardFront = React.forwardRef<HTMLDivElement, { cardData: BusinessCardData }>(({ cardData }, ref) => (
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
BusinessCardFront.displayName = "BusinessCardFront";


const BusinessCardBack = React.forwardRef<HTMLDivElement, { cardData: BusinessCardData }>(({ cardData }, ref) => (
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
BusinessCardBack.displayName = "BusinessCardBack";

export default function BusinessCardPreview({ cardData, frontRef, backRef, isBack }: BusinessCardPreviewProps) {
  return (
    <div className="w-[336px] h-[192px] perspective-[1000px]">
        <div className={cn("relative w-full h-full transition-transform duration-700 transform-style-3d", isBack ? 'rotate-y-180' : '')}>
            <div className="absolute w-full h-full backface-hidden">
                <BusinessCardFront cardData={cardData} ref={frontRef}/>
            </div>
            <div className="absolute w-full h-full backface-hidden rotate-y-180">
                <BusinessCardBack cardData={cardData} ref={backRef} />
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
