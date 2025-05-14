import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  interactive?: boolean;
  elevation?: 'low' | 'medium' | 'high';
}

export const Card: React.FC<CardProps> = ({
  children,
  onClick,
  className = '',
  interactive = false,
  elevation = 'medium',
}) => {
  const elevationStyles = {
    low: 'shadow-sm',
    medium: 'shadow-md',
    high: 'shadow-lg',
  };
  
  const interactiveProps = interactive
    ? {
        whileHover: { scale: 1.02, y: -4 },
        whileTap: { scale: 0.98 },
      }
    : {};
  
  return (
    <motion.div
      className={`bg-white rounded-xl p-4 ${elevationStyles[elevation]} ${className}`}
      onClick={onClick}
      {...interactiveProps}
    >
      {children}
    </motion.div>
  );
};