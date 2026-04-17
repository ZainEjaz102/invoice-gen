export type InvoiceStatus = 'Paid' | 'Pending' | 'Overdue' | 'Draft';

export interface LineItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
}

export interface Invoice {
  id: string;
  number: string;
  clientName: string;
  clientEmail: string;
  clientAddress: string;
  fromName: string;
  fromEmail: string;
  fromAddress: string;
  issueDate: string;
  dueDate: string;
  status: InvoiceStatus;
  items: LineItem[];
  currency: string;
}

export interface DashboardStats {
  totalRevenue: number;
  outstanding: number;
  overdue: number;
  paidMTD: number;
}
