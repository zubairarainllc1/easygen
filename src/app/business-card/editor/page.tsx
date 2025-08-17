
"use client";

import { useState, useRef, Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import type { BusinessCardData } from "@/lib/types";
import BusinessCardForm from "@/components/business-card-form";
import BusinessCardPreview from "@/components/business-card-preview";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Download, Eye, FlipHorizontal, Menu, Pencil, BookOpen } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

function BusinessCardEditorContent() {
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const frontRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);
  const [isBack, setIsBack] = useState(false);
  const [viewMode, setViewMode] = useState<'edit' | 'preview'>('edit');
  const [isMobile, setIsMobile] = useState(false);

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

  useEffect(() => {
    const handleResize = () => {
        const mobile = window.innerWidth < 1024;
        setIsMobile(mobile);
        if (!mobile) {
            setViewMode('edit');
        }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


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

  const editorSide = (
      <div className={cn("lg:col-span-5 mb-8 lg:mb-0", isMobile && "w-full")}>
          <BusinessCardForm cardData={cardData} setCardData={setCardData} withLogo={withLogo}/>
      </div>
  )

  const actionButtons = (
     <div className="p-4 bg-muted/30 flex flex-wrap justify-center gap-2 rounded-b-lg">
        <Button variant="outline" onClick={() => setIsBack(!isBack)}>
            <FlipHorizontal />
            {isBack ? "Show Front" : "Show Back"}
        </Button>
        <Button variant="outline" onClick={handlePreview}>
            <Eye />
            Full Screen
        </Button>
        <Button onClick={generatePdf}>
            <Download />
            Download
        </Button>
    </div>
  );

  const previewSide = (
      <div className={cn("space-y-4 lg:sticky lg:top-24 h-fit", isMobile && "w-full")}>
        <h2 className="text-xl font-semibold text-center lg:block hidden">Preview</h2>
        
        {isMobile && (
             <Card className="mb-4">
                <CardContent className="p-0">
                    {actionButtons}
                </CardContent>
             </Card>
        )}

        <div className="flex justify-center overflow-x-auto">
            <BusinessCardPreview cardData={cardData} frontRef={frontRef} backRef={backRef} isBack={isBack} template={template} />
        </div>
        
        {!isMobile && (
            <div className="p-4 bg-muted/30 border-t flex flex-wrap justify-center gap-2 rounded-b-lg">
                {actionButtons}
            </div>
        )}
      </div>
  )

  return (
    <main className="min-h-screen bg-muted/50">
      <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container h-16 flex items-center justify-between">
          <Logo />
          <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <div className="flex flex-col gap-4 p-4">
                     <Link href="/" className="font-semibold hover:text-primary transition-colors">Home</Link>
                     <Link href="/blog" className="font-semibold hover:text-primary transition-colors">Blog</Link>
                     <Link href="/how-to" className="font-semibold hover:text-primary transition-colors">How To</Link>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
        </div>
      </header>
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        {isMobile && (
            <div className="flex items-center justify-center space-x-2 mb-6 p-2 border rounded-lg bg-background shadow-sm">
                <Button variant={viewMode === 'edit' ? 'secondary' : 'ghost'} onClick={() => setViewMode('edit')} className="flex-1">
                    <Pencil className="mr-2 h-4 w-4" /> Edit
                </Button>
                <Button variant={viewMode === 'preview' ? 'secondary' : 'ghost'} onClick={() => setViewMode('preview')} className="flex-1">
                    <BookOpen className="mr-2 h-4 w-4" /> Preview
                </Button>
            </div>
        )}

        {!isMobile && (
            <div className="lg:grid lg:grid-cols-2 gap-8">
                {editorSide}
                {previewSide}
            </div>
        )}

        {isMobile && (
            <div className="relative overflow-hidden w-full h-fit">
                <div className={cn(
                    "w-full transition-transform duration-500 ease-in-out",
                    viewMode === 'preview' ? '-translate-x-full' : 'translate-x-0'
                )}>
                    {editorSide}
                </div>
                <div className={cn(
                    "absolute top-0 left-0 w-full transition-transform duration-500 ease-in-out",
                    viewMode === 'preview' ? 'translate-x-0' : 'translate-x-full'
                )}>
                    {previewSide}
                </div>
            </div>
        )}
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
