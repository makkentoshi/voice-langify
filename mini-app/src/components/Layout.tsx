// src/components/Layout.tsx
import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { mainButton } from "@telegram-apps/sdk-react";

export const Layout: React.FC = () => {
  useEffect(() => {
    return () => {
      // Скрыть mainButton при переходе на другие страницы
      mainButton.setParams({ isVisible: false });
    };
  }, []);

  return (
    <div className="min-h-screen pb-16">
      <Outlet />
    </div>
  );
};
