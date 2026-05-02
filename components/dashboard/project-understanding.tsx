'use client';

import { Code2, Database, Shield } from 'lucide-react';

interface ProjectUnderstandingProps {
  name: string;
  type: string;
  modules: string[];
  dataFlow: string;
}

export function ProjectUnderstanding({ name, type, modules, dataFlow }: ProjectUnderstandingProps) {
  return (
    <div className="glass-panel rounded-xl p-6 h-full flex flex-col">
      <h3 className="text-lg font-semibold text-foreground mb-4">Project Understanding</h3>

      <div className="space-y-4 flex-1">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Code2 size={18} className="text-accent" />
            <label className="text-sm font-semibold text-muted-foreground">Project Type</label>
          </div>
          <p className="text-sm text-foreground ml-6">{type}</p>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Database size={18} className="text-accent" />
            <label className="text-sm font-semibold text-muted-foreground">Key Modules</label>
          </div>
          <div className="ml-6 space-y-2">
            {modules.map((module, idx) => (
              <div key={idx} className="inline-block bg-background/55 px-3 py-1 rounded-md text-xs text-foreground mr-2 mb-2 border border-border/70 hover:border-accent/40 transition-colors">
                {module}
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Shield size={18} className="text-accent" />
            <label className="text-sm font-semibold text-muted-foreground">Data Flow</label>
          </div>
          <p className="text-xs text-muted-foreground ml-6 leading-relaxed">{dataFlow}</p>
        </div>
      </div>

      <div className="mt-4 p-3 bg-background rounded-lg border border-border">
        <p className="text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">Tip:</span> Keep data flows secure by validating inputs at every layer.
        </p>
      </div>
    </div>
  );
}
