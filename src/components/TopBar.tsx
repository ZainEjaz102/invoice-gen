import React from 'react';
import { Search, Share, Download, Bell, Settings as SettingsIcon } from 'lucide-react';
import { cn } from '../lib/utils';

interface TopBarProps {
  activeTab: string;
}

export default function TopBar({ activeTab }: TopBarProps) {
  const getTitle = () => {
    switch(activeTab) {
      case 'dashboard': return 'Invoices';
      case 'creator': return 'Invoice Creator';
      case 'invoices': return 'Documents';
      case 'settings': return 'Settings';
      default: return 'Invoices';
    }
  };

  return (
    <header className="sticky top-0 z-50 flex justify-between items-center w-full px-8 py-4 bg-white/80 backdrop-blur-xl border-b border-outline-variant/10">
      <div className="flex items-center gap-8">
        <h2 className="text-lg font-black font-headline text-slate-900 lg:hidden">{getTitle()}</h2>
        <div className="relative group hidden lg:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant w-4 h-4" />
          <input 
            className="bg-surface-container-low border-none rounded-full py-2 pl-10 pr-4 text-xs focus:ring-2 focus:ring-primary/20 w-64 transition-all outline-none font-medium" 
            placeholder="Search invoices, clients..." 
            type="text" 
          />
        </div>
        <nav className="hidden sm:flex items-center gap-6">
          <button className={cn("pb-1 font-bold text-sm transition-all duration-200", activeTab === 'dashboard' ? "text-primary border-b-2 border-primary" : "text-slate-600 hover:text-primary")}>Invoices</button>
          <button className="text-slate-600 hover:text-primary font-bold text-sm transition-all duration-200">Clients</button>
          <button className="text-slate-600 hover:text-primary font-bold text-sm transition-all duration-200">Reports</button>
        </nav>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:text-primary transition-all font-bold text-xs uppercase tracking-widest">
            <Share className="w-4 h-4" />
            <span>Share</span>
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white font-black rounded-xl shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all text-xs uppercase tracking-tighter">
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
          </button>
        </div>
        <div className="h-8 w-px bg-outline-variant/20 mx-2"></div>
        <div className="flex items-center gap-3">
          <button className="p-2.5 text-slate-600 hover:bg-slate-100 rounded-full transition-all relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-error rounded-full border-2 border-white"></span>
          </button>
          <button className="p-2.5 text-slate-600 hover:bg-slate-100 rounded-full transition-all">
            <SettingsIcon className="w-5 h-5" />
          </button>
          <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden ml-2">
            <img 
              referrerPolicy="no-referrer"
              src="https://picsum.photos/seed/executive/200/200" 
              alt="User" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
