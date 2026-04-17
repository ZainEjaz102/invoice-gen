import React from 'react';
import { LayoutDashboard, FilePlus, Files, Settings, HelpCircle, User, Plus } from 'lucide-react';
import { cn } from '../lib/utils';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'creator', icon: FilePlus, label: 'Invoice Creator' },
    { id: 'invoices', icon: Files, label: 'Documents' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <aside className="hidden md:flex flex-col h-screen w-64 bg-slate-50 border-r border-outline-variant/10 py-8 px-4 flex-shrink-0">
      <div className="mb-10 px-2 flex items-center gap-3">
        <div className="w-10 h-10 bg-primary-container rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
          <LayoutDashboard className="text-white w-6 h-6" />
        </div>
        <div>
          <h1 className="text-lg font-black tracking-tight text-slate-900 font-headline">Precision Ledger</h1>
          <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">The Financial Architect</p>
        </div>
      </div>

      <nav className="flex-grow space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 hover:translate-x-1 group text-left",
              activeTab === item.id 
                ? "text-primary font-bold border-r-4 border-primary bg-indigo-50" 
                : "text-slate-500 hover:text-primary hover:bg-slate-100"
            )}
          >
            <item.icon className={cn("w-5 h-5", activeTab === item.id ? "text-primary" : "text-slate-400 group-hover:text-primary")} />
            <span className="text-sm">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto space-y-1 border-t border-outline-variant/10 pt-6">
        <button 
          onClick={() => setActiveTab('creator')}
          className="w-full flex items-center justify-center gap-2 bg-primary-container text-white py-3 rounded-xl font-bold text-sm shadow-sm transition-all hover:scale-105 active:scale-95 mb-6"
        >
          <Plus className="w-4 h-4" />
          New Invoice
        </button>
        
        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-all text-left">
          <HelpCircle className="w-5 h-5 text-slate-400" />
          <span className="text-sm font-medium">Help Center</span>
        </button>
        
        <div className="flex items-center gap-3 px-3 py-2 mt-2">
          <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center overflow-hidden border-2 border-white shadow-sm">
            <User className="w-5 h-5 text-slate-500" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900 leading-none">Account</p>
            <p className="text-[10px] text-slate-500 font-medium">Admin Access</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
