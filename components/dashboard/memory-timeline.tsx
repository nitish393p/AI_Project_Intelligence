'use client';

import { TimelineItem } from '@/lib/types';
import { Clock, Shield, Zap, GitBranch, ChevronDown, Copy, Check } from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface MemoryTimelineProps {
  items: TimelineItem[];
}

export function MemoryTimeline({ items }: MemoryTimelineProps) {
  const [expandedId, setExpandedId] = useState<string | null>(items[0]?.id || null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'security':
        return <Shield size={18} />;
      case 'feature':
        return <Zap size={18} />;
      case 'refactor':
        return <GitBranch size={18} />;
      default:
        return <Clock size={18} />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'security':
        return {
          dot: 'bg-red-500 text-red-500',
          badge: 'bg-red-500/10 text-red-500 border-red-500/20',
          label: 'Security',
        };
      case 'feature':
        return {
          dot: 'bg-green-500 text-green-500',
          badge: 'bg-green-500/10 text-green-500 border-green-500/20',
          label: 'Feature',
        };
      case 'refactor':
        return {
          dot: 'bg-blue-500 text-blue-500',
          badge: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
          label: 'Refactor',
        };
      default:
        return {
          dot: 'bg-accent text-accent',
          badge: 'bg-accent/10 text-accent border-accent/20',
          label: 'Update',
        };
    }
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredItems = filter === 'all' ? items : items.filter((item) => item.category === filter);

  const categories = ['all', ...new Set(items.map((item) => item.category))];
  const categoryCounts = {
    all: items.length,
    security: items.filter((item) => item.category === 'security').length,
    feature: items.filter((item) => item.category === 'feature').length,
    refactor: items.filter((item) => item.category === 'refactor').length,
  };

  return (
    <div className="glass-panel rounded-xl">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Project Memory Timeline</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Complete history of changes, updates, and milestones to help you resume work seamlessly
        </p>

        {/* Filter buttons */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const displayLabel =
              category === 'all'
                ? 'All Events'
                : category.charAt(0).toUpperCase() + category.slice(1);
            const count = categoryCounts[category as keyof typeof categoryCounts] || 0;
            return (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={cn(
                  'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                  filter === category
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-background text-muted-foreground hover:text-foreground border border-border'
                )}
              >
                {displayLabel}
                <span className="ml-2 text-xs opacity-70">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Timeline items */}
      <div className="divide-y divide-border">
        {filteredItems.length > 0 ? (
          filteredItems.map((item, index) => {
            const colors = getCategoryColor(item.category);
            const isExpanded = expandedId === item.id;

            return (
              <div key={item.id} className="p-6 hover:bg-background/30 transition-colors duration-300">
                {/* Item header */}
                <div
                  className="flex gap-4 cursor-pointer"
                  onClick={() => setExpandedId(isExpanded ? null : item.id)}
                >
                  {/* Timeline dot */}
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className={cn(
                        'w-10 h-10 rounded-full border-2 border-current flex items-center justify-center flex-shrink-0',
                        colors.dot
                      )}
                    >
                      {getCategoryIcon(item.category)}
                    </div>
                    {index !== filteredItems.length - 1 && (
                      <div className={cn('w-0.5 h-12 flex-shrink-0', colors.dot.replace('text', 'bg').replace('bg-', 'bg-').split(' ')[0])} />
                    )}
                  </div>

                  {/* Item content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold text-foreground text-balance">{item.title}</h4>
                          <span
                            className={cn('px-2 py-1 rounded text-xs font-medium whitespace-nowrap border', colors.badge)}
                          >
                            {colors.label}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground/70">
                          <span>
                            {format(item.timestamp, 'MMM dd, yyyy')} at {format(item.timestamp, 'HH:mm')}
                          </span>
                          <span>({formatDistanceToNow(item.timestamp, { addSuffix: true })})</span>
                        </div>
                      </div>

                      {/* Expand icon */}
                      <ChevronDown
                        size={20}
                        className={cn(
                          'flex-shrink-0 transition-transform',
                          isExpanded && 'rotate-180',
                          'text-muted-foreground'
                        )}
                      />
                    </div>
                  </div>
                </div>

                {/* Expanded content */}
                {isExpanded && (
                  <div className="mt-4 ml-14 pt-4 border-t border-border/50">
                    <div className="space-y-3">
                      <div>
                        <p className="text-xs font-semibold text-muted-foreground mb-2">FULL DETAILS</p>
                        <p className="text-sm text-foreground leading-relaxed">{item.description}</p>
                      </div>

                      <div>
                        <p className="text-xs font-semibold text-muted-foreground mb-2">TIMESTAMP</p>
                        <p className="text-sm text-foreground font-mono">
                          {format(item.timestamp, 'yyyy-MM-dd HH:mm:ss')}
                        </p>
                      </div>

                      {/* Action buttons */}
                      <div className="flex gap-2 pt-2">
                        <button
                          onClick={() => handleCopy(item.description, item.id)}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg bg-background border border-border text-sm font-medium text-foreground hover:bg-border transition-colors"
                        >
                          {copiedId === item.id ? (
                            <>
                              <Check size={16} className="text-green-500" />
                              Copied
                            </>
                          ) : (
                            <>
                              <Copy size={16} />
                              Copy Details
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="p-12 text-center">
            <Clock size={32} className="mx-auto mb-3 text-muted-foreground opacity-40" />
            <p className="text-sm text-muted-foreground">No items match this filter</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-border bg-background/50">
        <p className="text-xs text-muted-foreground">
          Showing {filteredItems.length} of {items.length} events - Last updated{' '}
          {formatDistanceToNow(items[0]?.timestamp || new Date(), { addSuffix: true })}
        </p>
      </div>
    </div>
  );
}
