// src/components/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import BottomBar from "@/components/BottomBar";
import HomePage from "@/pages/HomePage";
import EnglishPage from "@/pages/english/EnglishPage";
import SpanishPage from "@/pages/spanish/SpanishPage";
import FlashcardsPage from "@/pages/spanish/FlashcardsPage";
import GrammarPage from "@/pages/spanish/GrammarPage";

export default function App() {
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
