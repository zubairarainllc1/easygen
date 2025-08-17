
"use client";

import { useState, useRef, useEffect, Suspense } from "react";
import { useSearchParams } from 'next/navigation';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import type { CvData } from "@/lib/types";
import CvForm from "@/components/cv-form";
import CvPreview from "@/components/cv-preview";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Download, Eye, LayoutTemplate, Menu, Pencil, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

function CvEditorPageContent() {
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const pdfRef = useRef<HTMLDivElement>(null);
  const [viewMode, setViewMode] = useState<'edit' | 'preview'>('edit');
  const [isMobile, setIsMobile] = useState(false);
  
  const [template, setTemplate] = useState<"classic" | "modern" | "minimalist" | "creative" | "professional">("classic");
  const [primaryColor, setPrimaryColor] = useState("221 83% 53%");
  const [withProfileImage, setWithProfileImage] = useState(false);

  useEffect(() => {
    const templateParam = searchParams.get('template');
    const colorParam = searchParams.get('color');
    const withProfileImageParam = searchParams.get('withProfileImage') === 'true';

    setWithProfileImage(withProfileImageParam);

    if (templateParam === 'classic' || templateParam === 'modern' || templateParam === 'minimalist' || templateParam === 'creative' || templateParam === 'professional') {
      setTemplate(templateParam);
    }
    if (colorParam) {
      setPrimaryColor(colorParam);
    } else {
        setPrimaryColor("221 83% 53%");
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

  const [cvData, setCvData] = useState<CvData>({
    personalInfo: {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "123-456-7890",
      address: "123 Main St, Anytown USA",
      website: "johndoe.com",
      profileImage: withProfileImage ? "https://placehold.co/150x150.png" : "",
    },
    summary:
      "A highly motivated and results-oriented professional with a proven track record of success in fast-paced environments. Seeking a challenging role to leverage my skills in project management and software development.",
    experience: [
      {
        id: "1",
        company: "Tech Solutions Inc.",
        title: "Senior Software Engineer",
        startDate: "Jan 2020",
        endDate: "Present",
        description:
          "- Led the development of a new client-facing web application, resulting in a 20% increase in user engagement.\n- Mentored junior engineers and conducted code reviews to ensure code quality and best practices.",
      },
       {
        id: "2",
        company: "Web Innovators",
        title: "Software Engineer",
        startDate: "Jun 2017",
        endDate: "Dec 2019",
        description:
          "- Contributed to the development of a large-scale e-commerce platform.\n- Implemented new features and resolved bugs to improve application performance and user experience.",
      },
    ],
    education: [
      {
        id: "1",
        school: "State University",
        degree: "B.S. in Computer Science",
        startDate: "2013",
        endDate: "2017",
      },
    ],
    skills: ["JavaScript", "React", "Node.js", "TypeScript", "SQL"],
  });

  useEffect(() => {
    if (withProfileImage) {
      setCvData(prev => ({...prev, personalInfo: {...prev.personalInfo, profileImage: prev.personalInfo.profileImage || "https://placehold.co/150x150.png"}}));
    } else {
       setCvData(prev => ({...prev, personalInfo: {...prev.personalInfo, profileImage: ""}}));
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
          pdf.save(`cv-${cvData.personalInfo.name.replace(/\s/g, '_') || "draft"}.pdf`);
          toast({ title: "Success!", description: "Your CV has been downloaded." });
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
      toast({ title: "Preview opened", description: "The CV preview is now visible for PDF generation." });

      setTimeout(() => {
        generatePdfFromRef(pdfRef.current);
      }, 500); 
      return;
    }
    generatePdfFromRef(pdfRef.current);
  };
  
  const handlePreview = () => {
    try {
      const previewData = { cvData, template, primaryColor };
      localStorage.setItem('cvPreviewData', JSON.stringify(previewData));
      window.open('/cv/preview', '_blank');
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
          <CvForm cvData={cvData} setCvData={setCvData} withProfileImage={withProfileImage} />
      </div>
  )

  const previewSide = (
      <div className={cn("lg:col-span-7 lg:sticky lg:top-24 h-fit", isMobile && "w-full")}>
          <Card className="shadow-lg">
              <div className={cn("bg-card overflow-x-auto p-4 flex justify-center", isMobile && "h-fit")}>
                <div className={cn(isMobile && "scale-[0.4] origin-top")}>
                  <div ref={pdfRef} className="printable-content min-w-[8.5in]">
                      <CvPreview cvData={cvData} template={template} primaryColor={primaryColor} />
                  </div>
                </div>
              </div>
              <div className="p-4 bg-muted/30 border-t flex flex-wrap justify-end gap-2">
              <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                      <Button variant="outline">
                          <LayoutTemplate/>
                          Template
                      </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                      <DropdownMenuItem onSelect={() => setTemplate("classic")}>Classic</DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => setTemplate("modern")}>Modern</DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => setTemplate("minimalist")}>Minimalist</DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => setTemplate("creative")}>Creative</DropdownMenuItem>
                      <DropdownMenuItem onSelect={() => setTemplate("professional")}>Professional</DropdownMenuItem>
                  </DropdownMenuContent>
              </DropdownMenu>

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
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                {editorSide}
                {previewSide}
            </div>
        )}
        
        {isMobile && (
            <div className="relative overflow-hidden w-full">
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


export default function CvEditorPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CvEditorPageContent />
    </Suspense>
  )
}
