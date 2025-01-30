'use client';

import { GlassWater } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <GlassWater className="w-6 h-6 text-amber-100" />
      <span className="font-serif text-xl text-amber-100">Cheers 23</span>
    </div>
  );
}
