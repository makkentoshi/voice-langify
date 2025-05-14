// src/pages/spanish/FlashcardsPage.tsx
import React, { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

import { ProgressBar } from "../../components/ui/ProgressBar";
import { Flashcard } from "../../components/spanish/Flashcard";
import { useFlashcardStore } from "../../stores/flashcardStore";
import { useProgressStore } from "../../stores/progressStore";
import { useTelegramInit } from "../../hooks/useTelegramInit";

export default function FlashcardsPage() {
  useTelegramInit("#10B981", false);

  const {
    flashcards,
    currentIndex,
    markAsLearned,
    markAsNotLearned,
    nextCard,
  } = useFlashcardStore();
  const { updateSpanishFlashcards } = useProgressStore();

  const learnedCount = useMemo(
    () => flashcards.filter((c) => c.learned).length,
    [flashcards]
  );
  const totalCount = flashcards.length;

  // Синхронизируем прогресс
  useEffect(() => {
    updateSpanishFlashcards(learnedCount, totalCount);
    document.title = "Spanish Flashcards";
  }, [learnedCount, totalCount, updateSpanishFlashcards]);

  const currentFlashcard = flashcards[currentIndex];

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
          <h1 className="text-xl font-bold flex-1 text-center">
            Spanish Flashcards
          </h1>
        </div>
      </header>

      <main className="flex-1 p-4 space-y-6">
        {/* Прогресс */}
        <div>
          <div className="flex justify-between mb-2">
            <h2 className="text-sm font-medium text-gray-600">
              Flashcards Learned
            </h2>
            <span className="text-sm font-medium">
              {learnedCount} / {totalCount}
            </span>
          </div>
          <ProgressBar
            progress={(learnedCount / totalCount) * 100}
            color="bg-green-500"
          />
        </div>

        {/* Текущая карточка */}
        <div className="flex-1 flex flex-col justify-center items-center">
          <Flashcard
            card={currentFlashcard}
            onLearn={() => {
              markAsLearned(currentFlashcard.id);
              nextCard();
            }}
            onDontKnow={() => {
              markAsNotLearned(currentFlashcard.id);
              nextCard();
            }}
          />
        </div>

        {/* Указатель номера */}
        <div className="text-center">
          <p className="text-sm text-gray-500">
            Card {currentIndex + 1} of {totalCount}
          </p>
        </div>
      </main>
    </motion.div>
  );
}
