// src/pages/english/EnglishPage.tsx
import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

import { ProgressBar } from '../../components/ui/ProgressBar';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { IELTSQuestion } from '../../components/english/IELTSQuestion';
import { ieltsQuestions } from '../../data/ieltsData';
import { useProgressStore } from '../../stores/progressStore';
import { useTelegramRecognition } from '../../hooks/useTelegram'; // ← наш хук

export const EnglishPage: React.FC = () => {
  // Наш хук инициализирует Telegram.WebApp, backButton, mainButton и SpeechRecognition
  const {
    transcript,
    isRecognizing,
    language,
    toggleRecognition,
    switchLanguage,
  } = useTelegramRecognition();

  // Стор для прогресса
  const { progress, updateEnglishProgress } = useProgressStore();

  // Индексы по секциям
  const part1Questions = useMemo(() => ieltsQuestions.filter(q => q.category === 'part1'), []);
  const part2Questions = useMemo(() => ieltsQuestions.filter(q => q.category === 'part2'), []);
  const part3Questions = useMemo(() => ieltsQuestions.filter(q => q.category === 'part3'), []);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showGptChat, setShowGptChat] = useState(false);

  // Вычисляем процент прогресса
  const percentComplete = useMemo(() => (
    (progress.english.ieltsQuestionsCompleted / progress.english.ieltsQuestionsTotal) * 100
  ), [progress.english]);

  // Когда вопрос завершён
  const handleCompleteQuestion = () => {
    if (currentQuestionIndex < ieltsQuestions.length - 1) {
      setCurrentQuestionIndex(i => i + 1);
    }
    const newCompleted = Math.min(
      progress.english.ieltsQuestionsCompleted + 1,
      progress.english.ieltsQuestionsTotal,
    );
    updateEnglishProgress(newCompleted, progress.english.ieltsQuestionsTotal);
  };

  // Устанавливаем заголовок страницы
  useEffect(() => {
    document.title = 'IELTS Preparation';
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gray-50 pt-4 pb-16" // pb-16 — место под BottomBar
    >
      <header className="bg-blue-500 text-white p-4">
        <div className="flex items-center">
          <Link to="/" className="text-white">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-xl font-bold text-center flex-1">IELTS Preparation</h1>
        </div>
      </header>

      <main className="p-4 space-y-6">
        {/* Прогресс */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-sm font-medium text-gray-600">Your Progress</h2>
            <span className="text-sm font-medium">
              {progress.english.ieltsQuestionsCompleted} / {progress.english.ieltsQuestionsTotal}
            </span>
          </div>
          <ProgressBar progress={percentComplete} color="bg-blue-500" />
        </div>

        {!showGptChat ? (
          <>
            {/* Вопрос */}
            <IELTSQuestion
              question={ieltsQuestions[currentQuestionIndex]}
              onComplete={handleCompleteQuestion}
            />

            {/* Кнопка для чата с AI */}
            <Button
              onClick={() => setShowGptChat(true)}
              fullWidth
              variant="secondary"
            >
              Chat with AI Assistant
            </Button>

            {/* Секции IELTS */}
            <div className="space-y-4">
              {[part1Questions, part2Questions, part3Questions].map((section, idx) => {
                const titles = ['Part 1 – Interview', 'Part 2 – Long Turn', 'Part 3 – Discussion'];
                const baseCount = idx === 0
                  ? 0
                  : idx === 1
                    ? part1Questions.length
                    : part1Questions.length + part2Questions.length;
                return (
                  <Card key={titles[idx]} className="p-4">
                    <h4 className="font-semibold">{titles[idx]}</h4>
                    <p className="text-sm text-gray-600 mb-2">
                      {idx === 0
                        ? 'Questions about yourself and familiar topics'
                        : idx === 1
                          ? 'Speak for 1–2 minutes on a topic'
                          : 'In-depth discussion related to Part 2'}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {section.map((q, qIdx) => {
                        const completed = qIdx + baseCount <= currentQuestionIndex;
                        return (
                          <span
                            key={q.id}
                            className={`w-6 h-6 rounded-full text-xs flex items-center justify-center
                              ${completed ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'}`}
                          >
                            {qIdx + 1}
                          </span>
                        );
                      })}
                    </div>
                  </Card>
                );
              })}
            </div>
          </>
        ) : (
          /* Чат-интерфейс с AI */
          <div className="h-[80vh] flex flex-col space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">AI Assistant</h2>
              <Button variant="outline" size="sm" onClick={() => setShowGptChat(false)}>
                Back to Practice
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4">
              {/* Здесь вы можете внедрить настоящий чат-компонент */}
              <Card className="p-3">Hi there! How can I help with Part 2?</Card>
              <Card className="p-3 ml-auto bg-blue-100">Try asking tips for Part 2.</Card>
            </div>

            {/* Запись и ввод текста для AI */}
            <div className="flex gap-2">
              <Button
                onClick={toggleRecognition}
                icon={isRecognizing ? <ArrowLeft /> : <ArrowLeft />} // замените на микрофон
                variant="outline"
              >
                {isRecognizing ? 'Stop' : 'Record'}
              </Button>
              <input
                type="text"
                placeholder="Type your message…"
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:ring-2 focus:ring-blue-500"
              />
              <Button>Send</Button>
            </div>
          </div>
        )}
      </main>
    </motion.div>
  );
};
