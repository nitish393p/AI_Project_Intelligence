'use client';

import { AlertTriangle, CheckCircle2 } from 'lucide-react';
import { SecurityFinding } from '@/lib/types';

interface SecurityScorePanelProps {
  score: number;
  findings: SecurityFinding[];
}

export function SecurityScorePanel({ score, findings }: SecurityScorePanelProps) {
  const highSeverity = findings.filter((f) => f.severity === 'high').length;
  const mediumSeverity = findings.filter((f) => f.severity === 'medium').length;
  const lowSeverity = findings.filter((f) => f.severity === 'low').length;

  const scoreColor = score >= 80 ? 'text-green-500' : score >= 50 ? 'text-yellow-500' : 'text-red-500';
  const scoreBg = score >= 80 ? 'from-green-500/20' : score >= 50 ? 'from-yellow-500/20' : 'from-red-500/20';

  return (
    <div className="glass-panel rounded-xl p-6 h-full flex flex-col">
      <h3 className="text-lg font-semibold text-foreground mb-4">Security Score</h3>

      <div className="flex-1 flex flex-col items-center justify-center gap-6">
        <div className={`relative w-32 h-32 rounded-full bg-gradient-to-br ${scoreBg} to-transparent border-2 border-border flex items-center justify-center shadow-[inset_0_0_28px_oklch(1_0_0_/_0.06)]`}>
          <div className="absolute inset-[-8px] rounded-full border border-accent/20 animate-signal-pulse motion-reduce:animate-none" />
          <div className="text-center">
            <div className={`text-4xl font-bold ${scoreColor}`}>{score}</div>
            <div className="text-xs text-muted-foreground mt-1">/100</div>
          </div>
        </div>

        <div className="w-full space-y-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <AlertTriangle size={16} className="text-red-500" />
              <span className="text-muted-foreground">High Severity</span>
            </div>
            <span className="font-semibold text-foreground">{highSeverity}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <AlertTriangle size={16} className="text-yellow-500" />
              <span className="text-muted-foreground">Medium Severity</span>
            </div>
            <span className="font-semibold text-foreground">{mediumSeverity}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={16} className="text-blue-500" />
              <span className="text-muted-foreground">Low Severity</span>
            </div>
            <span className="font-semibold text-foreground">{lowSeverity}</span>
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <p className="text-xs text-muted-foreground text-center">
          {score >= 80
            ? '✓ Security posture is strong'
            : score >= 50
              ? '⚠ Address medium priority issues'
              : '! Critical issues require immediate attention'}
        </p>
      </div>
    </div>
  );
}
