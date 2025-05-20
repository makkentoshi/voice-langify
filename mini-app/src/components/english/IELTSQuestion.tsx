import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mic, StopCircle } from 'lucide-react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import type { IeltsQuestion } from '../../types';

interface IELTSQuestionProps {
  question: IeltsQuestion;
  onComplete: () => void;
}

export const IELTSQuestion: React.FC<IELTSQuestionProps> = ({ 
  question, 
  onComplete 
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [intervalId, setIntervalId] = useState<number | null>(null);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const startRecording = () => {
    setIsRecording(true);
    const id = window.setInterval(() => {
      setElapsedTime(prev => prev + 1);
    }, 1000);
    setIntervalId(id);
    
    // Here you would typically start actual recording using browser APIs
    // For demo purposes, we're just tracking time
  };
  
  const stopRecording = () => {
    setIsRecording(false);
    if (intervalId !== null) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    
    // Here you would stop actual recording
    // For demo purposes, we'll just consider the question completed
    setTimeout(() => {
      onComplete();
      setElapsedTime(0);
    }, 1000);
  };
  
  const getCategoryLabel = (category: string) => {
    switch(category) {
      case 'part1': return 'Part 1 - Interview';
      case 'part2': return 'Part 2 - Long Turn';
      case 'part3': return 'Part 3 - Discussion';
      default: return 'Question';
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="mb-6"
    >
      <Card className="p-6">
        <div className="mb-4">
          <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full mb-2">
            {getCategoryLabel(question.category)}
          </span>
          <h3 className="text-lg font-semibold mb-4">{question.text}</h3>
          
          {isRecording && (
            <motion.div
              className="flex items-center justify-center mb-4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <div className="text-center">
                <div className="text-xl font-mono">{formatTime(elapsedTime)}</div>
                <div className="flex items-center justify-center mt-2">
                  <motion.div 
                    className="w-3 h-3 rounded-full bg-red-500 mr-2"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  />
                  <span className="text-sm text-gray-600">Recording...</span>
                </div>
              </div>
            </motion.div>
          )}
          
          <div className="flex justify-center">
            {!isRecording ? (
              <Button
                onClick={startRecording}
                icon={<Mic className="w-5 h-5" />}
                variant="primary"
              >
                Start Speaking
              </Button>
            ) : (
              <Button
                onClick={stopRecording}
                icon={<StopCircle className="w-5 h-5" />}
                variant="outline"
              >
                Stop Recording
              </Button>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
};