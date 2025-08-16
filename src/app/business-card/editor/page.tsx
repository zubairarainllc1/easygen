
"use client";

import { useState, useRef, Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import type { BusinessCardData } from "@/lib/types";
import BusinessCardForm from "@/components/business-card-form";
import BusinessCardPreview from "@/components/business-card-preview";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Download, Eye, FlipHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

function BusinessCardEditorContent() {
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const frontRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);
  const [isBack, setIsBack] = useState(false);

  const [template, setTemplate] = useState<"sleek" | "minimal" | "bold">("sleek");
  const [withLogo, setWithLogo] = useState(true);

  const [cardData, setCardData] = useState<BusinessCardData>({
    name: "John Doe",
    title: "CEO & Founder",
    companyName: "Creative Solutions",
    email: "john.doe@creativesolutions.com",
    phone: "+1 234 567 890",
    website: "www.creativesolutions.com",
    address: "123 Design Lane, Art City, 54321",
    logoUrl: withLogo ? "https://placehold.co/150x50.png" : "",
    accentColor: "#3b82f6",
  });
  
  useEffect(() => {
    const templateParam = searchParams.get('template');
    const colorParam = searchParams.get('color');
    const withLogoParam = searchParams.get('withLogo') === 'true';

    setWithLogo(withLogoParam);

    if (templateParam === 'sleek' || templateParam === 'minimal' || templateParam === 'bold') {
      setTemplate(templateParam);
    }
    if (colorParam) {
      setCardData(prev => ({...prev, accentColor: colorParam}));
    }
  }, [searchParams]);

  useEffect(() => {
    if (withLogo) {
      setCardData(prev => ({...prev, logoUrl: prev.logoUrl || "https://placehold.co/150x50.png"}));
    } else {
       setCardData(prev => ({...prev, logoUrl: ""}));
    }
  }, [withLogo]);


  const generatePdf = async () => {
    if (frontRef.current && backRef.current) {
        toast({ title: "Generating PDF...", description: "Please wait a moment." });
        try {
            const pdf = new jsPDF({
                orientation: 'landscape',
                unit: 'px',
                format: [frontRef.current.offsetWidth, frontRef.current.offsetHeight]
            });

            // Front
            const canvasFront = await html2canvas(frontRef.current, { scale: 3, useCORS: true });
            const imgDataFront = canvasFront.toDataURL("image/png");
            pdf.addImage(imgDataFront, "PNG", 0, 0, frontRef.current.offsetWidth, frontRef.current.offsetHeight);

            // Back
            pdf.addPage();
            const canvasBack = await html2canvas(backRef.current, { scale: 3, useCORS: true });
            const imgDataBack = canvasBack.toDataURL("image/png");
            pdf.addImage(imgDataBack, "PNG", 0, 0, backRef.current.offsetWidth, backRef.current.offsetHeight);

            pdf.save(`${cardData.name.replace(/\s/g, '_')}_BusinessCard.pdf`);
            toast({ title: "Success!", description: "Your business card has been downloaded." });

        } catch (err) {
            toast({ variant: "destructive", title: "Error", description: "Failed to generate PDF." });
            console.error(err);
        }
    }
  };
  
  const handlePreview = () => {
    try {
      const previewData = { cardData, template };
      localStorage.setItem('businessCardPreviewData', JSON.stringify(previewData));
      window.open('/business-card/preview', '_blank');
    } catch (error) {
      console.error("Could not open preview", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not open preview window."
      })
    }
  };

  return (
    <main className="min-h-screen bg-muted/50">
      <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container h-14 flex items-center">
          <Logo />
        </div>
      </header>
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <BusinessCardForm cardData={cardData} setCardData={setCardData} withLogo={withLogo}/>
          </div>
          <div className="space-y-4 sticky top-24 h-fit">
            <h2 className="text-xl font-semibold text-center">Preview</h2>
            <div className="flex justify-center">
                 <BusinessCardPreview cardData={cardData} frontRef={frontRef} backRef={backRef} isBack={isBack} template={template} />
            </div>
            <div className="p-4 bg-muted/30 border-t flex justify-center gap-2 rounded-b-lg">
                <Button variant="outline" onClick={() => setIsBack(!isBack)}>
                    <FlipHorizontal />
                    {isBack ? "Show Front" : "Show Back"}
                </Button>
                 <Button variant="outline" onClick={handlePreview}>
                  <Eye />
                  Preview
                </Button>
                <Button onClick={generatePdf}>
                    <Download />
                    Download
                </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function BusinessCardEditorPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <BusinessCardEditorContent />
        </Suspense>
    )
}
