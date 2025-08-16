
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { ArrowRight, FileText, FileSignature } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="p-4 sm:p-6">
        <Logo />
      </header>
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-4xl md:text-6xl font-extrabold text-primary font-headline tracking-tight">
            Welcome to Your Studio
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Build, customize, and create with powerful tools at your fingertips. 
            Start by exploring our document creators below.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link href="/invoice" passHref>
              <Button size="lg" className="w-full sm:w-auto">
                Invoice Maker
                <FileText className="ml-2" />
              </Button>
            </Link>
             <Button size="lg" variant="outline" className="w-full sm:w-auto" disabled>
                CV Maker
                <FileSignature className="ml-2" />
             </Button>
          </div>
           <div className="mt-8">
             <Button variant="link" className="text-accent-foreground/80">
                Explore Features <ArrowRight className="ml-2" />
             </Button>
           </div>
        </div>
      </main>
       <footer className="text-center p-4 text-sm text-muted-foreground">
        Built with Firebase Studio
      </footer>
    </div>
  );
}
