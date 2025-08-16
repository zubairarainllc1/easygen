
'use client';

import { useEffect, useState, useRef } from 'react';
import BusinessCardPreview from '@/components/business-card-preview';
import { Skeleton } from '@/components/ui/skeleton';
import type { BusinessCardData } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';

interface PreviewData {
  cardData: BusinessCardData;
  template: 'sleek' | 'minimal' | 'bold';
}

export default function FullScreenBusinessCardPreview() {
  const [previewData, setPreviewData] = useState<PreviewData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const frontRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const data = localStorage.getItem('businessCardPreviewData');
      if (data) {
        setPreviewData(JSON.parse(data));
      }
    } catch (error) {
      console.error("Failed to load preview data", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
        <div className="p-4 md:p-8 space-y-8">
            <Skeleton className="w-[336px] h-[192px] mx-auto" />
            <Skeleton className="w-[336px] h-[192px] mx-auto" />
        </div>
    );
  }

  if (!previewData) {
    return <div className="flex items-center justify-center h-screen text-red-500 text-center p-4">Failed to load business card preview data. Please go back and try again.</div>;
  }

  const handlePrint = () => {
    window.print();
  }

  return (
    <main className="bg-gray-100 p-4 md:p-8 print:p-0 print:bg-white flex flex-col items-center justify-center min-h-screen">
        <div className="fixed top-4 right-4 print:hidden">
            <Button onClick={handlePrint}><Printer className="mr-2"/> Print</Button>
        </div>
        <div className="w-full max-w-md mx-auto space-y-8">
            <h2 className="text-2xl font-bold text-center print:hidden">Front</h2>
            <div className="flex justify-center">
                <BusinessCardPreview 
                    cardData={previewData.cardData} 
                    template={previewData.template} 
                    frontRef={frontRef} 
                    backRef={backRef} 
                    isBack={false}
                    inPreviewPane={false}
                />
            </div>

            <h2 className="text-2xl font-bold text-center print:hidden pt-8 md:pt-20">Back</h2>
             <div className="flex justify-center">
                <BusinessCardPreview 
                    cardData={previewData.cardData} 
                    template={previewData.template} 
                    frontRef={frontRef} 
                    backRef={backRef} 
                    isBack={true}
                    inPreviewPane={false}
                />
            </div>
        </div>

        <style jsx global>{`
          @media print {
            body { -webkit-print-color-adjust: exact; }
            main {
              display: block;
              padding: 1rem;
            }
            .space-y-8 > :not([hidden]) ~ :not([hidden]) {
                margin-top: 2rem !important;
            }
          }
        `}</style>
    </main>
  );
}
