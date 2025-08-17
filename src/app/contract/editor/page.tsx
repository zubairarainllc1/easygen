
"use client";

import { useState, useRef, Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import type { ContractData } from "@/lib/types";
import ContractForm from "@/components/contract-form";
import ContractPreview from "@/components/contract-preview";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Download, Eye, Menu, Pencil, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

function ContractEditorPageContent() {
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const pdfRef = useRef<HTMLDivElement>(null);
  const [viewMode, setViewMode] = useState<'edit' | 'preview'>('edit');
  const [isMobile, setIsMobile] = useState(false);

  const [template, setTemplate] = useState<"formal" | "modern" | "simple">("formal");
  const [primaryColor, setPrimaryColor] = useState("221 83% 53%");
  const [withCompanyLogo, setWithCompanyLogo] = useState(true);

  const [contract, setContract] = useState<ContractData>({
    title: "Service Agreement",
    clientName: "Client Name",
    contractorName: "Your Name / Company",
    effectiveDate: new Date(),
    scopeOfWork: "- Development of a new website.\n- Deployment and testing.\n- Basic SEO setup.",
    paymentTerms: "- 50% upfront.\n- 50% upon completion.",
    termsAndConditions: "1. All work will be completed within the agreed-upon timeframe...\n2. Any changes to the scope of work must be submitted in writing...",
    companyName: "Your Company Inc.",
    companyLogo: withCompanyLogo ? "https://placehold.co/150x50.png" : "",
  });

  useEffect(() => {
    const templateParam = searchParams.get('template');
    const colorParam = searchParams.get('color');
    const withCompanyLogoParam = searchParams.get('withCompanyLogo') === 'true';

    setWithCompanyLogo(withCompanyLogoParam);

    if (templateParam === 'formal' || templateParam === 'modern' || templateParam === 'simple') {
      setTemplate(templateParam);
    }
    if (colorParam) {
      setPrimaryColor(colorParam);
    }
  }, [searchParams]);

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

  useEffect(() => {
    if (withCompanyLogo) {
      setContract(prev => ({...prev, companyLogo: prev.companyLogo || "https://placehold.co/150x50.png"}));
    } else {
       setContract(prev => ({...prev, companyLogo: ""}));
    }
  }, [withCompanyLogo]);

  const handleGeneratePDF = () => {
    if (isMobile && viewMode !== 'preview') {
      setViewMode('preview');
      toast({ title: "Preview opened", description: "The contract preview is now visible for PDF generation." });
      
      setTimeout(() => {
        generatePdfFromRef(pdfRef.current);
      }, 500);
      return;
    }
    generatePdfFromRef(pdfRef.current);
  };
  
  const generatePdfFromRef = (input: HTMLDivElement | null) => {
    if (input) {
      toast({ title: "Generating PDF...", description: "Please wait a moment." });
      html2canvas(input, {
        scale: 2,
        useCORS: true,
        backgroundColor: "white",
      })
        .then((canvas) => {
          const imgData = canvas.toDataURL("image/png");
          const pdf = new jsPDF("p", "mm", "a4");
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
          pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
          pdf.save(`${contract.title.replace(/\s/g, '_') || "contract"}.pdf`);
          toast({ title: "Success!", description: "Your contract has been downloaded." });
        })
        .catch((err) => {
          toast({ variant: "destructive", title: "Error", description: "Failed to generate PDF." });
          console.error(err);
        });
    }
  }

  const handlePreview = () => {
     try {
      const previewData = { contract, template, primaryColor };
      localStorage.setItem('contractPreviewData', JSON.stringify(previewData));
      window.open('/contract/preview', '_blank');
    } catch (error) {
      console.error("Could not open preview", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not open preview window."
      })
    }
  }

  const editorSide = (
      <div className={cn("lg:col-span-5 mb-8 lg:mb-0", isMobile && "w-full")}>
          <ContractForm
              contract={contract}
              setContract={setContract}
              withCompanyLogo={withCompanyLogo}
          />
      </div>
  );

  const previewSide = (
      <div className={cn("lg:col-span-7 lg:sticky lg:top-24 h-fit", isMobile && "w-full")}>
          <Card className="shadow-lg">
              <div ref={pdfRef} className="bg-card">
              <ContractPreview contract={contract} template={template} primaryColor={primaryColor} />
              </div>
              <div className="p-4 bg-muted/30 border-t flex flex-wrap justify-end gap-2">
              <Button variant="outline" onClick={handlePreview}>
                  <Eye />
                  Full Screen
              </Button>
              <Button onClick={handleGeneratePDF}>
                  <Download />
                  Download
              </Button>
              </div>
          </Card>
      </div>
  );

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
            <div className="flex items-center justify-center space-x-2 mb-6 p-4 border rounded-lg bg-background">
                <Pencil className={cn("h-5 w-5", viewMode === 'edit' ? "text-primary" : "text-muted-foreground")} />
                <Label htmlFor="view-mode-switch" className={cn(viewMode === 'edit' && "text-primary")}>Edit</Label>
                <Switch 
                    id="view-mode-switch" 
                    checked={viewMode === 'preview'} 
                    onCheckedChange={(checked) => setViewMode(checked ? 'preview' : 'edit')}
                />
                <Label htmlFor="view-mode-switch" className={cn(viewMode === 'preview' && "text-primary")}>Preview</Label>
                <BookOpen className={cn("h-5 w-5", viewMode === 'preview' ? "text-primary" : "text-muted-foreground")}/>
            </div>
        )}
        
        {!isMobile && (
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                {editorSide}
                {previewSide}
            </div>
        )}
        
        {isMobile && (
             <div className="relative perspective-1000">
                <div className={cn("transition-transform duration-700 ease-in-out w-full", "transform-style-3d", viewMode === 'preview' ? 'rotate-y-180' : 'rotate-y-0' )}>
                    <div className="backface-hidden">
                        {editorSide}
                    </div>
                    <div className="absolute top-0 left-0 w-full h-full backface-hidden rotate-y-180">
                         {previewSide}
                    </div>
                </div>
            </div>
        )}

        <style jsx global>{`
          .transform-style-3d { transform-style: preserve-3d; }
          .perspective-1000 { perspective: 1000px; }
          .rotate-y-0 { transform: rotateY(0deg); }
          .rotate-y-180 { transform: rotateY(180deg); }
          .backface-hidden { backface-visibility: hidden; -webkit-backface-visibility: hidden; }
        `}</style>
      </div>
    </main>
  );
}

export default function ContractEditorPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ContractEditorPageContent />
        </Suspense>
    )
}
