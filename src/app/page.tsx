
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from "@/components/logo";
import { ArrowRight, FileSignature, FileText, MoveRight } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950">
      <header className="p-4 sm:p-6 border-b">
        <Logo />
      </header>
      <main className="flex-1">
        <section className="w-full py-20 md:py-32 lg:py-40 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-1">
              <div className="flex flex-col justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-primary font-headline">
                    Create Professional Documents in Seconds
                  </h1>
                  <p className="max-w-[600px] mx-auto text-muted-foreground md:text-xl">
                    Our powerful tools help you generate beautiful invoices and CVs effortlessly. Focus on your work, we'll handle the paperwork.
                  </p>
                </div>
                <div className="flex justify-center gap-2 min-[400px]:flex-row">
                  <Link href="/invoice" passHref>
                    <Button size="lg">
                      Get Started <ArrowRight className="ml-2" />
                    </Button>
                  </Link>
                  <Button size="lg" variant="outline" disabled>
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="w-full py-12 md:py-24 lg:py-32 bg-background/50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-start space-y-4">
               <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-primary/90 font-headline">Our Tools</h2>
               <p className="text-muted-foreground md:text-lg">Select a tool to begin creating your document.</p>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 sm:grid-cols-2 lg:gap-12">
              <Link href="/invoice">
                <Card className="h-full hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <div className="bg-primary/10 p-3 rounded-md inline-block mb-4">
                       <FileText className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle>Invoice Maker</CardTitle>
                    <CardDescription>
                      Create and send professional invoices in minutes. Customize templates, add logos, and track payments.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                      <Button variant="link" className="p-0 h-auto text-primary">
                        Create an Invoice <MoveRight className="ml-2" />
                      </Button>
                  </CardContent>
                </Card>
              </Link>
              <Link href="/cv">
                <Card className="h-full hover:shadow-xl transition-shadow duration-300">
                  <CardHeader>
                    <div className="bg-primary/10 p-3 rounded-md inline-block mb-4">
                       <FileSignature className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle>CV Maker</CardTitle>
                    <CardDescription>
                      Build a standout CV with our easy-to-use builder. Choose from professional templates and highlight your skills.
                    </CardDescription>
                  </CardHeader>
                   <CardContent>
                      <Button variant="link" className="p-0 h-auto text-primary">
                          Build Your CV <MoveRight className="ml-2" />
                      </Button>
                    </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <footer className="text-center p-6 text-sm text-muted-foreground bg-gray-100 dark:bg-gray-900 border-t">
        Built with Firebase Studio
      </footer>
    </div>
  );
}
