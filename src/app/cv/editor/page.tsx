
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
import { ChevronLeft, ChevronRight, Download, Eye, LayoutTemplate } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function CvEditorPageContent() {
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const pdfRef = useRef<HTMLDivElement>(null);
  const [isPreviewVisible, setIsPreviewVisible] = useState(true);
  
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
    if (!isPreviewVisible) {
      setIsPreviewVisible(true);
      toast({ title: "Preview opened", description: "The CV preview is now visible for PDF generation." });

      setTimeout(() => {
        generatePdfFromRef(pdfRef.current);
      }, 500); 
      return;
    }
    generatePdfFromRef(pdfRef.current);
  };
  
  const handlePreview = () => {
    setIsPreviewVisible(true);
    toast({ title: "Preview Shown", description: "The CV preview is now visible." });
  };


  return (
    <main className="min-h-screen bg-muted/50">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container h-14 flex items-center">
            <Logo />
        </div>
      </header>
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="relative flex flex-1">
          <div className={cn("transition-all duration-500 ease-in-out", isPreviewVisible ? "w-full lg:w-2/5" : "w-full")}>
            <CvForm cvData={cvData} setCvData={setCvData} withProfileImage={withProfileImage} />
          </div>

          <div className={cn("mx-4", isPreviewVisible ? "block" : "hidden")}>
            <Separator orientation="vertical" />
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute top-1/2 -translate-y-1/2 rounded-full bg-background z-10"
            style={{ left: isPreviewVisible ? "calc(41.666667% - 1.25rem)" : "calc(100% - 3rem)", transition: "left 0.5s ease-in-out" }}
            onClick={() => setIsPreviewVisible(!isPreviewVisible)}
          >
            {isPreviewVisible ? <ChevronLeft /> : <ChevronRight />}
          </Button>

          <div
            className={cn("lg:w-3/5 transition-all duration-500 ease-in-out sticky top-24 h-fit", isPreviewVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full absolute w-full")}
            style={{ transformOrigin: "right center" }}
          >
            <Card className="shadow-lg">
              <div ref={pdfRef} className="bg-card printable-content">
                <CvPreview cvData={cvData} template={template} primaryColor={primaryColor} />
              </div>
              <div className="p-4 bg-muted/30 border-t flex justify-end gap-2">
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
                  Preview
                </Button>
                <Button onClick={handleGeneratePDF}>
                  <Download />
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


export default function CvEditorPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CvEditorPageContent />
    </Suspense>
  )
}
