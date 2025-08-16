
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from "@/components/logo";
import { ArrowRight, FileSignature, FileText, MoveRight, FileJson, Contact } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container h-14 flex items-center">
            <Logo />
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
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 sm:grid-cols-2 lg:grid-cols-2">
              <Link href="/invoice">
                <Card className="h-full hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <CardHeader className="p-8">
                    <div className="bg-primary/10 p-4 rounded-full inline-block mb-4 self-start">
                       <FileText className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">Invoice Maker</CardTitle>
                    <CardDescription className="text-base">
                      Create and send professional invoices in minutes. Customize templates, add logos, and track payments.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-8 pt-0">
                      <div className="flex items-center text-primary font-semibold">
                        Create an Invoice <MoveRight className="ml-2 transition-transform group-hover:translate-x-1" />
                      </div>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/cv">
                <Card className="h-full hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <CardHeader className="p-8">
                    <div className="bg-primary/10 p-4 rounded-full inline-block mb-4 self-start">
                       <FileSignature className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">CV Maker</CardTitle>
                    <CardDescription className="text-base">
                      Build a standout CV with our easy-to-use builder. Choose from professional templates and highlight your skills.
                    </CardDescription>
                  </CardHeader>
                   <CardContent className="p-8 pt-0">
                      <div className="flex items-center text-primary font-semibold">
                          Build Your CV <MoveRight className="ml-2 transition-transform group-hover:translate-x-1" />
                      </div>
                    </CardContent>
                </Card>
              </Link>
              <Link href="/quotation">
                <Card className="h-full hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <CardHeader className="p-8">
                    <div className="bg-primary/10 p-4 rounded-full inline-block mb-4 self-start">
                       <FileJson className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">Quotation Generator</CardTitle>
                    <CardDescription className="text-base">
                      Create professional quotations to send to your clients. Easily convert them into invoices later.
                    </CardDescription>
                  </CardHeader>
                   <CardContent className="p-8 pt-0">
                      <div className="flex items-center text-primary font-semibold">
                          Create a Quotation <MoveRight className="ml-2 transition-transform group-hover:translate-x-1" />
                      </div>
                    </CardContent>
                </Card>
              </Link>
               <Link href="/business-card">
                <Card className="h-full hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <CardHeader className="p-8">
                    <div className="bg-primary/10 p-4 rounded-full inline-block mb-4 self-start">
                       <Contact className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">Business Card Maker</CardTitle>
                    <CardDescription className="text-base">
                      Design professional business cards with front and back customization. Make a lasting impression.
                    </CardDescription>
                  </CardHeader>
                   <CardContent className="p-8 pt-0">
                      <div className="flex items-center text-primary font-semibold">
                          Design Your Card <MoveRight className="ml-2 transition-transform group-hover:translate-x-1" />
                      </div>
                    </CardContent>
                </Card>
              </Link>
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
