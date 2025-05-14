// src/components/BottomBar.tsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaHome, FaGlobe, FaLanguage } from 'react-icons/fa'; // пример

const items = [
  { to: '/', icon: <FaHome size={24} />, label: 'Home' },
  { to: '/english', icon: <FaGlobe size={24} />, label: 'English' },
  { to: '/spanish', icon: <FaLanguage size={24} />, label: 'Spanish' },
];

export const BottomBar: React.FC = () => {
  const nav = useNavigate();
  const { pathname } = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t flex justify-around p-2">
      {items.map((it) => (
        <button
          key={it.to}
          onClick={() => nav(it.to)}
          className={`flex flex-col items-center ${pathname === it.to ? 'text-blue-500' : 'text-gray-500'}`}
        >
          {it.icon}
          <span className="text-xs">{it.label}</span>
        </button>
      ))}
    </nav>
  );
};
