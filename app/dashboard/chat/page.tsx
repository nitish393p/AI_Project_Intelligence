'use client';

import { AIChat } from '@/components/dashboard/ai-chat';

export default function ChatPage() {
  return (
    <div className="p-4 lg:p-8 h-full">
      <div className="max-w-4xl mx-auto h-full flex flex-col">
        {/* Page header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">Project Intelligence Chat</h1>
          <p className="text-muted-foreground">
            Ask your AI assistant about code structure, recent changes, security issues, and more
          </p>
        </div>

        {/* Chat component */}
        <div className="flex-1 min-h-0">
          <AIChat />
        </div>
      </div>
    </div>
  );
}
