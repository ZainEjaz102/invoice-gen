import { LucideIcon, TrendingUp, Wallet, Clock, AlertCircle, CheckCircle, Filter, ArrowUpDown, MoreHorizontal, Bell, Settings as SettingsIcon } from 'lucide-react';
import { MOCK_INVOICES } from '../constants';
import { formatCurrency, cn } from '../lib/utils';
import { motion } from 'motion/react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CHART_DATA = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 5000 },
  { name: 'Apr', value: 4500 },
  { name: 'May', value: 6000 },
  { name: 'Jun', value: 5500 },
  { name: 'Jul', value: 7000 },
];

export default function Dashboard() {
  return (
    <div className="px-8 py-10 space-y-10 max-w-7xl mx-auto w-full">
      {/* Page Header */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-on-surface font-headline">Revenue Dashboard</h2>
          <p className="text-on-surface-variant font-medium">A real-time overview of your organizational performance</p>
        </div>
        <div className="flex items-center gap-2 bg-surface-container-low p-1.5 rounded-xl">
          <button className="px-4 py-1.5 bg-white text-on-surface text-xs font-bold rounded-lg shadow-sm">Monthly</button>
          <button className="px-4 py-1.5 text-on-surface-variant text-xs font-semibold rounded-lg hover:bg-white/50 transition-all">Quarterly</button>
          <button className="px-4 py-1.5 text-on-surface-variant text-xs font-semibold rounded-lg hover:bg-white/50 transition-all">Yearly</button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Revenue" value={142480} trend="+12.5%" icon={Wallet} color="primary" trendIcon={TrendingUp} />
        <StatCard title="Outstanding" value={24150} subValue="Pending 12" icon={Clock} color="secondary" />
        <StatCard title="Overdue" value={4820} subValue="Critical" icon={AlertCircle} color="error" />
        <StatCard title="Paid (MTD)" value={68900} subValue="Active" icon={CheckCircle} color="tertiary" />
      </div>

      {/* Recent Invoices */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h3 className="text-xl font-bold tracking-tight font-headline">Recent Invoices</h3>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-surface-container text-on-surface text-sm font-semibold rounded-xl hover:bg-surface-container-high transition-all">
              <Filter className="w-4 h-4" />
              Filter
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-surface-container text-on-surface text-sm font-semibold rounded-xl hover:bg-surface-container-high transition-all">
              <ArrowUpDown className="w-4 h-4" />
              Sort
            </button>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-3xl overflow-hidden shadow-sm border border-outline-variant/10">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low text-on-surface-variant text-[10px] font-bold uppercase tracking-widest">
                <th className="px-8 py-5">Invoice #</th>
                <th className="px-6 py-5">Client</th>
                <th className="px-6 py-5">Date Issued</th>
                <th className="px-6 py-5 text-right">Amount</th>
                <th className="px-6 py-5">Status</th>
                <th className="px-8 py-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/10 text-sm font-medium">
              {MOCK_INVOICES.map((invoice, idx) => (
                <tr key={invoice.id} className={cn("group hover:bg-surface-container-low/50 transition-colors", idx % 2 === 1 && "bg-surface-container-low/20")}>
                  <td className="px-8 py-6 font-bold text-primary">{invoice.number}</td>
                  <td className="px-6 py-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-primary font-bold text-[10px]">
                        {invoice.clientName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-on-surface font-semibold">{invoice.clientName}</p>
                        <p className="text-[11px] text-on-surface-variant font-medium">{invoice.clientEmail}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6 text-on-surface-variant">{invoice.issueDate}</td>
                  <td className="px-6 py-6 text-right font-black">
                    {formatCurrency(invoice.items.reduce((acc, item) => acc + item.quantity * item.rate, 0))}
                  </td>
                  <td className="px-6 py-6">
                    <StatusChip status={invoice.status} />
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="p-2 text-on-surface-variant hover:text-primary transition-all">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="px-8 py-5 bg-surface-container-low/30 border-t border-outline-variant/10 flex justify-between items-center">
            <p className="text-xs text-on-surface-variant font-semibold">Showing 4 of 248 invoices</p>
            <div className="flex gap-2">
              <button disabled className="p-1.5 rounded-lg border border-outline-variant/20 hover:bg-white transition-all disabled:opacity-30">
                <ArrowUpDown className="w-4 h-4 rotate-90" />
              </button>
              <button className="p-1.5 rounded-lg border border-outline-variant/20 hover:bg-white transition-all">
                <ArrowUpDown className="w-4 h-4 -rotate-90" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-10">
        <div className="lg:col-span-2 bg-surface-container p-8 rounded-3xl relative overflow-hidden flex flex-col justify-end min-h-[16rem]">
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none p-4">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={CHART_DATA}>
                 <Area type="monotone" dataKey="value" stroke="#3525cd" fill="#3525cd" />
               </AreaChart>
             </ResponsiveContainer>
          </div>
          <div className="relative z-10">
            <h4 className="text-2xl font-extrabold tracking-tight text-on-surface mb-2 font-headline">Cash Flow Forecast</h4>
            <p className="text-on-surface-variant max-w-md mb-6 font-medium">Based on your current pending invoices, we project a 15% increase in liquid capital by end of month.</p>
            <button className="text-primary font-bold text-sm flex items-center hover:gap-2 transition-all group">
              View Detailed Projection 
              <ArrowUpDown className="w-4 h-4 ml-1 rotate-[-90deg] group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
        
        <div className="bg-indigo-900 p-8 rounded-3xl flex flex-col justify-between text-white shadow-xl shadow-indigo-900/20">
          <div>
            <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
              <TrendingUp className="text-white w-6 h-6" />
            </div>
            <h4 className="text-xl font-bold mb-2 font-headline">Automated Reminders</h4>
            <p className="text-indigo-200 text-sm leading-relaxed font-medium">Precision Ledger sent 4 auto-reminders today, resulting in 2 immediate payments.</p>
          </div>
          <button className="w-full py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold text-sm transition-all mt-6 backdrop-blur-sm">
            Configure Automation
          </button>
        </div>
      </div>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: number;
  trend?: string;
  subValue?: string;
  icon: LucideIcon;
  color: 'primary' | 'secondary' | 'error' | 'tertiary';
  trendIcon?: LucideIcon;
}

function StatCard({ title, value, trend, subValue, icon: Icon, color, trendIcon: TrendIcon }: StatCardProps) {
  const colorMap: any = {
    primary: "bg-primary/10 text-primary group-hover:bg-white/20 group-hover:text-white",
    secondary: "bg-secondary/10 text-secondary group-hover:bg-white/20 group-hover:text-white",
    error: "bg-error/10 text-error group-hover:bg-white/20 group-hover:text-white",
    tertiary: "bg-tertiary/10 text-tertiary group-hover:bg-white/20 group-hover:text-white",
  };

  const hoverColorMap: any = {
    primary: "hover:bg-primary-container",
    secondary: "hover:bg-slate-800",
    error: "hover:bg-error",
    tertiary: "hover:bg-tertiary-container",
  };

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className={cn(
        "bg-surface-container-lowest p-6 rounded-3xl shadow-sm border border-outline-variant/5 transition-all duration-300 group",
        hoverColorMap[color] || "hover:bg-primary"
      )}
    >
      <div className="flex justify-between items-start mb-4">
        <div className={cn("p-3 rounded-xl transition-all", colorMap[color])}>
          <Icon className="w-6 h-6" />
        </div>
        {trend && (
          <span className="text-tertiary font-bold text-xs flex items-center group-hover:text-white/80">
            {TrendIcon && <TrendIcon className="w-3 h-3 mr-1" />} {trend}
          </span>
        )}
        {subValue && !trend && (
          <span className={cn(
            "font-bold text-xs px-2 py-0.5 rounded-full",
            color === 'error' ? "bg-error/10 text-error group-hover:bg-white/20 group-hover:text-white" : "text-on-surface-variant group-hover:text-white/80"
          )}>
            {subValue}
          </span>
        )}
      </div>
      <p className="text-on-surface-variant text-sm font-medium group-hover:text-white/70 mb-1">{title}</p>
      <h3 className="text-2xl font-black text-on-surface group-hover:text-white tracking-tight font-headline">
        {formatCurrency(value)}
      </h3>
    </motion.div>
  );
}

function StatusChip({ status }: { status: string }) {
  const styles: any = {
    Paid: "bg-tertiary-fixed/30 text-tertiary-container",
    Pending: "bg-secondary-container/30 text-on-secondary-container",
    Overdue: "bg-error-container/30 text-error",
    Draft: "bg-surface-container-highest text-on-surface-variant",
  };

  const dotColors: any = {
    Paid: "bg-tertiary-container",
    Pending: "bg-on-secondary-container",
    Overdue: "bg-error",
    Draft: "bg-on-surface-variant",
  };

  return (
    <span className={cn("inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight backdrop-blur-sm", styles[status])}>
      <span className={cn("w-1.5 h-1.5 rounded-full mr-2", dotColors[status])} />
      {status}
    </span>
  );
}
