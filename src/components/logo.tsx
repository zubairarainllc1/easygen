import { FileJson, FileText } from 'lucide-react';
import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 mr-6" aria-label="InvoiceFlow">
      <div className="bg-primary p-2 rounded-lg flex-shrink-0">
        <FileJson className="h-6 w-6 text-primary-foreground" />
      </div>
      <span className="font-bold text-lg">DocuGen</span>
    </Link>
  );
}
