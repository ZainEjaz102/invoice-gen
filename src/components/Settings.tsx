import React from 'react';
import { Camera, Mail, Globe, MapPin, ShieldCheck, DollarSign, Receipt, Plus } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Settings() {
  return (
    <div className="px-8 py-10 max-w-6xl mx-auto w-full pb-20">
      <header className="mb-10 flex justify-between items-end">
        <div>
          <h2 className="font-headline text-4xl font-extrabold tracking-tight text-on-surface mb-2">Company Configuration</h2>
          <p className="text-on-surface-variant max-w-md font-medium">Refine your architectural identity and fiscal parameters for precision in every transaction.</p>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-2.5 rounded-xl border border-outline-variant text-on-surface hover:bg-surface-container-low transition-all font-bold text-sm">Discard</button>
          <button className="px-6 py-2.5 rounded-xl bg-gradient-to-br from-primary to-primary-container text-white shadow-lg shadow-primary/30 hover:scale-105 transition-all font-bold text-sm">Save Changes</button>
        </div>
      </header>

      <div className="flex gap-1 bg-surface-container-low p-1.5 rounded-2xl w-fit mb-12 shadow-sm">
        <button className="px-6 py-2.5 rounded-xl bg-white shadow-md text-primary font-black text-xs uppercase tracking-tight">Company Profile</button>
        <button className="px-6 py-2.5 rounded-xl text-on-surface-variant hover:bg-white/50 font-bold text-xs uppercase tracking-tight">Preferences</button>
        <button className="px-6 py-2.5 rounded-xl text-on-surface-variant hover:bg-white/50 font-bold text-xs uppercase tracking-tight">Taxes</button>
        <button className="px-6 py-2.5 rounded-xl text-on-surface-variant hover:bg-white/50 font-bold text-xs uppercase tracking-tight">Currency</button>
      </div>

      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 lg:col-span-4 bg-surface-container-lowest p-10 rounded-[2.5rem] flex flex-col items-center justify-center text-center shadow-xl shadow-indigo-900/5 group border border-outline-variant/5">
          <div className="relative mb-8">
            <div className="w-48 h-48 rounded-full bg-slate-900 flex items-center justify-center overflow-hidden border-8 border-white shadow-2xl transition-transform duration-500 group-hover:scale-105">
               <ShieldCheck className="text-indigo-400 w-24 h-24" />
            </div>
            <button className="absolute bottom-2 right-2 w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center shadow-xl transition-all border-4 border-white">
              <Camera className="w-5 h-5" />
            </button>
          </div>
          <h3 className="font-headline text-2xl font-black mb-1">Precision Ledger</h3>
          <p className="text-sm text-on-surface-variant mb-8 font-medium">Established 2024</p>
          <div className="w-full space-y-3">
            <button className="w-full py-3.5 rounded-2xl border-2 border-outline-variant/20 text-sm font-bold hover:bg-surface-container-low transition-all">Upload New Logo</button>
            <button className="w-full py-3.5 rounded-2xl text-error text-sm font-bold hover:bg-error-container/30 transition-all">Remove Brand Assets</button>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-8 space-y-8">
          <div className="bg-surface-container-low p-10 rounded-[2.5rem] shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="col-span-2"><SettingInput label="Legal Company Name" value="Precision Ledger Global LTD" /></div>
              <div><SettingInput label="Corporate Email" value="billing@precisionledger.io" icon={Mail} /></div>
              <div><SettingInput label="Business Website" value="www.precisionledger.io" icon={Globe} /></div>
              <div className="col-span-2"><SettingTextarea label="Registered Address" value={"88 Financial Plaza, Suite 400\nNew York, NY 10005\nUnited States"} icon={MapPin} /></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-surface-container-low p-8 rounded-[2rem] shadow-sm space-y-6">
              <h3 className="font-headline text-lg font-black flex items-center gap-3"><DollarSign className="w-5 h-5 text-primary" /> Fiscal Parameters</h3>
              <SettingSelect label="Default Currency" options={['USD', 'EUR', 'GBP']} />
              <div className="flex gap-3">
                <SettingInput label="Prefix" value="PL-" align="center" />
                <SettingInput label="Next #" value="0001" disabled />
              </div>
            </div>
            <div className="bg-indigo-50/50 backdrop-blur-xl border border-primary/10 p-8 rounded-[2rem] shadow-sm space-y-4">
              <h3 className="font-headline text-lg font-black flex items-center gap-3"><Receipt className="w-5 h-5 text-secondary" /> Tax Architect</h3>
              <TaxCard label="Standard VAT" rate="21%" active />
              <TaxCard label="Digital Services" rate="5%" />
              <button className="w-full py-4 border-2 border-dashed border-primary/20 rounded-2xl text-primary font-bold text-xs uppercase tracking-widest hover:bg-primary/5 transition-all flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" /> Add Tax
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const SettingInput = ({ label, value, icon: Icon, disabled, align }: any) => (
  <div>
    <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">{label}</label>
    <div className="relative">
      {Icon && <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-outline" />}
      <input 
        className={cn(
          "w-full bg-white border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20 text-sm font-bold shadow-sm",
          Icon && "pl-12",
          align === "center" && "text-center",
          disabled && "opacity-50 cursor-not-allowed italic"
        )} 
        defaultValue={value} 
        disabled={disabled}
      />
    </div>
  </div>
);

const SettingTextarea = ({ label, value, icon: Icon }: any) => (
  <div>
    <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">{label}</label>
    <div className="relative">
      {Icon && <Icon className="absolute left-4 top-4 w-4 h-4 text-outline" />}
      <textarea className={cn("w-full bg-white border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20 text-sm font-bold shadow-sm resize-none", Icon && "pl-12")} rows={3} defaultValue={value} />
    </div>
  </div>
);

const SettingSelect = ({ label, options }: any) => (
  <div>
    <label className="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant mb-2">{label}</label>
    <select className="w-full bg-white border-none rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20 text-sm font-bold shadow-sm appearance-none cursor-pointer">
      {options.map((o: string) => <option key={o}>{o}</option>)}
    </select>
  </div>
);

const TaxCard = ({ label, rate, active }: any) => (
  <div className={cn("flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border", active ? "border-primary/20" : "border-transparent")}>
    <p className="font-bold text-sm text-slate-800">{label}</p>
    <div className={cn("px-3 py-1 rounded-lg font-black text-xs", active ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-slate-100 text-slate-500")}>{rate}</div>
  </div>
);
