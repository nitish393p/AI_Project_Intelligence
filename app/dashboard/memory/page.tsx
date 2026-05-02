'use client';

import { mockProjectData } from '@/lib/mock-data';
import { MemoryTimeline } from '@/components/dashboard/memory-timeline';
import { TrendingUp, AlertCircle, Zap, Shield, GitBranch } from 'lucide-react';

export default function MemoryPage() {
  const securityEvents = mockProjectData.memoryItems.filter((item) => item.category === 'security').length;
  const featureUpdates = mockProjectData.memoryItems.filter((item) => item.category === 'feature').length;
  const refactorEvents = mockProjectData.memoryItems.filter((item) => item.category === 'refactor').length;
  const latestEvent = mockProjectData.memoryItems[0];

  return (
    <div className="p-4 lg:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Project Memory</h1>
          <p className="text-muted-foreground">
            Complete timeline of project changes and milestones. Use this to quickly resume work and understand what changed during your absence.
          </p>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-secondary rounded-lg border border-border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase">Total Events</p>
                <p className="text-2xl font-bold text-foreground mt-1">{mockProjectData.memoryItems.length}</p>
              </div>
              <TrendingUp size={24} className="text-accent opacity-20" />
            </div>
          </div>

          <div className="bg-secondary rounded-lg border border-green-500/20 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-green-500 uppercase">Features</p>
                <p className="text-2xl font-bold text-green-500 mt-1">{featureUpdates}</p>
              </div>
              <Zap size={24} className="text-green-500 opacity-20" />
            </div>
          </div>

          <div className="bg-secondary rounded-lg border border-red-500/20 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-red-500 uppercase">Security</p>
                <p className="text-2xl font-bold text-red-500 mt-1">{securityEvents}</p>
              </div>
              <Shield size={24} className="text-red-500 opacity-20" />
            </div>
          </div>

          <div className="bg-secondary rounded-lg border border-blue-500/20 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-blue-500 uppercase">Refactors</p>
                <p className="text-2xl font-bold text-blue-500 mt-1">{refactorEvents}</p>
              </div>
              <GitBranch size={24} className="text-blue-500 opacity-20" />
            </div>
          </div>
        </div>

        {/* Main timeline */}
        <div className="mb-8">
          <MemoryTimeline items={mockProjectData.memoryItems} />
        </div>

        {/* Insights section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Latest activity */}
          <div className="bg-secondary rounded-xl border border-border p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Zap size={20} className="text-accent" />
              Latest Activity
            </h3>
            <div className="space-y-4">
              {mockProjectData.memoryItems.slice(0, 3).map((item) => (
                <div key={item.id} className="pb-4 border-b border-border last:border-b-0">
                  <p className="font-semibold text-foreground text-sm">{item.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tips for resuming work */}
          <div className="bg-secondary rounded-xl border border-border p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <AlertCircle size={20} className="text-blue-500" />
              Resume Checklist
            </h3>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <input
                  type="checkbox"
                  className="mt-1 w-4 h-4 rounded border-border cursor-pointer"
                  defaultChecked
                />
                <label className="text-sm text-foreground cursor-pointer">Review timeline for critical updates</label>
              </li>
              <li className="flex gap-3">
                <input type="checkbox" className="mt-1 w-4 h-4 rounded border-border cursor-pointer" />
                <label className="text-sm text-foreground cursor-pointer">Check security issues from audits</label>
              </li>
              <li className="flex gap-3">
                <input type="checkbox" className="mt-1 w-4 h-4 rounded border-border cursor-pointer" />
                <label className="text-sm text-foreground cursor-pointer">Run latest tests and builds</label>
              </li>
              <li className="flex gap-3">
                <input type="checkbox" className="mt-1 w-4 h-4 rounded border-border cursor-pointer" />
                <label className="text-sm text-foreground cursor-pointer">Review project understanding notes</label>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
