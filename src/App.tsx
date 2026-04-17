import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Dashboard from './components/Dashboard';
import InvoiceCreator from './components/InvoiceCreator';
import Settings from './components/Settings';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard key="dashboard" />;
      case 'creator':
        return <InvoiceCreator key="creator" />;
      case 'settings':
        return <Settings key="settings" />;
      case 'invoices':
        return (
          <div className="p-20 text-center">
            <h2 className="text-2xl font-bold font-headline">Documents View</h2>
            <p className="text-on-surface-variant mt-2">Implementation of the document list coming soon.</p>
          </div>
        );
      default:
        return <Dashboard key="dashboard" />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-surface text-on-surface">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <TopBar activeTab={activeTab} />
        
        <div className="flex-1 overflow-y-auto custom-scrollbar bg-surface/50">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="h-full"
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Backdrop gradients for that premium feel */}
        <div className="fixed top-0 right-0 w-[40rem] h-[40rem] bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none" />
        <div className="fixed bottom-0 left-0 w-[30rem] h-[30rem] bg-secondary/5 rounded-full blur-[100px] -z-10 pointer-events-none" />
      </main>
    </div>
  );
}
