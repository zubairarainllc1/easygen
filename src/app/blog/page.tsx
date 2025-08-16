
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";

export default function BlogPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
       <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container h-16 flex items-center justify-between">
          <Logo />
           <nav className="hidden md:flex items-center gap-4 text-sm text-muted-foreground">
             <Link href="/" className="hover:text-primary transition-colors">Home</Link>
             <Link href="/blog" className="text-primary font-semibold">Blog</Link>
             <Link href="/how-to" className="hover:text-primary transition-colors">How To</Link>
          </nav>
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
                    <Link href="/blog" className="font-semibold text-primary">Blog</Link>
                    <Link href="/how-to" className="font-semibold hover:text-primary transition-colors">How To</Link>
                  </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <div className="container mx-auto px-4 md:px-6 py-12">
          <h1 className="text-4xl font-bold tracking-tight text-center">
            Blog
          </h1>
          <p className="text-lg text-muted-foreground text-center mt-4">
            Coming soon!
          </p>
        </div>
      </main>
    </div>
  );
}
