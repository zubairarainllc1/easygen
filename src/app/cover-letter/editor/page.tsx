
"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams } from 'next/navigation';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import type { CoverLetterData } from "@/lib/types";
import CoverLetterForm from "@/components/cover-letter-form";
import CoverLetterPreview from "@/components/cover-letter-preview";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Download, Eye, Menu, Pencil, BookOpen } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

function CoverLetterEditorPageContent() {
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const pdfRef = useRef<HTMLDivElement>(null);
  const [viewMode, setViewMode] = useState<'edit' | 'preview'>('edit');
  const [isMobile, setIsMobile] = useState(false);
  
  const [template, setTemplate] = useState<"classic" | "modern" | "simple">("classic");
  const [primaryColor, setPrimaryColor] = useState("221 83% 53%");
  const [withProfileImage, setWithProfileImage] = useState(true);

  useEffect(() => {
    const templateParam = searchParams.get('template');
    const colorParam = searchParams.get('color');
    const withProfileImageParam = searchParams.get('withProfileImage') === 'true';

    setWithProfileImage(withProfileImageParam);

    if (templateParam === 'classic' || templateParam === 'modern' || templateParam === 'simple') {
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

  const [coverLetterData, setCoverLetterData] = useState<CoverLetterData>({
    personalInfo: {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "123-456-7890",
      address: "123 Main St, Anytown USA",
      website: "johndoe.com",
      profileImage: withProfileImage ? "https://placehold.co/150x150.png" : "",
    },
    recipientInfo: {
        name: "Jane Smith",
        title: "Hiring Manager",
        company: "Tech Solutions Inc.",
        address: "456 Corporate Blvd, Business City, USA"
    },
    date: new Date(),
    subject: "Application for Senior Software Engineer Position",
    body: `Dear Ms. Smith,\n\nI am writing to express my keen interest in the Senior Software Engineer position at Tech Solutions Inc., which I saw advertised on [Platform]. With my extensive experience in developing scalable web applications and my passion for innovative technologies, I am confident I would be a valuable asset to your team.\n\nIn my previous role at Web Innovators, I was instrumental in [mention a key achievement]. I am particularly drawn to [mention something specific about Tech Solutions Inc.], and I am excited about the opportunity to contribute to your [mention a project or company goal].\n\nMy resume provides further detail on my qualifications and accomplishments. Thank you for your time and consideration. I look forward to the possibility of discussing this exciting opportunity with you.`,
    closing: "Sincerely,"
  });

  useEffect(() => {
    if (withProfileImage) {
      setCoverLetterData(prev => ({...prev, personalInfo: {...prev.personalInfo, profileImage: prev.personalInfo.profileImage || "https://placehold.co/150x150.png"}}));
    } else {
       setCoverLetterData(prev => ({...prev, personalInfo: {...prev.personalInfo, profileImage: ""}}));
    }
  }, [withProfileImage]);


  const generatePdfFromRef = (input: HTMLDivElement | null) => {
    if (input) {
      toast({ title: "Generating PDF...", description: "Please wait a moment." });
      html2canvas(input, {
        scale: 2,
        useCORS: true,
        backgroundColor: null, 
      })
        .then((canvas) => {
          const imgData = canvas.toDataURL("image/png");
          const pdf = new jsPDF("p", "mm", "a4", true);
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
          pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
          pdf.save(`cover-letter-${coverLetterData.personalInfo.name.replace(/\s/g, '_') || "draft"}.pdf`);
          toast({ title: "Success!", description: "Your cover letter has been downloaded." });
        })
        .catch((err) => {
          toast({ variant: "destructive", title: "Error", description: "Failed to generate PDF." });
          console.error(err);
        });
    }
  };

  const handleGeneratePDF = () => {
    if (isMobile && viewMode !== 'preview') {
      setViewMode('preview');
      toast({ title: "Preview opened", description: "The preview is now visible for PDF generation." });

      setTimeout(() => {
        generatePdfFromRef(pdfRef.current);
      }, 500); 
      return;
    }
    generatePdfFromRef(pdfRef.current);
  };
  
  const handlePreview = () => {
    try {
      const previewData = { coverLetterData, template, primaryColor };
      localStorage.setItem('coverLetterPreviewData', JSON.stringify(previewData));
      window.open('/cover-letter/preview', '_blank');
    } catch (error) {
      console.error("Could not open preview", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Could not open preview window."
      })
    }
  };

  const editorAndPreview = (
    <div className="lg:grid lg:grid-cols-12 lg:gap-8">
        <div className={cn("lg:col-span-5 mb-8 lg:mb-0", isMobile && viewMode === 'preview' && "hidden")}>
            <CoverLetterForm coverLetterData={coverLetterData} setCoverLetterData={setCoverLetterData} withProfileImage={withProfileImage} />
        </div>

        <div className={cn("lg:col-span-7 lg:sticky lg:top-24 h-fit", isMobile && viewMode === 'edit' && "hidden")}>
            <Card className="shadow-lg">
                <div ref={pdfRef} className="bg-card printable-content">
                <CoverLetterPreview data={coverLetterData} template={template} primaryColor={primaryColor} />
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
        
        <div className="relative perspective-1000">
            <div className={cn("transition-transform duration-700 ease-in-out", isMobile && "transform-style-3d", isMobile && viewMode === 'preview' ? 'rotate-y-180' : 'rotate-y-0' )}>
                <div className={cn(isMobile && "backface-hidden")}>
                    {editorAndPreview}
                </div>
                {isMobile && (
                    <div className="absolute top-0 left-0 w-full h-full backface-hidden rotate-y-180">
                         {editorAndPreview}
                    </div>
                )}
            </div>
        </div>

        <style jsx global>{`
          .transform-style-3d { transform-style: preserve-3d; }
          .perspective-1000 { perspective: 1000px; }
          .rotate-y-0 { transform: rotateY(0deg); }
          .rotate-y-180 { transform: rotateY(180deg); }
          .backface-hidden { backface-visibility: hidden; }
        `}</style>
      </div>
    </main>
  );
}


export default function CoverLetterEditorPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CoverLetterEditorPageContent />
    </Suspense>
  )
}

    