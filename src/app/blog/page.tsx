
import { Logo } from "@/components/logo";

export default function BlogPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container h-14 flex items-center">
          <Logo />
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
