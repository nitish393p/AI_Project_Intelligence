'use client';

import { mockProjectData } from '@/lib/mock-data';
import { SecurityAuditor } from '@/components/dashboard/security-auditor';
import { SecurityIssuesPanel } from '@/components/dashboard/security-issues-panel';
import { useState } from 'react';

export default function AuditorPage() {
  const [activeTab, setActiveTab] = useState('issues');

  const highSeverityCount = mockProjectData.findings.filter((f) => f.severity === 'high').length;
  const mediumSeverityCount = mockProjectData.findings.filter((f) => f.severity === 'medium').length;
  const lowSeverityCount = mockProjectData.findings.filter((f) => f.severity === 'low').length;

  return (
    <div className="p-4 lg:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Security & Privacy Auditor</h1>
          <p className="text-muted-foreground">
            Detailed analysis of all detected security issues and sensitive data in your codebase
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-secondary rounded-lg border border-red-500/30 p-4">
            <div className="text-2xl font-bold text-red-500">{highSeverityCount}</div>
            <p className="text-sm text-muted-foreground mt-1">High Severity</p>
          </div>
          <div className="bg-secondary rounded-lg border border-yellow-500/30 p-4">
            <div className="text-2xl font-bold text-yellow-500">{mediumSeverityCount}</div>
            <p className="text-sm text-muted-foreground mt-1">Medium Severity</p>
          </div>
          <div className="bg-secondary rounded-lg border border-green-500/30 p-4">
            <div className="text-2xl font-bold text-green-500">{lowSeverityCount}</div>
            <p className="text-sm text-muted-foreground mt-1">Low Severity</p>
          </div>
          <div className="bg-secondary rounded-lg border border-border p-4">
            <div className="text-2xl font-bold text-foreground">{mockProjectData.findings.length}</div>
            <p className="text-sm text-muted-foreground mt-1">Total Findings</p>
          </div>
        </div>

        {/* Tab navigation */}
        <div className="flex gap-2 mb-6 border-b border-border">
          <button
            onClick={() => setActiveTab('issues')}
            className={cn(
              'px-4 py-3 font-medium border-b-2 transition-colors',
              activeTab === 'issues'
                ? 'border-accent text-accent'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            )}
          >
            Security Issues Panel
          </button>
          <button
            onClick={() => setActiveTab('detailed')}
            className={cn(
              'px-4 py-3 font-medium border-b-2 transition-colors',
              activeTab === 'detailed'
                ? 'border-accent text-accent'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            )}
          >
            Detailed Audit Report
          </button>
        </div>

        {/* Tab content */}
        {activeTab === 'issues' && <SecurityIssuesPanel findings={mockProjectData.findings} />}
        {activeTab === 'detailed' && <SecurityAuditor findings={mockProjectData.findings} />}
      </div>
    </div>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}
