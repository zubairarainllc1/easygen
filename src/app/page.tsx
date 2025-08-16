
"use client";

import Link from "next/link";
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from "@/components/logo";
import { ArrowRight, FileSignature, FileText, MoveRight, FileJson, Contact, FileCheck2, QrCode } from "lucide-react";
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


const tools = [
  {
    href: "/invoice",
    icon: <FileText className="h-8 w-8 text-primary" />,
    title: "Invoice Maker",
    description: "Create and send professional invoices in minutes. Customize templates, add logos, and track payments.",
    cta: "Create an Invoice",
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
                    {tool.cta} <MoveRight className="ml-2 transition-transform group-hover:translate-x-1" />
                  </div>
              </CardContent>
            </Card>
        </Link>
    )
}

export default function Home() {
    const [filter, setFilter] = useState('all');

    const filteredTools = tools.filter(tool => filter === 'all' || tool.category === filter);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container h-16 flex items-center justify-between">
            <Logo />
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link href="/" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      Home
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Tools</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
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
                  <Link href="/blog" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      Blog
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                 <NavigationMenuItem>
                  <Link href="/how-to" legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      How To
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-20 md:py-32 lg:py-40">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
                <div className="space-y-2">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-sans">
                    Create Professional Documents in Seconds
                  </h1>
                  <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                    Our powerful tools help you generate beautiful invoices, CVs, and more. Focus on your work, we'll handle the paperwork.
                  </p>
                </div>
                <div className="space-x-4">
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
                    <TabsList>
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
        <div className="container py-8 flex items-center justify-between">
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
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
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
