import React, { useState, useEffect } from 'react';
import { PlusCircle, Trash2, Save, Download, Send, Image as ImageIcon, Calendar, DollarSign, Eye } from 'lucide-react';
import { formatCurrency, cn } from '../lib/utils';
import { motion } from 'motion/react';
import { LineItem, Invoice } from '../types';

export default function InvoiceCreator() {
  const [invoice, setInvoice] = useState<Omit<Invoice, 'id' | 'status'>>({
    number: 'INV-2024-001',
    clientName: 'Acme Global Dynamics',
    clientEmail: 'accounts@acme.com',
    clientAddress: '101 Tech Way\nAustin, TX 78701',
    fromName: 'Precision Ledger Ltd.',
    fromEmail: 'billing@precisionledger.io',
    fromAddress: '128 Innovation Way\nSan Francisco, CA 94103',
    issueDate: '2024-10-24',
    dueDate: '2024-11-24',
    currency: 'USD',
    items: [
      { id: '1', description: 'Brand Identity System Design', quantity: 1, rate: 4500 },
      { id: '2', description: 'UI/UX Prototype Development', quantity: 20, rate: 120 }
    ],
  });

  const subtotal = invoice.items.reduce((acc, item) => acc + (item.quantity * item.rate), 0);
  const tax = subtotal * 0.1;
  const discount = subtotal * 0.05;
  const total = subtotal + tax - discount;

  const addItem = () => {
    setInvoice(prev => ({
      ...prev,
      items: [...prev.items, { id: crypto.randomUUID(), description: '', quantity: 1, rate: 0 }]
    }));
  };

  const updateItem = (id: string, field: keyof LineItem, value: string | number) => {
    setInvoice(prev => ({
      ...prev,
      items: prev.items.map(item => item.id === id ? { ...item, [field]: value } : item)
    }));
  };

  const removeItem = (id: string) => {
    setInvoice(prev => ({ ...prev, items: prev.items.filter(item => item.id !== id) }));
  };

  return (
    <div className="flex h-full overflow-hidden">
      {/* Left: Editor */}
      <section className="w-[55%] h-full overflow-y-auto custom-scrollbar p-8 bg-surface-container-low border-r border-outline-variant/10">
        <div className="max-w-3xl mx-auto space-y-10 pb-20">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-extrabold tracking-tight text-on-surface font-headline">Invoice Creator</h2>
            <span className="px-3 py-1 bg-tertiary-fixed text-on-tertiary text-[10px] font-bold rounded-full tracking-widest uppercase shadow-sm shadow-tertiary/20">Draft State</span>
          </div>

          {/* Branding & Basics */}
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Your Branding</label>
              <div className="h-40 w-full border-2 border-dashed border-outline-variant/30 rounded-2xl flex flex-col items-center justify-center bg-white hover:bg-surface-container-low transition-all cursor-pointer group shadow-sm">
                <div className="p-4 bg-surface-container rounded-full group-hover:bg-primary/10 group-hover:scale-110 transition-all">
                  <ImageIcon className="text-outline group-hover:text-primary w-8 h-8" />
                </div>
                <p className="text-[11px] font-bold text-outline group-hover:text-primary mt-4 uppercase tracking-tighter">Upload Company Logo</p>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">Invoice Number</label>
                <input 
                  className="w-full bg-surface-container-highest border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all font-bold text-primary" 
                  value={invoice.number}
                  onChange={(e) => setInvoice({ ...invoice, number: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">Currency</label>
                <select 
                  className="w-full bg-surface-container-highest border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all font-bold cursor-pointer"
                  value={invoice.currency}
                  onChange={(e) => setInvoice(prev => ({ ...prev, currency: e.target.value }))}
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Bill Addresses */}
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Bill From</label>
              <div className="space-y-3">
                <InputField placeholder="Your Name/Company" value={invoice.fromName} onChange={(v) => setInvoice({...invoice, fromName: v})} />
                <InputField placeholder="Email address" value={invoice.fromEmail} onChange={(v) => setInvoice({...invoice, fromEmail: v})} />
                <TextAreaField placeholder="Street Address, City, State" value={invoice.fromAddress} onChange={(v) => setInvoice({...invoice, fromAddress: v})} />
              </div>
            </div>
            <div className="space-y-4">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-primary">Bill To (Client)</label>
              <div className="space-y-3">
                <InputField placeholder="Client Name/Company" variant="primary" value={invoice.clientName} onChange={(v) => setInvoice({...invoice, clientName: v})} />
                <InputField placeholder="Client Email" variant="primary" value={invoice.clientEmail} onChange={(v) => setInvoice({...invoice, clientEmail: v})} />
                <TextAreaField placeholder="Client Address" variant="primary" value={invoice.clientAddress} onChange={(v) => setInvoice({...invoice, clientAddress: v})} />
              </div>
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Issue Date</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" />
                <input 
                  type="date"
                  className="w-full bg-surface-container-highest border-none rounded-xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all font-medium" 
                  value={invoice.issueDate}
                  onChange={(e) => setInvoice({ ...invoice, issueDate: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Due Date</label>
               <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" />
                <input 
                  type="date"
                  className="w-full bg-surface-container-highest border-none rounded-xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 transition-all font-medium" 
                  value={invoice.dueDate}
                  onChange={(e) => setInvoice({ ...invoice, dueDate: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Line Items */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Line Items</label>
              <button 
                onClick={addItem}
                className="text-primary text-[11px] font-bold uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all p-2 bg-indigo-50 rounded-lg"
              >
                <PlusCircle className="w-4 h-4" /> Add Item
              </button>
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-12 gap-4 px-2">
                <div className="col-span-6 text-[9px] font-bold uppercase tracking-widest text-outline">Description</div>
                <div className="col-span-2 text-[9px] font-bold uppercase tracking-widest text-outline">Qty</div>
                <div className="col-span-2 text-[9px] font-bold uppercase tracking-widest text-outline">Rate</div>
                <div className="col-span-2 text-[9px] font-bold uppercase tracking-widest text-outline text-right">Amount</div>
              </div>
              {invoice.items.map((item) => (
                <div key={item.id} className="grid grid-cols-12 gap-4 items-center group">
                  <div className="col-span-6">
                    <input 
                      className="w-full bg-surface-container-highest border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 font-medium" 
                      value={item.description}
                      onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                    />
                  </div>
                  <div className="col-span-2">
                    <input 
                      type="number"
                      className="w-full bg-surface-container-highest border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 text-center font-medium" 
                      value={item.quantity}
                      onChange={(e) => updateItem(item.id, 'quantity', Number(e.target.value))}
                    />
                  </div>
                  <div className="col-span-2">
                    <input 
                      className="w-full bg-surface-container-highest border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/20 text-center font-medium" 
                      value={item.rate}
                      onChange={(e) => updateItem(item.id, 'rate', Number(e.target.value))}
                    />
                  </div>
                  <div className="col-span-2 flex items-center justify-end gap-2">
                    <span className="text-sm font-black text-on-surface truncate">{formatCurrency(item.quantity * item.rate, invoice.currency)}</span>
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="p-2 text-outline hover:text-error transition-colors md:opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Fixed Actions */}
        <div className="absolute bottom-0 left-0 w-[55%] bg-white/80 backdrop-blur-xl border-t border-outline-variant/10 px-8 py-4 flex items-center justify-between z-20 shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.1)]">
          <button className="px-5 py-2.5 text-xs font-bold text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2 uppercase tracking-widest">
            <Save className="w-4 h-4" /> Save Draft
          </button>
          <div className="flex gap-3">
            <button className="px-6 py-2.5 bg-white border-2 border-primary text-primary rounded-xl font-bold text-xs hover:bg-indigo-50 transition-all uppercase tracking-tighter">Preview PDF</button>
            <button className="px-8 py-2.5 bg-primary text-white rounded-xl font-bold text-xs shadow-xl shadow-primary/30 hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-tighter">Preview & Send</button>
          </div>
        </div>
      </section>

      {/* Right: Live Preview */}
      <section className="w-[45%] h-full bg-surface p-12 overflow-y-auto custom-scrollbar flex justify-center">
        <div className="w-full max-w-xl">
          <div className="flex items-center gap-3 mb-8">
            <Eye className="w-4 h-4 text-primary" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-outline">Real-time Preview</span>
          </div>

          <div className="bg-white p-12 shadow-2xl shadow-indigo-900/10 min-h-[40rem] relative flex flex-col rounded-sm border border-outline-variant/5">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full pointer-events-none" />
            
            <div className="flex justify-between items-start mb-16 relative z-10">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-slate-900 flex items-center justify-center rounded-2xl shadow-lg shadow-slate-900/20">
                  <PlusCircle className="text-white w-8 h-8 rotate-45" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-slate-900 tracking-tight font-headline">{invoice.fromName}</h3>
                  <div className="text-[11px] text-slate-500 leading-relaxed font-medium mt-2 whitespace-pre-line">
                    {invoice.fromAddress}
                    <br />
                    {invoice.fromEmail}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <h2 className="text-4xl font-black text-slate-900 tracking-tighter mb-4 font-headline">INVOICE</h2>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Number</p>
                  <p className="text-sm font-black text-slate-900">{invoice.number}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-12 mb-16 relative z-10">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">Bill To</p>
                <h4 className="text-sm font-black text-slate-900 mb-1">{invoice.clientName}</h4>
                <div className="text-[11px] text-slate-500 leading-relaxed font-medium whitespace-pre-line">
                  {invoice.clientAddress}
                  <br />
                  {invoice.clientEmail}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Issued</p>
                  <p className="text-xs font-black text-slate-900">{invoice.issueDate}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Due</p>
                  <p className="text-xs font-black text-slate-900">{invoice.dueDate}</p>
                </div>
              </div>
            </div>

            <div className="flex-1 mb-12">
              <table className="w-full text-left">
                <thead className="border-b-2 border-slate-900">
                  <tr>
                    <th className="py-4 text-[10px] font-black text-slate-900 uppercase tracking-widest">Description</th>
                    <th className="py-4 text-[10px] font-black text-slate-900 uppercase tracking-widest text-center">Qty</th>
                    <th className="py-4 text-[10px] font-black text-slate-900 uppercase tracking-widest text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {invoice.items.map((item) => (
                    <tr key={item.id}>
                      <td className="py-6 pr-4">
                        <p className="text-xs font-bold text-slate-900">{item.description || 'New Item'}</p>
                      </td>
                      <td className="py-6 text-xs text-slate-600 text-center font-medium">{item.quantity}</td>
                      <td className="py-6 text-xs font-black text-slate-900 text-right">{formatCurrency(item.quantity * item.rate)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end pt-8 relative z-10 border-t border-slate-100">
              <div className="w-64 space-y-4">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-slate-500 font-bold uppercase">Subtotal</span>
                  <span className="text-slate-900 font-black">{formatCurrency(subtotal, invoice.currency)}</span>
                </div>
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-slate-500 font-bold uppercase">Tax (10%)</span>
                  <span className="text-slate-900 font-black">{formatCurrency(tax, invoice.currency)}</span>
                </div>
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-slate-500 font-bold uppercase">Discount (5%)</span>
                  <span className="text-error font-black">-{formatCurrency(discount, invoice.currency)}</span>
                </div>
                <div className="pt-4 border-t-4 border-slate-900 flex justify-between items-center">
                  <span className="text-[11px] font-black text-slate-900 uppercase tracking-tighter">Total Due</span>
                  <span className="text-2xl font-black text-slate-900 tracking-tighter font-headline">{formatCurrency(total, invoice.currency)}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-surface-container-high/50 p-6 rounded-2xl flex items-center justify-between border-l-4 border-primary backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                <DollarSign className="text-primary w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-on-surface leading-none">Auto-calculate Enabled</p>
                <p className="text-[11px] text-on-surface-variant font-medium mt-1">Changes reflect instantly in the preview</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function InputField({ placeholder, variant, value, onChange }: any) {
  return (
    <input 
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={cn(
        "w-full border-none rounded-xl px-4 py-3 text-sm transition-all shadow-sm",
        variant === 'primary' 
          ? "bg-white ring-1 ring-primary/20 focus:ring-2 focus:ring-primary font-bold" 
          : "bg-surface-container-highest focus:ring-2 focus:ring-primary/20 font-medium"
      )}
    />
  );
}

function TextAreaField({ placeholder, variant, value, onChange }: any) {
  return (
    <textarea 
      rows={3}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={cn(
        "w-full border-none rounded-xl px-4 py-3 text-sm transition-all resize-none shadow-sm",
        variant === 'primary' 
          ? "bg-white ring-1 ring-primary/20 focus:ring-2 focus:ring-primary font-bold" 
          : "bg-surface-container-highest focus:ring-2 focus:ring-primary/20 font-medium"
      )}
    />
  );
}
