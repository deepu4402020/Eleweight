'use client';

import { ReactNode } from 'react';

export default function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-3 border border-border px-4 py-1.5 mb-6">
      <span className="text-[9px] font-black uppercase tracking-[0.3em] text-muted">
        {children}
      </span>
    </div>
  );
}
