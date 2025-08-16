
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
import { ChevronLeft, ChevronRight, Download, Eye, FileImage, Mail, FileText } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
       <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container h-14 flex items-center">
            <Logo />
        </div>
      </header>
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="relative flex flex-1">
          <div className={cn("transition-all duration-500 ease-in-out", isPreviewVisible ? 'w-full lg:w-2/5' : 'w-full')}>
            <InvoiceForm
              invoice={invoice}
              setInvoice={setInvoice}
              withCompanyLogo={withCompanyLogo}
            />
          </div>

          <div className={cn("mx-4", isPreviewVisible ? 'block' : 'hidden')}>
              <Separator orientation="vertical" />
          </div>
          
          <Button 
            variant="outline" 
            size="icon" 
            className="absolute top-1/2 -translate-y-1/2 rounded-full bg-background z-10"
            style={{ left: isPreviewVisible ? 'calc(41.666667% - 1.25rem)' : 'calc(100% - 3rem)', transition: 'left 0.5s ease-in-out'  }}
            onClick={() => setIsPreviewVisible(!isPreviewVisible)}
            >
              {isPreviewVisible ? <ChevronLeft /> : <ChevronRight />}
          </Button>

          <div 
            className={cn(
                "lg:w-3/5 transition-all duration-500 ease-in-out sticky top-24 h-fit",
                isPreviewVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full absolute w-full'
            )}
            style={{ transformOrigin: 'right center' }}
          >
            <Card className="shadow-lg">
              <div ref={pdfRef} className="bg-card printable-content">
                <InvoicePreview invoice={invoice} template={template} primaryColor={primaryColor} />
              </div>
              <div className="p-4 bg-muted/30 border-t flex justify-end gap-2">
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
