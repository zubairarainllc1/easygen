

"use client";

import { useState, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import type { Invoice } from "@/lib/types";
import InvoiceForm from "@/components/invoice-form";
import InvoicePreview from "@/components/invoice-preview";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Download, Eye } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export default function InvoicePage() {
  const { toast } = useToast();
  const pdfRef = useRef<HTMLDivElement>(null);
  const [isPreviewVisible, setIsPreviewVisible] = useState(true);

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
  });

  const handleGeneratePDF = () => {
    if (!isPreviewVisible) {
      setIsPreviewVisible(true);
      toast({ title: "Preview opened", description: "The invoice preview is now visible for PDF generation." });
      
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
          pdf.save(`invoice-${invoice.invoiceNumber || "draft"}.pdf`);
          toast({ title: "Success!", description: "Your invoice has been downloaded." });
        })
        .catch((err) => {
          toast({ variant: "destructive", title: "Error", description: "Failed to generate PDF." });
          console.error(err);
        });
    }
  }

  const handlePreview = () => {
     setIsPreviewVisible(true);
     toast({ title: "Preview Shown", description: "The invoice preview is now visible." });
  }

  return (
    <main className="min-h-screen bg-background">
       <div className="border-b">
        <div className="mx-auto max-w-screen-2xl p-4 sm:p-6 lg:p-4">
            <Logo />
        </div>
      </div>
      <div className="mx-auto max-w-screen-2xl p-4 sm:p-6 lg:p-8">
        <div className="relative flex flex-1">
          <div className={cn("transition-all duration-500 ease-in-out", isPreviewVisible ? 'w-full lg:w-2/5' : 'w-full')}>
            <InvoiceForm
              invoice={invoice}
              setInvoice={setInvoice}
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
                "lg:w-3/5 transition-all duration-500 ease-in-out sticky top-8 h-fit",
                isPreviewVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-full absolute w-full'
            )}
            style={{ transformOrigin: 'right center' }}
          >
            <Card className="shadow-lg">
              <div ref={pdfRef} className="bg-card">
                <InvoicePreview invoice={invoice} />
              </div>
              <div className="p-4 bg-background/50 border-t flex justify-end gap-2">
                <Button variant="outline" onClick={handlePreview}>
                    <Eye className="mr-2"/>
                    Preview
                </Button>
                <Button onClick={handleGeneratePDF} className="bg-accent text-accent-foreground hover:bg-accent/90">
                    <Download className="mr-2"/>
                    Download
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
