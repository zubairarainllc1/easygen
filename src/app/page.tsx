
"use client";

import Link from "next/link";
import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from "@/components/logo";
import { ArrowRight, FileSignature, FileText, MoveRight, FileJson, Contact, FileCheck2, QrCode, Menu, FileBadge, Search } from "lucide-react";
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
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";


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
    href: "/cover-letter",
    icon: <FileBadge className="h-8 w-8 text-primary" />,
    title: "Cover Letter Generator",
    description: "Create a compelling cover letter that impresses recruiters. Choose from professional templates.",
    cta: "Create Letter",
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

const howToSteps = [
    {
        title: "How to use Invoice Maker",
        description: "Our Invoice Maker helps you create professional, branded invoices in just a few clicks. It's designed to be intuitive and fast, allowing you to bill clients accurately without the hassle. You can customize templates, add your company logo, and define items with specific quantities and prices. The tool automatically calculates subtotals, taxes, and grand totals, ensuring your invoices are always error-free.",
        steps: [
            "Start by selecting a professional template that fits your brand identity.",
            "Fill in your company details and the client's information.",
            "Add line items for your products or services, including quantity and price.",
            "Customize the tax rate and add any specific notes for the client.",
            "Preview your invoice and download it as a high-quality PDF or PNG."
        ],
        imageUrl: "https://i.postimg.cc/rF8h9HK6/Invoice-rafiki.png"
    },
    {
        title: "How to use CV Maker",
        description: "Build a compelling, well-structured CV that highlights your skills and experience. Our CV Maker guides you through each section, from personal information to work history and education. Choose from a variety of modern and professional templates designed to impress recruiters. The tool ensures your final document is perfectly formatted and ready to be sent out for job applications.",
        steps: [
            "Choose a CV template that best represents your professional profile.",
            "Enter your personal details, including your name, contact information, and a professional summary.",
            "List your work experience, detailing your roles, responsibilities, and achievements.",
            "Add your educational background and list your key skills.",
            "Download your polished CV and start applying for jobs with confidence."
        ],
        imageUrl: "https://i.postimg.cc/GhhQDs5d/Resume-bro.png"
    },
     {
        title: "How to use Cover Letter Generator",
        description: "Craft a professional cover letter that stands out to hiring managers. Our generator helps you structure your letter perfectly, from your personal details to the closing sign-off. Choose a template that matches your CV, fill in the recipient's information, and write a compelling message that showcases your suitability for the role. Make a great first impression and land more interviews.",
        steps: [
            "Select a cover letter template that complements your professional style.",
            "Fill in your contact information and the recipient's details.",
            "Write a clear subject line and a persuasive body for your letter.",
            "Choose a professional closing and review your letter for any errors.",
            "Download the final document, ready to be sent with your job application."
        ],
        imageUrl: "https://i.postimg.cc/fWtKf07N/Recommendation-letter-amico.png"
    },
    {
        title: "How to use Quotation Generator",
        description: "Create and send accurate, professional quotations to potential clients. This tool simplifies the process of pricing your services or products, allowing you to generate a detailed quote that can later be converted into an invoice. Set terms, define the validity period, and present your pricing clearly to win more business. This is perfect for freelancers, agencies, and small businesses.",
        steps: [
            "Select a clean, professional template for your quotation.",
            "Input your client's details and the quotation's validity period.",
            "List all the items or services you are quoting with detailed descriptions and prices.",
            "Review the auto-calculated totals to ensure accuracy.",
            "Download the quotation to send to your client for approval."
        ],
        imageUrl: "https://i.postimg.cc/R0rKg3X3/Quotation.png"
    },
    {
        title: "How to use Business Card Maker",
        description: "Design a memorable business card that makes a lasting impression. Our tool allows you to customize both the front and back of your card, ensuring all your essential contact information is beautifully presented. Choose from sleek, minimal, or bold designs, and add your own logo and brand colors to create a card that truly represents you and your business. Stand out from the crowd at your next networking event.",
        steps: [
            "Select a design template and choose an accent color that matches your brand.",
            "Add your name, title, company, and all contact details.",
            "Upload your company logo for a personalized touch.",
            "Customize both the front and back of the card in the editor.",
            "Download the print-ready PDF to get your cards professionally printed."
        ],
        imageUrl: "https://i.postimg.cc/Rh30rd0v/card.png"
    },
    {
        title: "How to use Contract Generator",
        description: "Drafting a contract can be complicated, but our tool makes it easy. Create legally-sound agreements by simply filling in the blanks. Define the scope of work, set payment terms, and outline the terms and conditions to protect both you and your client. This tool is essential for ensuring clear communication and preventing disputes down the line. It's professional, secure, and straightforward.",
        steps: [
            "Choose from our range of contract templates (formal, modern, or simple).",
            "Fill in the names of the client and the contractor.",
            "Clearly define the scope of work, deliverables, and project timeline.",
            "Specify the payment terms, including amounts and due dates.",
            "Outline the general terms and conditions before downloading the final document."
        ],
        imageUrl: "https://i.postimg.cc/pLjn5WRP/Agreement-rafiki.png"
    },
    {
        title: "How to use QR Code Generator",
        description: "Instantly create custom QR codes for websites, text, contact information, and more. Our generator is simple to use and allows you to customize the size and color to fit your needs. QR codes are perfect for marketing materials, event flyers, or business cards, providing a quick and easy way for people to access your information. Download your high-resolution QR code in seconds.",
        steps: [
            "Enter the URL or text you want the QR code to link to.",
            "Customize the size of the QR code using the slider.",
            "Choose the color for the QR code and its background.",
            "Your QR code will be generated in the preview window.",
            "Download the high-resolution PNG file for your use."
        ],
        imageUrl: "https://i.postimg.cc/rw5KFfNm/QR-Code-amico.png"
    }
]

function ToolCard({ tool }: { tool: typeof tools[0] }) {
    return (
        <Link href={tool.href}>
            <Card className="h-full hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group flex flex-col">
                <CardHeader>
                    {tool.icon}
                    <CardTitle>{tool.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                    <CardDescription>{tool.description}</CardDescription>
                </CardContent>
                <CardFooter>
                    <Button variant="link" className="p-0 group-hover:text-primary">
                        {tool.cta || 'Get Started'} <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
                    </Button>
                </CardFooter>
            </Card>
        </Link>
    )
}

const TypingAnimation = ({ words }: { words: string[] }) => {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const typingSpeed = 150;
  const deletingSpeed = 75;
  const delay = 1500;

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

    const timer = setTimeout(handleTyping, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timer);
  }, [wordIndex, text, isDeleting, words]);

  return (
    <span className="text-primary relative">
        {text}
        <span className="animate-pulse">|</span>
    </span>
    );
};


export default function Home() {
    const [filter, setFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const tabsRef = useRef<HTMLDivElement>(null);
    const [gliderStyle, setGliderStyle] = useState({});
    
    const filteredTools = tools.filter(tool => {
        const matchesCategory = filter === 'all' || tool.category === filter;
        const matchesSearch = tool.title.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });
    
    useEffect(() => {
        const activeTab = tabsRef.current?.querySelector<HTMLElement>('[data-state="active"]');
        if (activeTab) {
            setGliderStyle({
                left: activeTab.offsetLeft,
                width: activeTab.offsetWidth,
            });
        }
    }, [filter]);

    const handleScrollTo = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

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
                       <Link href="/#how-to">How To</Link>
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
                  <div className="flex flex-col gap-2 p-4">
                     <Link href="/" className="font-semibold text-lg hover:text-primary transition-colors py-2">Home</Link>
                     <Link href="/blog" className="font-semibold text-lg hover:text-primary transition-colors py-2">Blog</Link>
                     <Link href="/#how-to" className="font-semibold text-lg hover:text-primary transition-colors py-2">How To</Link>
                      <Collapsible>
                        <CollapsibleTrigger className="flex items-center justify-between w-full font-semibold text-lg hover:text-primary transition-colors py-2 group">
                            Tools
                            <ChevronDown className="h-5 w-5 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                            <div className="pl-4 flex flex-col gap-2 pt-2">
                                {tools.map((tool) => (
                                <Link key={tool.href} href={tool.href} className="text-muted-foreground hover:text-primary transition-colors py-1">{tool.title}</Link>
                                ))}
                            </div>
                        </CollapsibleContent>
                      </Collapsible>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full pt-20 md:pt-28 lg:pt-32 pb-16 md:pb-24 lg:pb-32">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center space-y-6 text-center">
                <div className="space-y-4">
                  <h1 className="flex flex-col md:flex-row md:gap-x-4 items-center justify-center text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl font-sans text-gray-900">
                    <span>Create Professional</span> <TypingAnimation words={['Resumes', 'Invoices', 'Quotations', 'Contracts']} />
                  </h1>
                  <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl py-6">
                    Our powerful tools help you generate beautiful invoices, CVs, and more. Focus on your work, we'll handle the paperwork.
                  </p>
                </div>
                <div className="space-y-4 pt-4">
                    <Button size="lg" onClick={() => handleScrollTo('tools')}>
                        Explore Tools
                    </Button>
                </div>
            </div>
          </div>
        </section>
        
        <section id="tools" className="w-full py-12 md:py-24 lg:py-32 bg-muted/50 scroll-mt-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-12">
               <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-sans">Our Tools</h2>
               <p className="text-muted-foreground md:text-lg max-w-2xl">Select a tool to begin creating your document. Each one is designed for simplicity and professional results.</p>
            </div>
             <div className="flex flex-col items-center gap-6 mb-8">
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
                <div className="relative w-full max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input 
                        type="search"
                        placeholder="Search for a tool..."
                        className="w-full pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 py-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredTools.length > 0 ? (
                filteredTools.map((tool) => <ToolCard key={tool.href} tool={tool} />)
              ) : (
                <div className="col-span-full text-center text-muted-foreground">
                    No tools found for &quot;{searchTerm}&quot;
                </div>
              )}
            </div>
          </div>
        </section>

        <section id="how-to" className="w-full py-12 md:py-24 lg:py-32 scroll-mt-16">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center text-center space-y-4 mb-12">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl font-sans">How It Works</h2>
                    <p className="text-muted-foreground md:text-lg max-w-2xl">A simple, step-by-step guide to using our powerful document generation tools.</p>
                </div>
                <div className="space-y-16">
                    {howToSteps.map((step, index) => (
                        <div key={index} className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                            <div className={cn("space-y-4 text-center md:text-left", index % 2 === 1 && "md:order-last")}>
                                <h3 className="text-2xl font-bold text-gray-900">{step.title}</h3>
                                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                                <ul className="space-y-2 text-left pt-2">
                                  {step.steps.map((s, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-sm flex-shrink-0 mt-1">
                                        {i + 1}
                                      </span>
                                      <span className="text-muted-foreground">{s}</span>
                                    </li>
                                  ))}
                                </ul>
                            </div>
                            <div className="flex justify-center">
                                <Image
                                    src={step.imageUrl}
                                    alt={step.title}
                                    width={400}
                                    height={400}
                                    className="rounded-lg object-contain"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
      </main>
      <footer className="border-t">
        <div className="container py-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">&copy; 2025 <a href="https://www.codexign.site/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">Codexign</a></p>
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

    
