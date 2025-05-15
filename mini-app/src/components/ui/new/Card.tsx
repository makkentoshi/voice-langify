import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  shadow?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  shadow = 'md',
  interactive = false,
}) => {
  const shadowClasses = {
    sm: 'shadow-ios',
    md: 'shadow-ios-md',
    lg: 'shadow-ios-lg',
  };
  
  return (
    <motion.div
      className={`bg-white rounded-ios ${shadowClasses[shadow]} ${className}`}
      whileTap={interactive ? { scale: 0.98 } : undefined}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

export default Card;