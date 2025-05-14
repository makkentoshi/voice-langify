// src/components/App.tsx
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { init } from "@/init";
import { Layout } from "./Layout";
import { BottomBar } from "./BottomBar";
import HomePage from "@/pages/HomePage";
import { EnglishPage } from "@/pages/english/EnglishPage";
import SpanishPage from "@/pages/spanish/SpanishPage";
import FlashcardsPage from "@/pages/spanish/FlashcardsPage";
import GrammarPage from "@/pages/spanish/GrammarPage";

export default function App() {
  useEffect(() => {
    init({ debug: false, eruda: false, mockForMacOS: false });
  }, []);

  return (
    <Router>
      `1`
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
