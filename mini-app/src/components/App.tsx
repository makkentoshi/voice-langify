// src/components/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "@/components/Layout";
import BottomBar from "@/components/BottomBar";
import HomePage from "@/pages/HomePage";
import EnglishPage from "@/pages/english/EnglishPage";
import Part1Page from "@/pages/english/Part1Page";
import Part2Page from "@/pages/english/Part2Page";
import Part3Page from "@/pages/english/Part3Page";
import SpanishPage from "@/pages/spanish/SpanishPage";
import TopicsPage from "@/pages/spanish/TopicsPage";
import ConversationPage from "@/pages/spanish/ConversationPage";
import GrammarPage from "@/pages/spanish/GrammarPage";
import GamePage from "@/pages/spanish/GamePage";
import FlashcardsPage from "@/pages/spanish/FlashcardsPage";
import ProfilePage from "@/pages/ProfilePage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="english" element={<EnglishPage />} />
          <Route path="english/part1" element={<Part1Page />} />
          <Route path="english/part2" element={<Part2Page />} />
          <Route path="english/part3" element={<Part3Page />} />
          <Route path="spanish" element={<SpanishPage />} />
          <Route path="spanish/topics" element={<TopicsPage />} />
          <Route path="spanish/conversation" element={<ConversationPage />} />
          <Route path="spanish/grammar" element={<GrammarPage />} />
          <Route path="spanish/game" element={<GamePage />} />
          <Route path="spanish/flashcards" element={<FlashcardsPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="/spanish/topics/:topicId" element={<TopicPhrasesPage />} />
        </Route>
      </Routes>
      <BottomBar />
    </Router>
  );
}
