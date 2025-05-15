import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  interactive?: boolean;
  gradient?: boolean;
  elevation?: 'low' | 'medium' | 'high';
}

export const Card: React.FC<CardProps> = ({
  children,
  onClick,
  className = '',
  interactive = false,
  gradient = false,
  elevation = 'medium',
}) => {
  const elevationStyles = {
    low: 'shadow-sm',
    medium: 'shadow-md',
    high: 'shadow-lg',
  };
  
  const gradientStyle = gradient
    ? 'bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-sm'
    : 'bg-white';
  
  const interactiveProps = interactive
    ? {
        whileHover: { scale: 1.02, y: -4 },
        whileTap: { scale: 0.98 },
      }
    : {};
  
  return (
    <motion.div
      className={`rounded-2xl ${gradientStyle} ${elevationStyles[elevation]} backdrop-blur-sm border border-white/20 ${className}`}
      onClick={onClick}
      {...interactiveProps}
    >
      {children}
    </motion.div>
  );
};