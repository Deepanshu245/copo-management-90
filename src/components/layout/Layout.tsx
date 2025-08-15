import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { cn } from '@/lib/utils';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-background">
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
      />
      <main className={cn(
        "flex-1 overflow-auto transition-smooth",
        sidebarCollapsed ? "ml-0" : "ml-0"
      )}>
        <div className="dashboard-bg min-h-full">
          {children}
        </div>
      </main>
    </div>
  );
};