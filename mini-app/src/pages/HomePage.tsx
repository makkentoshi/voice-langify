// src/pages/HomePage.tsx
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { LanguageSelector } from '@/components/language/LanguageSelector';
import { useTelegramInit } from '@/hooks/useTelegramInit';

export default function HomePage() {

  useTelegramInit(/* headerColor */ undefined, /* showMainButton */ false);

  // Задаём title страницы
  useEffect(() => {
    document.title = 'Language Learning';
  }, []);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 pt-4 pb-16"
    >
      <header className="bg-blue-500 text-white p-4 text-center">
        <h1 className="text-2xl font-bold">Language Learning</h1>
      </header>
      <main className="p-4">
        <LanguageSelector />
      </main>
    </motion.div>
  );
}
