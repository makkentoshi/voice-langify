import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, GraduationCap, Flag, User } from 'lucide-react';

interface NavItem {
  to: string;
  label: string;
  icon: React.ReactNode;
}

const BottomBar: React.FC = () => {
  const location = useLocation();
  
  const navItems: NavItem[] = [
    {
      to: '/',
      label: 'Home',
      icon: <Home size={24} />,
    },
    {
      to: '/english',
      label: 'English',
      icon: <span className="text-4xl mr-3">🇬🇧</span> ,
    },
    {
      to: '/spanish',
      label: 'Spanish',
      icon: <span className="text-4xl mr-3">🇪🇸</span> 
    },
    {
      to: '/profile',
      label: 'Profile',
      icon: <User size={24} />,
    },
  ];

  return (
    <nav className="bottom-tab-bar">
      {navItems.map((item) => {
        const isActive = location.pathname === item.to || 
                         (item.to !== '/' && location.pathname.startsWith(item.to));
        
        return (
          <NavLink 
            key={item.to} 
            to={item.to} 
            className={`tab-item ${isActive ? 'tab-item-active' : 'tab-item-inactive'}`}
          >
            <div className="relative">
              {isActive && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute inset-0 bg-primary-100 rounded-full -z-10"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              {item.icon}
            </div>
            <span className="mt-1">{item.label}</span>
          </NavLink>
        );
      })}
    </nav>
  );
};

export default BottomBar;