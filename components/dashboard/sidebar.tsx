'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Lock, Clock, MessageSquare, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const navigationItems = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'Security Auditor',
    href: '/dashboard/auditor',
    icon: Lock,
  },
  {
    label: 'Project Memory',
    href: '/dashboard/memory',
    icon: Clock,
  },
  {
    label: 'Chat',
    href: '/dashboard/chat',
    icon: MessageSquare,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 rounded-lg border border-border/70 bg-background/80 hover:bg-secondary text-foreground shadow-lg backdrop-blur-md"
        aria-label="Toggle navigation"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <div
        className={cn(
          'fixed left-0 top-0 h-screen w-64 overflow-hidden bg-sidebar/82 border-r border-sidebar-border shadow-[24px_0_80px_-58px_oklch(0.55_0.19_262.95_/_0.9)] backdrop-blur-xl transition-transform duration-300 lg:translate-x-0 z-40',
          !isOpen && '-translate-x-full'
        )}
      >
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(160deg,oklch(0.55_0.19_262.95_/_0.16),transparent_42%)]" />
        <div className="p-6 border-b border-sidebar-border">
          <div className="relative flex items-center gap-3 mb-2">
            <div className="relative w-9 h-9 rounded-lg bg-gradient-to-br from-accent to-cyan-500 flex items-center justify-center shadow-lg shadow-accent/25">
              <span className="absolute inset-[-6px] rounded-xl border border-accent/20 animate-signal-pulse motion-reduce:animate-none" />
              <Lock size={18} className="text-white" />
            </div>
            <h1 className="text-xl font-bold text-sidebar-foreground">SecureAI</h1>
          </div>
          <p className="text-xs text-sidebar-foreground/60">Intelligence Platform</p>
        </div>

        <nav className="relative p-4 space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  'group flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300',
                  isActive
                    ? 'bg-accent text-accent-foreground font-medium shadow-lg shadow-accent/25'
                    : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground hover:translate-x-1'
                )}
              >
                <Icon size={20} className="transition-transform duration-300 group-hover:scale-110" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-sidebar-border bg-sidebar/50">
          <p className="text-xs text-sidebar-foreground/60 text-center">v1.0 - Secure by Design</p>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
