import { Invoice } from './types';

export const MOCK_INVOICES: Invoice[] = [
  {
    id: '1',
    number: 'INV-0942',
    clientName: 'Nexus Labs',
    clientEmail: 'billing@nexuslabs.co',
    clientAddress: '456 Innovation Dr, Suite 100\nSeattle, WA 98101',
    fromName: 'Precision Ledger Ltd.',
    fromEmail: 'billing@precisionledger.io',
    fromAddress: '128 Innovation Way\nSan Francisco, CA 94103',
    issueDate: 'Oct 24, 2023',
    dueDate: 'Nov 07, 2023',
    status: 'Paid',
    currency: 'USD',
    items: [
      { id: 'i1', description: 'Brand Identity System Design', quantity: 1, rate: 4500 },
      { id: 'i2', description: 'UI/UX Prototype Development', quantity: 20, rate: 120 }
    ]
  },
  {
    id: '2',
    number: 'INV-0941',
    clientName: 'Arcane Studio',
    clientEmail: 'finance@arcane.io',
    clientAddress: '789 Design Way\nAustin, TX 78701',
    fromName: 'Precision Ledger Ltd.',
    fromEmail: 'billing@precisionledger.io',
    fromAddress: '128 Innovation Way\nSan Francisco, CA 94103',
    issueDate: 'Oct 22, 2023',
    dueDate: 'Nov 05, 2023',
    status: 'Pending',
    currency: 'USD',
    items: [
      { id: 'i3', description: 'SEO Optimization Package', quantity: 1, rate: 1200 }
    ]
  },
  {
    id: '3',
    number: 'INV-0940',
    clientName: 'Ghost Retail',
    clientEmail: 'accounts@ghost.com',
    clientAddress: '12 Retail Blvd\nNew York, NY 10001',
    fromName: 'Precision Ledger Ltd.',
    fromEmail: 'billing@precisionledger.io',
    fromAddress: '128 Innovation Way\nSan Francisco, CA 94103',
    issueDate: 'Oct 15, 2023',
    dueDate: 'Oct 29, 2023',
    status: 'Overdue',
    currency: 'USD',
    items: [
      { id: 'i4', description: 'Cloud Infrastructure Setup', quantity: 4, rate: 1205 }
    ]
  },
  {
    id: '4',
    number: 'INV-0939',
    clientName: 'Solar Ventures',
    clientEmail: 'solar@ventu.re',
    clientAddress: '55 Helios Ave\nDenver, CO 80202',
    fromName: 'Precision Ledger Ltd.',
    fromEmail: 'billing@precisionledger.io',
    fromAddress: '128 Innovation Way\nSan Francisco, CA 94103',
    issueDate: 'Oct 12, 2023',
    dueDate: 'Oct 26, 2023',
    status: 'Paid',
    currency: 'USD',
    items: [
      { id: 'i5', description: 'Annual Reporting Audit', quantity: 1, rate: 8600 }
    ]
  }
];
