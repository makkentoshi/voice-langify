// src/pages/HomePage.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { mainButton, backButton } from '@telegram-apps/sdk-react';
import { LanguageSelector } from '@/components/language/LanguageSelector';

export default function HomePage() {
  React.useEffect(() => {
    window?.Telegram?.WebApp.ready();
    backButton.hide();
    mainButton.setParams({ text: 'Send', isVisible: false });
    document.title = 'Language Learning';
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 pt-4"
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
