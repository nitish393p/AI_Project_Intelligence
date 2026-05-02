'use client';

import { Bell, Settings, User } from 'lucide-react';
import { ThemeToggle } from '@/components/dashboard/theme-toggle';

export function Navbar() {
  return (
    <div className="fixed top-0 right-0 left-0 lg:left-64 h-16 z-40 border-b border-border/70 bg-background/72 backdrop-blur-xl backdrop-saturate-150 supports-[backdrop-filter]:bg-background/55 shadow-[0_1px_0_0_oklch(0.55_0.19_262.95_/_0.08)]">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-accent/45 to-transparent" />
      <div className="h-full px-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">AI Project Intelligence</h2>
          <p className="text-xs text-muted-foreground">Real-time Security & Code Analysis</p>
        </div>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <button className="p-2 rounded-lg border border-transparent hover:border-accent/30 hover:bg-secondary text-muted-foreground hover:text-foreground transition-all">
            <Bell size={20} />
          </button>
          <button className="p-2 rounded-lg border border-transparent hover:border-accent/30 hover:bg-secondary text-muted-foreground hover:text-foreground transition-all">
            <Settings size={20} />
          </button>
          <button className="p-2 rounded-lg border border-transparent hover:border-accent/30 hover:bg-secondary text-muted-foreground hover:text-foreground transition-all">
            <User size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
