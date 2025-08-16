
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
import { Download, Eye, Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";

function ContractEditorPageContent() {
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const pdfRef = useRef<HTMLDivElement>(null);
  const [isPreviewVisible, setIsPreviewVisible] = useState(true);

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
        if (window.innerWidth < 1024) {
            setIsPreviewVisible(false);
        } else {
            setIsPreviewVisible(true);
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
    if (!isPreviewVisible) {
      setIsPreviewVisible(true);
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
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-5 mb-8 lg:mb-0">
            <ContractForm
              contract={contract}
              setContract={setContract}
              withCompanyLogo={withCompanyLogo}
            />
          </div>

          <div className="lg:col-span-7 lg:sticky lg:top-24 h-fit">
            <div className="flex justify-end mb-4 lg:hidden">
                <Button variant={isPreviewVisible ? "secondary" : "default"} onClick={() => setIsPreviewVisible(!isPreviewVisible)}>
                    {isPreviewVisible ? "Hide Preview" : "Show Preview"}
                </Button>
            </div>
             {isPreviewVisible && (
                <Card className="shadow-lg">
                  <div ref={pdfRef} className="bg-card">
                    <ContractPreview contract={contract} template={template} primaryColor={primaryColor} />
                  </div>
                  <div className="p-4 bg-muted/30 border-t flex flex-wrap justify-end gap-2">
                    <Button variant="outline" onClick={handlePreview}>
                        <Eye />
                        Preview
                    </Button>
                    <Button onClick={handleGeneratePDF}>
                        <Download />
                        Download
                    </Button>
                  </div>
                </Card>
             )}
          </div>
        </div>
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
