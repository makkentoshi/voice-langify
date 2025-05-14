// src/components/Layout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';

export const Layout: React.FC = () => (
  <div className="min-h-screen pb-16"> {/* pb-16 — отступ под BottomBar */}
    <Outlet />
  </div>
);
