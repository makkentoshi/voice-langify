// src/components/Layout.tsx
import React, { useEffect, useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { mainButton } from '@telegram-apps/sdk-react';

export const Layout: React.FC = () => {
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      try {
        mainButton.setParams({ isVisible: false });
      } catch (e) {
        console.warn('mainButton.setParams failed on unmounted component:', e);
      }
    };
  }, []);

  return (
    <div className="min-h-screen pb-16">
      <Outlet />
    </div>
  );
};
