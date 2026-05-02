'use client';

import { useState } from 'react';
import { SecurityFinding } from '@/lib/types';
import { Copy, Check, Shield, AlertTriangle, AlertCircle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SecurityIssuesPanelProps {
  findings: SecurityFinding[];
}

export function SecurityIssuesPanel({ findings }: SecurityIssuesPanelProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<string | null>(null);

  const threatTypeLabels: Record<string, { label: string; icon: React.ReactNode; description: string }> = {
    email: {
      label: 'Exposed Email (PII)',
      icon: <AlertTriangle size={16} />,
      description: 'Personally identifiable information exposed in code',
    },
    phone: {
      label: 'Exposed Phone (PII)',
      icon: <AlertCircle size={16} />,
      description: 'Phone number exposed in code or comments',
    },
    api_key: {
      label: 'Hardcoded API Key',
      icon: <AlertTriangle size={16} />,
      description: 'Secret credentials committed to repository',
    },
    sql_injection: {
      label: 'SQL Injection Risk',
      icon: <AlertTriangle size={16} />,
      description: 'Vulnerable query construction pattern detected',
    },
  };

  const getRiskColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return {
          bg: 'bg-red-500/10',
          border: 'border-red-500/30',
          text: 'text-red-500',
          badge: 'bg-red-500/20 text-red-500 border-red-500/30',
        };
      case 'medium':
        return {
          bg: 'bg-yellow-500/10',
          border: 'border-yellow-500/30',
          text: 'text-yellow-500',
          badge: 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30',
        };
      case 'low':
        return {
          bg: 'bg-green-500/10',
          border: 'border-green-500/30',
          text: 'text-green-500',
          badge: 'bg-green-500/20 text-green-500 border-green-500/30',
        };
      default:
        return {
          bg: 'bg-blue-500/10',
          border: 'border-blue-500/30',
          text: 'text-blue-500',
          badge: 'bg-blue-500/20 text-blue-500 border-blue-500/30',
        };
    }
  };

  const getRiskLabel = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'Critical Risk';
      case 'medium':
        return 'Medium Risk';
      case 'low':
        return 'Low Risk';
      default:
        return 'Safe';
    }
  };

  const filteredFindings = filterType
    ? findings.filter((f) => f.type === filterType)
    : findings;

  const threatTypes = Array.from(new Set(findings.map((f) => f.type)));

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header with stats */}
      <div className="glass-panel rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Shield className="text-accent" size={24} />
            <h3 className="text-lg font-semibold text-foreground">Security Issues Detected</h3>
          </div>
          <div className="text-3xl font-bold text-red-500">{findings.length}</div>
        </div>

        {/* Threat type filters */}
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setFilterType(null)}
            className={cn(
              'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border',
              filterType === null
                ? 'bg-accent text-accent-foreground border-accent'
                : 'bg-background text-muted-foreground border-border hover:text-foreground'
            )}
          >
            All ({findings.length})
          </button>
          {threatTypes.map((type) => {
            const typeData = threatTypeLabels[type as keyof typeof threatTypeLabels];
            const count = findings.filter((f) => f.type === type).length;
            const color = getRiskColor(
              findings.filter((f) => f.type === type)[0]?.severity || 'low'
            );
            return (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors border flex items-center gap-2',
                  filterType === type
                    ? `${color.badge} border`
                    : 'bg-background text-muted-foreground border-border hover:text-foreground'
                )}
              >
                {typeData.icon}
                <span>{typeData.label}</span>
                <span className="ml-1 opacity-75">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Issues list */}
      <div className="space-y-3">
        {filteredFindings.length > 0 ? (
          filteredFindings.map((finding) => {
            const colors = getRiskColor(finding.severity);
            const threatInfo = threatTypeLabels[finding.type as keyof typeof threatTypeLabels];

            return (
              <div
                key={finding.id}
                className={cn(
                  'rounded-xl border transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_48px_-30px_currentColor]',
                  expandedId === finding.id
                    ? `${colors.bg} ${colors.border} border-2`
                    : `${colors.bg} ${colors.border} border`
                )}
              >
                <button
                  onClick={() => setExpandedId(expandedId === finding.id ? null : finding.id)}
                  className="w-full p-4 text-left hover:bg-background/20 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    {/* Risk indicator */}
                    <div className={cn('p-2.5 rounded-lg flex-shrink-0', colors.bg, colors.text)}>
                      {threatInfo.icon}
                    </div>

                    {/* Issue details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h4 className={cn('font-semibold mb-1', colors.text)}>
                            {threatInfo.label}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {threatInfo.description}
                          </p>
                          <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                            <code className="bg-background/40 px-2 py-1 rounded">
                              {finding.file}:{finding.line}
                            </code>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Risk badge */}
                    <div
                      className={cn(
                        'px-3 py-1.5 rounded-lg text-xs font-semibold flex-shrink-0 border',
                        colors.badge
                      )}
                    >
                      {getRiskLabel(finding.severity)}
                    </div>
                  </div>
                </button>

                {/* Expanded details */}
                {expandedId === finding.id && (
                  <div className={cn('border-t p-4', colors.border)}>
                    <div className="space-y-4">
                      {/* Found content */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-xs font-semibold text-muted-foreground uppercase">
                            Detected Content
                          </label>
                          <button
                            onClick={() => copyToClipboard(finding.content, `content-${finding.id}`)}
                            className="p-1 hover:bg-background rounded transition-colors"
                            title="Copy to clipboard"
                          >
                            {copiedId === `content-${finding.id}` ? (
                              <Check size={14} className="text-green-500" />
                            ) : (
                              <Copy size={14} className="text-muted-foreground" />
                            )}
                          </button>
                        </div>
                        <code className="block text-sm bg-background/50 rounded border border-border p-3 overflow-x-auto font-mono text-foreground">
                          {finding.content}
                        </code>
                      </div>

                      {/* Code context */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-xs font-semibold text-muted-foreground uppercase">
                            Code Context
                          </label>
                          <button
                            onClick={() => copyToClipboard(finding.context, `context-${finding.id}`)}
                            className="p-1 hover:bg-background rounded transition-colors"
                            title="Copy to clipboard"
                          >
                            {copiedId === `context-${finding.id}` ? (
                              <Check size={14} className="text-green-500" />
                            ) : (
                              <Copy size={14} className="text-muted-foreground" />
                            )}
                          </button>
                        </div>
                        <code className="block text-sm bg-background/50 rounded border border-border p-3 overflow-x-auto font-mono text-foreground">
                          {finding.context}
                        </code>
                      </div>

                      {/* Suggested fix */}
                      <div>
                        <label className="text-xs font-semibold text-muted-foreground uppercase block mb-2">
                          Recommended Fix
                        </label>
                        <div className={cn(
                          'rounded border p-3 text-sm leading-relaxed',
                          colors.bg,
                          colors.border
                        )}>
                          <p className={cn('text-foreground', colors.text)}>
                            {finding.suggestedFix}
                          </p>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex gap-2 pt-2">
                        <button
                          className={cn(
                            'flex-1 px-4 py-2 rounded-lg text-sm font-semibold transition-colors',
                            colors.badge
                          )}
                        >
                          Review Fix
                        </button>
                        <button className="flex-1 px-4 py-2 rounded-lg text-sm font-semibold bg-accent text-accent-foreground hover:bg-accent/90 transition-colors">
                          Mark as Fixed
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="rounded-xl border border-border bg-secondary p-8 text-center">
            <Shield className="mx-auto mb-3 text-green-500" size={32} />
            <h3 className="font-semibold text-foreground mb-1">No Issues Found</h3>
            <p className="text-muted-foreground">Your codebase looks secure!</p>
          </div>
        )}
      </div>
    </div>
  );
}
