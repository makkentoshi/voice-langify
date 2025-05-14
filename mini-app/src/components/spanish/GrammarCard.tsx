import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Card } from '../ui/Card';
import type { GrammarItem } from '../../types';

interface GrammarCardProps {
  item: GrammarItem;
}

export const GrammarCard: React.FC<GrammarCardProps> = ({ item }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  return (
    <Card className="mb-4 overflow-hidden">
      <div 
        className="flex items-center justify-between p-4 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="text-lg font-semibold">{item.title}</h3>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-500" />
          )}
        </motion.div>
      </div>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-4 py-3 border-t border-gray-100">
              <p className="text-gray-700 mb-4">{item.explanation}</p>
              
              <h4 className="font-medium text-sm text-gray-500 mb-2">Examples:</h4>
              <div className="space-y-3">
                {item.examples.map((example, idx) => (
                  <div key={idx} className="bg-gray-50 p-3 rounded-lg">
                    <p className="font-medium text-blue-600">{example.spanish}</p>
                    <p className="text-gray-600 text-sm">{example.english}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
};