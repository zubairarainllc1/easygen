
"use client";

import Link from "next/link";
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from "@/components/logo";
import { ArrowRight, FileSignature, FileText, MoveRight, FileJson, Contact, FileCheck2, QrCode, Menu } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";


const tools = [
  {
    href: "/invoice",
    icon: <FileText className="h-8 w-8 text-primary" />,
    title: "Invoice Maker",
    description: "Create and send professional invoices in minutes. Customize templates, add logos, and track payments.",
    category: "document"
  },
  {
    href: "/cv",
    icon: <FileSignature className="h-8 w-8 text-primary" />,
    title: "CV Maker",
    description: "Build a standout CV with our easy-to-use builder. Choose from professional templates and highlight your skills.",
    cta: "Build Your CV",
    category: "document"
  },
  {
    href: "/quotation",
    icon: <FileJson className="h-8 w-8 text-primary" />,
    title: "Quotation Generator",
    description: "Create professional quotations to send to your clients. Easily convert them into invoices later.",
    cta: "Create a Quotation",
    category: "document"
  },
   {
    href: "/business-card",
    icon: <Contact className="h-8 w-8 text-primary" />,
    title: "Business Card Maker",
    description: "Design professional business cards with front and back customization. Make a lasting impression.",
    cta: "Design Your Card",
    category: "graphic"
  },
   {
    href: "/contract",
    icon: <FileCheck2 className="h-8 w-8 text-primary" />,
    title: "Contract Generator",
    description: "Create legally-binding contracts with ease. Define terms, scope, and payment details to protect your work.",
    cta: "Create a Contract",
    category: "document"
  },
  {
    href: "/qr-code",
    icon: <QrCode className="h-8 w-8 text-primary" />,
    title: "QR Code Generator",
    description: "Generate QR codes for URLs, text, and more. Easily share and download your custom QR code.",
    cta: "Generate QR Code",
    category: "productive"
  }
];

function ToolCard({ tool }: { tool: typeof tools[0] }) {
    return (
        <Link href={tool.href}>
            <Card className="h-full hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
              <CardHeader className="p-8">
                <div className="bg-primary/10 p-4 rounded-full inline-block mb-4 self-start">
                   {tool.icon}
                </div>
                <CardTitle className="text-2xl">{tool.title}</CardTitle>
                <CardDescription className="text-base">
                  {tool.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-8 pt-0">
                  <div className="flex items-center text-primary font-semibold">
                    {tool.cta || `Explore ${tool.title}`} <MoveRight className="ml-2 transition-transform group-hover:translate-x-1" />
                  </div>
              </CardContent>
            </Card>
        </Link>
    )
}

const TypingAnimation = () => {
    const [wordIndex, setWordIndex] = useState(0);
    const [text, setText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const typingSpeed = 150;
    const deletingSpeed = 100;
    const delay = 2000;
    const words = ["CVs", "Invoices", "Card", "Quotation", "Contract", "Qr code"];

    useEffect(() => {
        const handleTyping = () => {
            const currentWord = words[wordIndex];
            const updatedText = isDeleting
                ? currentWord.substring(0, text.length - 1)
                : currentWord.substring(0, text.length + 1);

            setText(updatedText);

            if (!isDeleting && updatedText === currentWord) {
                setTimeout(() => setIsDeleting(true), delay);
            } else if (isDeleting && updatedText === '') {
                setIsDeleting(false);
                setWordIndex((prev) => (prev + 1) % words.length);
            }
        };

        const timeout = setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed);
        return () => clearTimeout(timeout);
    }, [text, isDeleting, wordIndex]);

    return (
      <span className="typing-cursor pr-1">{text}</span>
    );
}


export default function Home() {
    const [filter, setFilter] = useState('all');
    const tabsRef = useRef<HTMLDivElement>(null);
    const [gliderStyle, setGliderStyle] = useState({});
    
    const filteredTools = tools.filter(tool => filter === 'all' || tool.category === filter);
    
    useEffect(() => {
        const activeTab = tabsRef.current?.querySelector<HTMLElement>('[data-state="active"]');
        if (activeTab) {
            setGliderStyle({
                left: activeTab.offsetLeft,
                width: activeTab.offsetWidth,
            });
        }
    }, [filter]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container h-16 flex items-center justify-between">
            <Logo />
            <nav className="hidden md:flex">
              <NavigationMenu>
                <NavigationMenuList>
                   <NavigationMenuItem>
                      <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                         <Link href="/">Home</Link>
                      </NavigationMenuLink>
                  </NavigationMenuItem>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger>Tools</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="w-[200px] gap-3 p-4">
                        {tools.map((tool) => (
                          <ListItem
                            key={tool.title}
                            title={tool.title}
                            href={tool.href}
                          />
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                   <NavigationMenuItem>
                     <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                       <Link href="/blog">Blog</Link>
                     </NavigationMenuLink>
                  </NavigationMenuItem>
                   <NavigationMenuItem>
                     <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                       <Link href="/how-to">How To</Link>
                     </NavigationMenuLink>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </nav>
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Menu className="h-6 w-6" />
                    <span className="sr-only">Open navigation menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <SheetHeader>
                    <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-4 p-4">
                     <Link href="/" className="font-semibold hover:text-primary transition-colors">Home</Link>
                     <Link href="/blog" className="font-semibold hover:text-primary transition-colors">Blog</Link>
                     <Link href="/how-to" className="font-semibold hover:text-primary transition-colors">How To</Link>
                      <p className="font-semibold mt-4">Tools</p>
                      <div className="pl-4 flex flex-col gap-2">
                        {tools.map((tool) => (
                           <Link key={tool.href} href={tool.href} className="text-muted-foreground hover:text-primary transition-colors">{tool.title}</Link>
                        ))}
                      </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full pt-20 md:pt-28 lg:pt-32 pb-12 md:pb-24 lg:pb-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-6 text-center">
                <div className="space-y-4">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-sans text-gray-900">
                    Create Professional <span className="text-primary block sm:inline"><TypingAnimation /></span>
                  </h1>
                  <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl py-6">
                    Our powerful tools help you generate beautiful invoices, CVs, and more. Focus on your work, we'll handle the paperwork.
                  </p>
                </div>
                <div className="space-y-4 pt-4">
                     <Link href="#tools">
                       <Button size="lg">Explore Tools</Button>
                    </Link>
                </div>
            </div>
          </div>
        </section>
        
        <section id="tools" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-12">
               <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-sans">Our Tools</h2>
               <p className="text-muted-foreground md:text-lg max-w-2xl">Select a tool to begin creating your document. Each one is designed for simplicity and professional results.</p>
            </div>
             <div className="flex justify-center mb-8">
                <Tabs value={filter} onValueChange={setFilter}>
                    <TabsList ref={tabsRef} className="relative">
                        <span 
                            className="absolute top-0 left-0 h-full bg-primary shadow-sm rounded-md transition-all duration-300 ease-in-out"
                            style={gliderStyle}
                        />
                        <TabsTrigger value="all">All</TabsTrigger>
                        <TabsTrigger value="document">Document</TabsTrigger>
                        <TabsTrigger value="graphic">Graphic</TabsTrigger>
                        <TabsTrigger value="productive">Productive</TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 sm:grid-cols-2 lg:grid-cols-3">
              {filteredTools.map((tool) => <ToolCard key={tool.href} tool={tool} />)}
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t">
        <div className="container py-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">Built by Codexign</p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
                <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
            </div>
        </div>
      </footer>
    </div>
  );
}


const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-primary focus:bg-accent focus:text-primary",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"

    
    
