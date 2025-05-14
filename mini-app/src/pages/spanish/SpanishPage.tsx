// src/pages/spanish/SpanishPage.tsx
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, GraduationCap, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

import { ProgressBar } from '../../components/ui/ProgressBar';
import { Button } from '../../components/ui/Button';
import { useProgressStore } from '../../stores/progressStore';
import { useTelegramInit } from '../../hooks/useTelegramInit';

export default function SpanishPage() {
  // инициализируем Telegram (цвет шапки, скрыть mainButton)
  useTelegramInit('#10B981', false);

  const { progress } = useProgressStore();
  const [activeTab, setActiveTab] = useState<'vocabulary' | 'practice' | 'progress'>('vocabulary');

  const percentVocab = useMemo(
    () => (progress.spanish.flashcardsLearned / progress.spanish.flashcardsTotal) * 100,
    [progress.spanish],
  );
  const percentGrammar = useMemo(
    () => (progress.spanish.grammarCompleted / progress.spanish.grammarTotal) * 100,
    [progress.spanish],
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 flex flex-col pb-16"
    >
      <header className="bg-green-500 text-white p-4">
        <div className="flex items-center">
          <Link to="/" className="text-white">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold flex-1 text-center">Spanish Learning</h1>
        </div>
      </header>

      <main className="flex-1 p-4 space-y-6">
        {/* Прогресс слов */}
        <div>
          <div className="flex justify-between mb-2">
            <h2 className="text-sm font-medium text-gray-600">Your Spanish Progress</h2>
            <span className="text-sm font-medium">
              {progress.spanish.flashcardsLearned} / {progress.spanish.flashcardsTotal}
            </span>
          </div>
          <ProgressBar progress={percentVocab} color="bg-green-500" />
        </div>

        {/* Кнопки перехода */}
        <div className="flex gap-2">
          <Link to="/spanish/flashcards" className="flex-1">
            <Button fullWidth>Start Flashcards</Button>
          </Link>
          <Link to="/spanish/grammar" className="flex-1">
            <Button variant="outline" fullWidth>Learn Grammar</Button>
          </Link>
        </div>

        {/* Основное содержание курса */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Course Content</h2>

          {/* Vocabulary section */}
          <Link to="/spanish/flashcards">
            <div className="p-4 bg-white rounded-lg shadow flex justify-between items-center">
              <div className="flex items-center">
                <div className="rounded-full bg-green-100 p-2 mr-3">
                  <BookOpen className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <h3 className="font-medium">Essential Vocabulary</h3>
                  <p className="text-sm text-gray-500">50 common words and phrases</p>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-sm text-gray-500 mr-2">
                  {progress.spanish.flashcardsLearned}/{progress.spanish.flashcardsTotal}
                </span>
                <BookOpen className="w-5 h-5 text-gray-500 rotate-180" />
              </div>
            </div>
          </Link>

          {/* Grammar section */}
          <Link to="/spanish/grammar">
            <div className="p-4 bg-white rounded-lg shadow flex justify-between items-center">
              <div className="flex items-center">
                <div className="rounded-full bg-blue-100 p-2 mr-3">
                  <GraduationCap className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-medium">Spanish Grammar</h3>
                  <p className="text-sm text-gray-500">Verb tenses and conjugation</p>
                </div>
              </div>
              <div className="flex items-center">
                <span className="text-sm text-gray-500 mr-2">
                  {progress.spanish.grammarCompleted}/{progress.spanish.grammarTotal}
                </span>
                <GraduationCap className="w-5 h-5 text-gray-500 rotate-180" />
              </div>
            </div>
          </Link>

          {/* Coming soon */}
          <div className="p-4 bg-white rounded-lg shadow flex justify-between items-center opacity-50">
            <div className="flex items-center">
              <div className="rounded-full bg-purple-100 p-2 mr-3">
                <MessageSquare className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <h3 className="font-medium">Conversation Practice</h3>
                <p className="text-sm text-gray-500">Interactive dialogues</p>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-500 mr-2">Coming soon</span>
              <MessageSquare className="w-5 h-5 text-gray-400 rotate-180" />
            </div>
          </div>
        </div>

        {/* Learning Tips */}
        <div className="space-y-2">
          <h2 className="text-xl font-bold">Learning Tips</h2>
          <div className="p-4 bg-white rounded-lg shadow">
            <h3 className="font-medium text-green-600 mb-2">Today's Tip</h3>
            <p className="text-gray-700">
              Practice speaking Spanish out loud every day, even if just for 5 minutes.
            </p>
          </div>
        </div>
      </main>
    </motion.div>
  );
}
