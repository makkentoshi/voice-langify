import React from 'react';
import { motion } from 'framer-motion';
import { Globe, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/Card';

export const LanguageSelector: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-8">Choose Your Language</h1>
      
      <div className="grid grid-cols-1 gap-6 mx-auto max-w-sm">
        <Link to="/english">
          <Card interactive elevation="medium" className="flex items-center p-6 border-l-4 border-blue-500">
            <div className="rounded-full bg-blue-100 p-3 mr-4">
              <Globe className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">English</h2>
              <p className="text-sm text-gray-600">IELTS Preparation</p>
            </div>
            <motion.div 
              className="ml-auto" 
              initial={{ x: -5, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18L15 12L9 6" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
          </Card>
        </Link>
        
        <Link to="/spanish">
          <Card interactive elevation="medium" className="flex items-center p-6 border-l-4 border-green-500">
            <div className="rounded-full bg-green-100 p-3 mr-4">
              <BookOpen className="w-6 h-6 text-green-500" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Spanish</h2>
              <p className="text-sm text-gray-600">Essential Learning</p>
            </div>
            <motion.div 
              className="ml-auto" 
              initial={{ x: -5, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 18L15 12L9 6" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
          </Card>
        </Link>
      </div>
    </div>
  );
};