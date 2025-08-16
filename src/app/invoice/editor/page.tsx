
"use client";

import { useState, useRef, Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import type { Invoice } from "@/lib/types";
import InvoiceForm from "@/components/invoice-form";
import InvoicePreview from "@/components/invoice-preview";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Download, Eye, FileImage, Mail, FileText, Menu } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";

function InvoiceEditorPageContent() {
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const pdfRef = useRef<HTMLDivElement>(null);
  const [isPreviewVisible, setIsPreviewVisible] = useState(true);

  const [template, setTemplate] = useState<"professional" | "modern" | "simple">("professional");
  const [primaryColor, setPrimaryColor] = useState("221 83% 53%");
  const [withCompanyLogo, setWithCompanyLogo] = useState(true);

  const [invoice, setInvoice] = useState<Invoice>({
    invoiceNumber: "INV-001",
    date: new Date(),
    clientName: "Acme Inc.",
    clientEmail: "contact@acme.com",
    clientAddress: "123 Main Street\nAnytown, USA 12345",
    items: [
      { id: "1", name: "Premium Website Hosting", quantity: 1, price: 120 },
      { id: "2", name: "Domain Name Registration", quantity: 1, price: 15 },
    ],
    taxRate: 8.5,
    notes: "Payment is due within 30 days. Thank you for your business!",
    companyLogo: withCompanyLogo ? "https://placehold.co/150x50.png" : "",
    companyName: "Your Company Inc.",
    companyAddress: "123 Business Rd, Suite 100\nBusiness City, 12345",
    companyEmail: "your-email@company.com",
    currency: "USD",
  });

  useEffect(() => {
    const templateParam = searchParams.get('template');
    const colorParam = searchParams.get('color');
    const withCompanyLogoParam = searchParams.get('withCompanyLogo') === 'true';

    setWithCompanyLogo(withCompanyLogoParam);

    if (templateParam === 'professional' || templateParam === 'modern' || templateParam === 'simple') {
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
      setInvoice(prev => ({...prev, companyLogo: prev.companyLogo || "https://placehold.co/150x50.png"}));
    } else {
       setInvoice(prev => ({...prev, companyLogo: ""}));
    }
  }, [withCompanyLogo]);


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
          pdf.save(`invoice-${invoice.invoiceNumber || "draft"}.pdf`);
          toast({ title: "Success!", description: "Your invoice has been downloaded as a PDF." });
        })
        .catch((err) => {
          toast({ variant: "destructive", title: "Error", description: "Failed to generate PDF." });
          console.error(err);
        });
    }
  };
  
  const generatePngFromRef = (input: HTMLDivElement | null) => {
    if (input) {
      toast({ title: "Generating PNG...", description: "Please wait a moment." });
      html2canvas(input, {
        scale: 3, 
        useCORS: true,
        backgroundColor: "white",
      })
        .then((canvas) => {
          const link = document.createElement('a');
          link.download = `invoice-${invoice.invoiceNumber || "draft"}.png`;
          link.href = canvas.toDataURL("image/png");
          link.click();
           toast({ title: "Success!", description: "Your invoice has been downloaded as a PNG." });
        })
        .catch((err) => {
          toast({ variant: "destructive", title: "Error", description: "Failed to generate PNG." });
          console.error(err);
        });
    }
  }


  const handleDownload = (format: "pdf" | "png") => {
    const generate = format === 'pdf' ? generatePdfFromRef : generatePngFromRef;
    if (!isPreviewVisible) {
      setIsPreviewVisible(true);
      toast({ title: "Preview opened", description: "The invoice preview is now visible for generation." });
      setTimeout(() => {
        generate(pdfRef.current);
      }, 500);
      return;
    }
    generate(pdfRef.current);
  };
  
  const handlePreview = () => {
     try {
      const previewData = { invoice, template, primaryColor };
      localStorage.setItem('invoicePreviewData', JSON.stringify(previewData));
      window.open('/invoice/preview', '_blank');
    } catch (error) {
      console.error("Could not open preview", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not open preview window."
      })
    }
  }
  
  const handleSendEmail = () => {
    toast({
        title: "Feature not available",
        description: "Sending invoices via email is not yet implemented."
    })
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
            <InvoiceForm
              invoice={invoice}
              setInvoice={setInvoice}
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
                    <div ref={pdfRef} className="bg-card printable-content">
                        <InvoicePreview invoice={invoice} template={template} primaryColor={primaryColor} />
                    </div>
                    <div className="p-4 bg-muted/30 border-t flex flex-wrap justify-end gap-2">
                        <Button variant="outline" onClick={handlePreview}>
                            <Eye />
                            Preview
                        </Button>
                        <Button variant="outline" onClick={handleSendEmail}>
                            <Mail />
                            Send Email
                        </Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button>
                                    <Download />
                                    Download
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem onSelect={() => handleDownload("pdf")}>
                                    <FileText className="mr-2"/> As PDF
                                </DropdownMenuItem>
                                <DropdownMenuItem onSelect={() => handleDownload("png")}>
                                    <FileImage className="mr-2"/> As PNG
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    </Card>
             )}
          </div>
        </div>
      </div>
    </main>
  );
}


export default function InvoiceEditorPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <InvoiceEditorPageContent />
        </Suspense>
    )
}
