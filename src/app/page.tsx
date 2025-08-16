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

export default function Home() {
  const { toast } = useToast();
  const pdfRef = useRef<HTMLDivElement>(null);
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
    const input = pdfRef.current;
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
  };

  return (
    <main className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-screen-2xl">
        <div className="mb-8">
          <Logo />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          <div className="lg:col-span-2">
            <InvoiceForm
              invoice={invoice}
              setInvoice={setInvoice}
              onGeneratePDF={handleGeneratePDF}
            />
          </div>
          <div className="lg:col-span-3">
            <Card className="shadow-lg sticky top-8">
              <div ref={pdfRef} className="bg-card">
                <InvoicePreview invoice={invoice} />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
