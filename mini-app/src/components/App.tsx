import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { init } from '@/init';
import { Layout } from './Layout';
import { BottomBar } from './BottomBar';
import HomePage from '@/pages/HomePage';
import { EnglishPage } from '@/pages/english/EnglishPage';
import SpanishPage from '@/pages/spanish/SpanishPage';
import FlashcardsPage from '@/pages/spanish/FlashcardsPage';
import GrammarPage from '@/pages/spanish/GrammarPage';

export default function App() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    init({ debug: false, eruda: false, mockForMacOS: false })
      .then(() => setReady(true))
      .catch((err) => {
        console.error('Init SDK error:', err);
        // можно переключить на экран ошибки или EnvUnsupported
      });
  }, []);

  // Пока SDK не инициализировался, рендерим пустую заглушку (или Splash)
  if (!ready) {
    return null;
  }

  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/english" element={<EnglishPage />} />
          <Route path="/spanish" element={<SpanishPage />} />
          <Route path="/spanish/flashcards" element={<FlashcardsPage />} />
          <Route path="/spanish/grammar" element={<GrammarPage />} />
        </Route>
      </Routes>
      <BottomBar />
    </Router>
  );
}
