

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
  companyLogo?: string;
  companyName: string;
  companyEmail: string;
  companyAddress: string;
  currency: string;
}

export interface Quotation extends Invoice {
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

export interface BusinessCardData {
    name: string;
    title: string;
    companyName: string;
    email: string;
    phone: string;
    website: string;
    address: string;
    logoUrl?: string;
    accentColor: string;
}

export interface ContractData {
  title: string;
  clientName: string;
  contractorName: string;
  effectiveDate: Date;
  scopeOfWork: string;
  paymentTerms: string;
  termsAndConditions: string;
}
