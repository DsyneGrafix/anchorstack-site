import React from 'react';
import { FocusTimer } from '@/components/FocusTimer';
import { QuickNotes } from '@/components/QuickNotes';

export const Dashboard: React.FC = () => (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-anchor-900">Welcome back</h2>
    <FocusTimer />
    <QuickNotes />
  </div>
);

