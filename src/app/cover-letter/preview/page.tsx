
'use client';

import { useEffect, useState } from 'react';
import CoverLetterPreview from '@/components/cover-letter-preview';
import { Skeleton } from '@/components/ui/skeleton';
import type { CoverLetterData } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';

interface PreviewData {
  coverLetterData: CoverLetterData;
  template: 'classic' | 'modern' | 'simple';
  primaryColor: string;
}

export default function FullScreenCoverLetterPreview() {
  const [previewData, setPreviewData] = useState<PreviewData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const data = localStorage.getItem('coverLetterPreviewData');
      if (data) {
        const parsedData = JSON.parse(data);
        parsedData.coverLetterData.date = new Date(parsedData.coverLetterData.date);
        setPreviewData(parsedData);
      }
    } catch (error) {
      console.error("Failed to load preview data", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return (
        <div className="p-4 md:p-8">
            <Skeleton className="w-full h-[1123px] max-w-[8.5in] mx-auto" />
        </div>
    );
  }

  if (!previewData) {
    return <div className="flex items-center justify-center h-screen text-red-500 text-center p-4">Failed to load cover letter preview data. Please go back and try again.</div>;
  }

  const handlePrint = () => {
    window.print();
  }

  return (
    <main className="bg-gray-100 p-4 md:p-8 print:p-0 print:bg-white">
        <div className="fixed top-4 right-4 print:hidden">
            <Button onClick={handlePrint}><Printer className="mr-2"/> Print</Button>
        </div>
        <div className="w-[8.5in] mx-auto bg-white shadow-lg print:shadow-none">
            <CoverLetterPreview data={previewData.coverLetterData} template={previewData.template} primaryColor={previewData.primaryColor} />
        </div>

        <style jsx global>{`
          @media print {
            body { -webkit-print-color-adjust: exact; }
          }
        `}</style>
    </main>
  );
}
