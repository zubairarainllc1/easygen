
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import { ArrowRight, CheckCircle2, Image as ImageIcon, ImageOff } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const templates = [
  { id: "sleek", name: "Sleek" },
  { id: "minimal", name: "Minimal" },
  { id: "bold", name: "Bold" },
];

const colors = [
  { name: "Blue", value: "#3b82f6" },
  { name: "Green", value: "#22c55e" },
  { name: "Orange", value: "#f97316" },
  { name: "Purple", value: "#8b5cf6" },
  { name: "Teal", value: "#14b8a6" },
  { name: "Red", value: "#ef4444" },
  { name: "Indigo", value: "#6366f1" },
  { name: "Pink", value: "#ec4899" },
  { name: "Gray", value: "#6b7280" },
  { name: "Black", value: "#1f2937" },
];

export default function BusinessCardTemplatePage() {
  const router = useRouter();
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0].id);
  const [selectedColor, setSelectedColor] = useState(colors[0].value);
  const [withLogo, setWithLogo] = useState(true);

  const handleNext = () => {
    const params = new URLSearchParams();
    params.set("template", selectedTemplate);
    params.set("color", selectedColor);
    params.set("withLogo", String(withLogo));
    router.push(`/business-card/editor?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-muted/50">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container h-14 flex items-center">
            <Logo />
        </div>
      </header>
       <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
            <h1 className="text-4xl font-bold tracking-tight font-sans">Design Your Business Card</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
                Choose a style and color to create a professional business card that stands out.
            </p>
        </div>

        <div className="mb-12">
            <h2 className="text-2xl font-semibold text-center mb-6 font-sans">1. Select a Template</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {templates.map((template) => (
                    <div key={template.id} onClick={() => setSelectedTemplate(template.id)} className="cursor-pointer group">
                        <Card className={cn("overflow-hidden transition-all h-48 flex items-center justify-center text-center p-4", selectedTemplate === template.id ? 'ring-2 ring-primary ring-offset-2' : 'hover:shadow-lg')}>
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
            <h2 className="text-2xl font-semibold text-center mb-6 font-sans">2. Include Logo?</h2>
            <div className="flex justify-center items-center gap-4">
                <ImageOff className={cn("h-8 w-8", !withLogo ? "text-primary" : "text-muted-foreground")} />
                <Switch
                    id="logo-switch"
                    checked={withLogo}
                    onCheckedChange={setWithLogo}
                />
                <ImageIcon className={cn("h-8 w-8", withLogo ? "text-primary" : "text-muted-foreground")} />
            </div>
             <p className="text-center text-muted-foreground mt-2">{withLogo ? "Card will include a logo." : "Card will not include a logo."}</p>
        </div>


        <div className="mb-12">
            <h2 className="text-2xl font-semibold text-center mb-6 font-sans">3. Pick an Accent Color</h2>
            <div className="flex justify-center flex-wrap gap-4">
                {colors.map((color) => (
                    <button key={color.name} onClick={() => setSelectedColor(color.value)} className={cn("h-12 w-12 rounded-full border-2 transition-all flex items-center justify-center", selectedColor === color.value ? 'border-primary scale-110 ring-2 ring-offset-2 ring-primary' : 'border-transparent hover:scale-105')} style={{ backgroundColor: color.value }}>
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
