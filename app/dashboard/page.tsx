'use client';

import { mockProjectData } from '@/lib/mock-data';
import { SecurityScorePanel } from '@/components/dashboard/security-score';
import { SecurityIssuesPanel } from '@/components/dashboard/security-issues-panel';
import { ProjectUnderstanding } from '@/components/dashboard/project-understanding';
import { MemoryTimeline } from '@/components/dashboard/memory-timeline';
import { MockDataGenerator } from '@/components/dashboard/mock-data-generator';
import { motion, useReducedMotion } from 'framer-motion';
import { BrainCircuit, ScanSearch, ShieldCheck, Sparkles, Zap } from 'lucide-react';

const ease = [0.22, 1, 0.36, 1] as const;

export default function DashboardPage() {
  const reduceMotion = useReducedMotion();

  const criticalCount = mockProjectData.findings.filter((finding) => finding.severity === 'high').length;
  const stats = [
    {
      label: 'Threats Found',
      value: mockProjectData.findings.length,
      detail: `${criticalCount} critical`,
      icon: ScanSearch,
      tone: 'text-red-500',
    },
    {
      label: 'Security Score',
      value: `${mockProjectData.securityScore}/100`,
      detail: 'live posture',
      icon: ShieldCheck,
      tone: 'text-emerald-500',
    },
    {
      label: 'Modules Mapped',
      value: mockProjectData.modules.length,
      detail: 'AI understood',
      icon: BrainCircuit,
      tone: 'text-cyan-500',
    },
    {
      label: 'Demo Speed',
      value: '<1s',
      detail: 'instant insight',
      icon: Zap,
      tone: 'text-yellow-500',
    },
  ];

  const section = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="p-4 lg:p-8">
      <motion.div
        className="mx-auto max-w-7xl"
        initial={reduceMotion ? false : 'hidden'}
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.08 },
          },
        }}
      >
        <motion.div
          variants={section}
          transition={{ duration: reduceMotion ? 0 : 0.55, ease }}
          className="relative mb-6 overflow-hidden rounded-2xl border border-accent/25 bg-background/55 p-6 shadow-[0_24px_80px_-42px_oklch(0.55_0.19_262.95_/_0.85)] backdrop-blur-xl scanline-panel"
        >
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(110deg,oklch(0.55_0.19_262.95_/_0.16),transparent_38%),linear-gradient(250deg,oklch(0.6_0.15_200_/_0.13),transparent_44%)]" />
          <div className="relative flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                <Sparkles className="size-3.5" />
                Hackathon Command Center
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                AI Project Intelligence Dashboard
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                Monitor security issues, explain code structure, and turn risky findings into a crisp story judges can understand fast.
              </p>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-border/70 bg-background/55 px-4 py-3 backdrop-blur-md">
              <span className="relative flex size-3">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-signal-pulse motion-reduce:animate-none" />
                <span className="relative inline-flex size-3 rounded-full bg-emerald-400" />
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground">Live analysis</p>
                <p className="text-xs text-muted-foreground">demo data online</p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={section}
          transition={{ duration: reduceMotion ? 0 : 0.5, ease }}
          className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={reduceMotion ? false : { opacity: 0, y: 14, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: reduceMotion ? 0 : 0.45, delay: reduceMotion ? 0 : index * 0.06, ease }}
                whileHover={reduceMotion ? undefined : { y: -4, scale: 1.01 }}
                className="glass-panel rounded-xl p-4"
              >
                <div className="relative flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">{stat.label}</p>
                    <p className="mt-2 text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{stat.detail}</p>
                  </div>
                  <div className="rounded-xl border border-border/70 bg-background/60 p-3">
                    <Icon className={`size-5 ${stat.tone}`} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          variants={section}
          transition={{ duration: reduceMotion ? 0 : 0.55, ease }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6"
        >
          <div className="lg:col-span-1">
            <SecurityScorePanel score={mockProjectData.securityScore} findings={mockProjectData.findings} />
          </div>
          <div className="lg:col-span-2">
            <ProjectUnderstanding
              name={mockProjectData.name}
              type={mockProjectData.type}
              modules={mockProjectData.modules}
              dataFlow={mockProjectData.dataFlow}
            />
          </div>
        </motion.div>

        <motion.div
          variants={section}
          transition={{ duration: reduceMotion ? 0 : 0.55, ease }}
          className="mb-6"
        >
          <SecurityIssuesPanel findings={mockProjectData.findings} />
        </motion.div>

        <motion.div
          variants={section}
          transition={{ duration: reduceMotion ? 0 : 0.55, ease }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6"
        >
          <div>
            <MemoryTimeline items={mockProjectData.memoryItems} />
          </div>
          <div>
            <MockDataGenerator />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
