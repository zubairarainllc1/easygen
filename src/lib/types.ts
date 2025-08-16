
export interface InvoiceItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Invoice {
  invoiceNumber: string;
  date: Date;
  clientName: string;
  clientEmail: string;
  clientAddress: string;
  items: InvoiceItem[];
  taxRate: number;
  notes: string;
}

export interface Quotation extends Omit<Invoice, 'invoiceNumber'> {
  quotationNumber: string;
  validUntil: Date;
}

export interface CvData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    address: string;
    website: string;
    profileImage: string;
  };
  summary: string;
  experience: {
    id: string;
    company: string;
    title: string;
    startDate: string;
    endDate: string;
    description: string;
  }[];
  education: {
    id: string;
    school: string;
    degree: string;
    startDate: string;
    endDate: string;
  }[];
  skills: string[];
}
