import React from 'react';
import FocusTimer from '@/components/FocusTimer';
import QuickNotes from '@/components/QuickNotes';

const Dashboard = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h2>🎯 AnchorStack Dashboard</h2>
      <FocusTimer />
      <QuickNotes />
    </div>
  );
};

export default Dashboard;

