
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/logo";
import { Download, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Slider } from "@/components/ui/slider";

export default function QrCodeGeneratorPage() {
  const [data, setData] = useState("https://www.example.com");
  const [size, setSize] = useState([250]);
  const [qrCodeUrl, setQrCodeUrl] = useState(`https://api.qrserver.com/v1/create-qr-code/?data=https://www.example.com&size=250x250`);
  const { toast } = useToast();

  const handleGenerate = () => {
    if (!data.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter some data to generate a QR code.",
      });
      return;
    }
    const encodedData = encodeURIComponent(data);
    const newUrl = `https://api.qrserver.com/v1/create-qr-code/?data=${encodedData}&size=${size[0]}x${size[0]}`;
    setQrCodeUrl(newUrl);
  };
  
  const handleDownload = async () => {
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
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container h-14 flex items-center">
          <Logo />
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center">
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col items-center text-center space-y-4 mb-12">
                <h1 className="text-4xl font-bold tracking-tight font-sans">QR Code Generator</h1>
                <p className="text-lg text-muted-foreground max-w-2xl">
                    Create your own QR codes for free. Enter any text or URL below.
                </p>
            </div>
            <div className="mx-auto max-w-2xl grid md:grid-cols-2 gap-8">
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
                            <Button className="w-full" onClick={handleGenerate}>
                                <RefreshCw className="mr-2"/> Generate
                            </Button>
                        </CardContent>
                    </Card>
                </div>
                 <div className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Preview</CardTitle>
                            <CardDescription>This is your generated QR code.</CardDescription>
                        </CardHeader>
                        <CardContent className="flex flex-col items-center justify-center p-6 min-h-[250px]">
                            {qrCodeUrl ? (
                                <img 
                                    src={qrCodeUrl} 
                                    alt="Generated QR Code" 
                                    width={size[0]} 
                                    height={size[0]} 
                                    className="border-4 border-white rounded-lg shadow-md"
                                />
                            ) : (
                                <div className="w-[250px] h-[250px] bg-gray-200 flex items-center justify-center text-muted-foreground rounded-lg">
                                    Your QR code will appear here
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
