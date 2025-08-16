
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import { ArrowRight, CheckCircle2, Image as ImageIcon, ImageOff, Menu } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const templates = [
  { id: "professional", name: "Professional" },
  { id: "modern", name: "Modern" },
  { id: "simple", name: "Simple" },
];

const colors = [
  { name: "Blue", value: "228 65% 33%" },
  { name: "Green", value: "142 76% 36%" },
  { name: "Orange", value: "25 95% 53%" },
  { name: "Purple", value: "262 84% 59%" },
  { name: "Teal", value: "173 80% 40%" },
  { name: "Red", value: "0 72% 51%" },
  { name: "Indigo", value: "231 48% 48%" },
  { name: "Pink", value: "330 81% 54%" },
  { name: "Gray", value: "220 9% 46%" },
  { name: "Black", value: "0 0% 13%" },
];

export default function InvoiceTemplatePage() {
  const router = useRouter();
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0].id);
  const [selectedColor, setSelectedColor] = useState(colors[0].value);
  const [withCompanyLogo, setWithCompanyLogo] = useState(true);

  const handleNext = () => {
    const params = new URLSearchParams();
    params.set("template", selectedTemplate);
    params.set("color", selectedColor);
    params.set("withCompanyLogo", String(withCompanyLogo));
    router.push(`/invoice/editor?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-muted/50">
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
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight font-sans">Choose Your Invoice Style</h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl">
                Select a template and color scheme to create a professional invoice that matches your brand.
            </p>
        </div>

        <div className="mb-12">
            <h2 className="text-2xl font-semibold text-center mb-6 font-sans">1. Select a Template</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {templates.map((template) => (
                    <div key={template.id} onClick={() => setSelectedTemplate(template.id)} className="cursor-pointer group">
                        <Card className={cn("overflow-hidden transition-all h-36 md:h-48 flex items-center justify-center text-center p-4", selectedTemplate === template.id ? 'ring-2 ring-primary ring-offset-2' : 'hover:shadow-lg')}>
                            <div className="flex flex-col items-center gap-2">
                                <p className="font-medium text-lg capitalize">{template.name}</p>
                                {selectedTemplate === template.id && <CheckCircle2 className="text-primary h-5 w-5"/>}
                            </div>
                        </Card>
                    </div>
                ))}
            </div>
        </div>

        <div className="mb-12">
            <h2 className="text-2xl font-semibold text-center mb-6 font-sans">2. Include Company Logo?</h2>
            <div className="flex justify-center items-center gap-4">
                <ImageOff className={cn("h-8 w-8", !withCompanyLogo ? "text-primary" : "text-muted-foreground")} />
                <Switch
                    id="company-logo-switch"
                    checked={withCompanyLogo}
                    onCheckedChange={setWithCompanyLogo}
                />
                <ImageIcon className={cn("h-8 w-8", withCompanyLogo ? "text-primary" : "text-muted-foreground")} />
            </div>
             <p className="text-center text-muted-foreground mt-2">{withCompanyLogo ? "Invoice will include a company logo." : "Invoice will not include a company logo."}</p>
        </div>


        <div className="mb-12">
            <h2 className="text-2xl font-semibold text-center mb-6 font-sans">3. Pick a Color</h2>
            <div className="flex justify-center flex-wrap gap-4">
                {colors.map((color) => (
                    <button key={color.name} onClick={() => setSelectedColor(color.value)} className={cn("h-10 w-10 md:h-12 md:w-12 rounded-full border-2 transition-all flex items-center justify-center", selectedColor === color.value ? 'border-primary scale-110 ring-2 ring-offset-2 ring-primary' : 'border-transparent hover:scale-105')} style={{ backgroundColor: `hsl(${color.value})`}}>
                       {selectedColor === color.value && <CheckCircle2 className="h-6 w-6 text-white"/>}
                    </button>
                ))}
            </div>
        </div>
        
        <div className="text-center">
            <Button size="lg" onClick={handleNext}>
                Next <ArrowRight className="ml-2" />
            </Button>
        </div>
       </div>
    </div>
  );
}
