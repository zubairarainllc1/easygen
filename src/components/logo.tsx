import { FileText } from 'lucide-react';
import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label="InvoiceFlow">
      <div className="bg-primary p-2 rounded-lg flex-shrink-0">
        <FileText className="h-6 w-6 text-primary-foreground" />
      </div>
      <div>
        <h1 className="text-2xl font-bold text-primary font-headline">InvoiceFlow</h1>
        <p className="text-sm text-muted-foreground">by Firebase Studio</p>
      </div>
    </Link>
  );
}
