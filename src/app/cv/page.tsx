
"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const templates = [
  { id: "classic", name: "Classic", image: "https://placehold.co/400x565.png", hint: "professional resume" },
  { id: "modern", name: "Modern", image: "https://placehold.co/400x565.png", hint: "creative resume" },
  { id: "minimalist", name: "Minimalist", image: "https://placehold.co/400x565.png", hint: "simple resume" },
  { id: "creative", name: "Creative", image: "https://placehold.co/400x565.png", hint: "artistic resume" },
  { id: "professional", name: "Professional", image: "https://placehold.co/400x565.png", hint: "corporate resume" },
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

export default function CvTemplatePage() {
  const router = useRouter();
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0].id);
  const [selectedColor, setSelectedColor] = useState(colors[0].value);

  const handleNext = () => {
    const params = new URLSearchParams();
    params.set("template", selectedTemplate);
    params.set("color", selectedColor);
    router.push(`/cv/editor?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-background">
       <div className="border-b">
        <div className="mx-auto max-w-screen-2xl p-4 sm:p-6 lg:p-4">
          <Logo />
        </div>
      </div>
       <div className="mx-auto max-w-screen-2xl p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-primary font-headline">Choose Your CV Template</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
                Select a template that best represents your professional profile. You can also choose a color scheme to personalize it.
            </p>
        </div>

        <div className="mb-12">
            <h2 className="text-2xl font-semibold text-center mb-6 text-primary/90 font-headline">1. Select a Template</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {templates.map((template) => (
                    <div key={template.id} onClick={() => setSelectedTemplate(template.id)} className="cursor-pointer group">
                        <Card className={cn("overflow-hidden transition-all", selectedTemplate === template.id ? 'ring-2 ring-primary ring-offset-2' : 'hover:shadow-lg')}>
                            <img src={template.image} alt={template.name} data-ai-hint={template.hint} className="w-full h-auto object-cover aspect-[3/4]"/>
                            <div className="p-4 flex items-center justify-between">
                                <p className="font-medium">{template.name}</p>
                                {selectedTemplate === template.id && <CheckCircle2 className="text-primary h-5 w-5"/>}
                            </div>
                        </Card>
                    </div>
                ))}
            </div>
        </div>

        <div className="mb-12">
            <h2 className="text-2xl font-semibold text-center mb-6 text-primary/90 font-headline">2. Pick a Color</h2>
            <div className="flex justify-center flex-wrap gap-4">
                {colors.map((color) => (
                    <button key={color.name} onClick={() => setSelectedColor(color.value)} className={cn("h-12 w-12 rounded-full border-2 transition-all flex items-center justify-center", selectedColor === color.value ? 'border-primary scale-110' : 'border-transparent hover:scale-105')} style={{ backgroundColor: `hsl(${color.value})`}}>
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
