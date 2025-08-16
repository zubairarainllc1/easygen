import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Onest } from 'next/font/google';

const font = Onest({
  subsets: ['latin'],
  variable: '--font-onest',
})

export const metadata: Metadata = {
  title: 'DocuGen',
  description: 'Create and manage your documents with ease.',
  viewport: 'width=device-width, initial-scale=1.0',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("font-sans antialiased", font.variable)}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
