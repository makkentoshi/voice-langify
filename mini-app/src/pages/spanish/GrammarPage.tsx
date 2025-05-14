// src/pages/spanish/GrammarPage.tsx
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

import { GrammarCard } from '../../components/spanish/GrammarCard';
import { spanishGrammarData } from '../../data/spanishData';
import { useProgressStore } from '../../stores/progressStore';
import { useTelegramInit } from '../../hooks/useTelegramInit';

export default function GrammarPage() {
  // Инициализация Telegram и скрытие кнопок
  useTelegramInit('#10B981', false);

  const { updateSpanishGrammar } = useProgressStore();

  // Синхронизируем прогресс при монтировании
  useEffect(() => {
    updateSpanishGrammar(0, spanishGrammarData.length);
    document.title = 'Spanish Grammar';
  }, [updateSpanishGrammar]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 flex flex-col pb-16"
    >
      <header className="bg-green-500 text-white p-4">
        <div className="flex items-center">
          <Link to="/spanish" className="text-white">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold flex-1 text-center">Spanish Grammar</h1>
        </div>
      </header>

      <main className="flex-1 p-4 space-y-4">
        <h2 className="text-xl font-bold">Spanish Verb Tenses</h2>
        <p className="text-gray-600 mb-4">
          Tap on each grammar item to expand and learn more about it.
        </p>
        {spanishGrammarData.map((item) => (
          <GrammarCard key={item.id} item={item} />
        ))}
      </main>
    </motion.div>
  );
}
