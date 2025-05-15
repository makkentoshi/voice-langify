// src/components/App.tsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Layout } from "./Layout";
import BottomBar from "./BottomBar";
import HomePage from "@/pages/HomePage";
import EnglishPage from "@/pages/english/EnglishPage";
import SpanishPage from "@/pages/spanish/SpanishPage";
import TopicsPage from "@/pages/spanish/TopicsPage";
import ConversationPage from "@/pages/spanish/ConversationPage";
import GrammarPage from "@/pages/spanish/GrammarPage";
import GamePage from "@/pages/spanish/GamePage";
import ProfilePage from "@/pages/ProfilePage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="english" element={<EnglishPage />} />
          <Route path="spanish" element={<SpanishPage />} />
          <Route path="spanish/topics" element={<TopicsPage />} />
          <Route path="spanish/conversation" element={<ConversationPage />} />
          <Route path="spanish/grammar" element={<GrammarPage />} />
          <Route path="spanish/game" element={<GamePage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Routes>
      <BottomBar />
    </Router>
  );
}
