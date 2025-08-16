
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/logo";
import { Download, RefreshCw, Menu } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Slider } from "@/components/ui/slider";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";

export default function QrCodeGeneratorPage() {
  const [data, setData] = useState("https://www.example.com");
  const [size, setSize] = useState([250]);
  const [color, setColor] = useState("#000000");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const { toast } = useToast();

  const generateQrCode = () => {
    if (!data.trim()) {
      setQrCodeUrl("");
      return;
    }
    const encodedData = encodeURIComponent(data);
    const colorHex = color.substring(1); // remove #
    const bgColorHex = bgColor.substring(1); // remove #
    const newUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodedData}&size=${size[0]}x${size[0]}&color=${colorHex}&bgcolor=${bgColorHex}`;
    setQrCodeUrl(newUrl);
  };
  
  useEffect(() => {
    generateQrCode();
  }, [data, size, color, bgColor]);


  const handleDownload = async () => {
    if(!qrCodeUrl) {
       toast({ variant: "destructive", title: "Error", description: "Please generate a QR code first." });
       return;
    }
    try {
        const response = await fetch(qrCodeUrl);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "qrcode.png";
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
        toast({ title: "Success!", description: "QR Code downloaded successfully."});
    } catch(err) {
         toast({ variant: "destructive", title: "Error", description: "Failed to download QR code." });
         console.error(err);
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-muted/50">
      <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container h-16 flex items-center justify-between">
          <Logo />
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
                     <Link href="/blog" className="font-semibold hover:text-primary transition-colors">Blog</Link>
                     <Link href="/how-to" className="font-semibold hover:text-primary transition-colors">How To</Link>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center py-12">
        <div className="container mx-auto px-4">
            <div className="flex flex-col items-center text-center space-y-4 mb-12">
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight font-sans">QR Code Generator</h1>
                <p className="text-base md:text-lg text-muted-foreground max-w-2xl">
                    Create your own QR codes for free. Enter any text or URL below.
                </p>
            </div>
            <div className="mx-auto max-w-4xl grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Configuration</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             <div className="space-y-2">
                                <Label htmlFor="data">Data (URL or Text)</Label>
                                <Input 
                                    id="data" 
                                    value={data} 
                                    onChange={(e) => setData(e.target.value)} 
                                    placeholder="e.g., https://example.com"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="size">Size ({size[0]}px)</Label>
                                <Slider
                                    id="size"
                                    min={100}
                                    max={1000}
                                    step={10}
                                    value={size}
                                    onValueChange={setSize}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="color">QR Color</Label>
                                    <Input id="color" type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-full h-10 p-1"/>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="bgColor">Background Color</Label>
                                    <Input id="bgColor" type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="w-full h-10 p-1"/>
                                </div>
                            </div>
                            <Button className="w-full" onClick={generateQrCode}>
                                <RefreshCw className="mr-2"/> Generate
                            </Button>
                        </CardContent>
                    </Card>
                </div>
                 <div className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Preview</CardTitle>
                            <CardDescription>Your QR code will update automatically.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center justify-center p-6 min-h-[250px] aspect-square">
                            {qrCodeUrl ? (
                                <img 
                                    src={qrCodeUrl} 
                                    alt="Generated QR Code" 
                                    className="border-4 border-white rounded-lg shadow-md w-full h-full object-contain"
                                />
                            ) : (
                                <div className="w-full h-full bg-gray-200 flex items-center justify-center text-muted-foreground rounded-lg text-center p-4">
                                    Your QR code will appear here. Start by typing in the data field.
                                </div>
                            )}
                        </CardContent>
                    </Card>
                     <Button className="w-full" onClick={handleDownload} disabled={!qrCodeUrl}>
                        <Download className="mr-2"/> Download PNG
                    </Button>
                 </div>
            </div>
        </div>
      </main>
    </div>
  );
}
