import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Check, X, Trophy } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/new/Card";
import { Button } from "@/components/ui/new/Button";
import { useTelegramInit } from "@/hooks/useTelegramInit";
import { cn } from "@/lib/utils";

const questions = [
  {
    id: 1,
    question: "¿Cómo estás?",
    options: [
      { id: "a", text: "I am fine", correct: true },
      { id: "b", text: "Good morning", correct: false },
      { id: "c", text: "Thank you", correct: false },
      { id: "d", text: "Goodbye", correct: false },
    ],
  },
  {
    id: 2,
    question: "¿Dónde vives?",
    options: [
      { id: "a", text: "What is your name?", correct: false },
      { id: "b", text: "Where do you live?", correct: true },
      { id: "c", text: "How old are you?", correct: false },
      { id: "d", text: "What time is it?", correct: false },
    ],
  },
  {
    id: 3,
    question: "¿Qué hora es?",
    options: [
      { id: "a", text: "What is your name?", correct: false },
      { id: "b", text: "Where do you live?", correct: false },
      { id: "c", text: "What time is it?", correct: true },
      { id: "d", text: "How are you?", correct: false },
    ],
  },
];

export default function GamePage() {
  useTelegramInit("#FFFFFFFF", false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (optionId: string) => {
    setSelectedAnswer(optionId);
    const isCorrect = questions[currentQuestion].options.find(
      (opt) => opt.id === optionId
    )?.correct;

    if (isCorrect) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#F2F2F7]"
    >
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/spanish" className="text-blue-500">
              <ArrowLeft size={24} />
            </Link>
            <h1 className="text-xl font-semibold">Spanish Quiz</h1>
            <div className="w-6" />
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6">
        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key="question"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  Question {currentQuestion + 1} of {questions.length}
                </span>
                <span className="text-sm font-medium text-blue-500">
                  Score: {score}
                </span>
              </div>

              <Card className="bg-white rounded-xl p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                  {questions[currentQuestion].question}
                </h2>

                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option) => (
                    <motion.button
                      key={option.id}
                      onClick={() => handleAnswer(option.id)}
                      disabled={selectedAnswer !== null}
                      className={cn(
                        "w-full p-4 rounded-xl text-left transition-all duration-200",
                        selectedAnswer === null
                          ? "bg-gray-50 hover:bg-gray-100"
                          : selectedAnswer === option.id
                          ? option.correct
                            ? "bg-green-50 border-2 border-green-500"
                            : "bg-red-50 border-2 border-red-500"
                          : option.correct && selectedAnswer !== null
                          ? "bg-green-50 border-2 border-green-500"
                          : "bg-gray-50"
                      )}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-gray-900">{option.text}</span>
                        {selectedAnswer === option.id && (
                          <span>
                            {option.correct ? (
                              <Check className="w-5 h-5 text-green-500" />
                            ) : (
                              <X className="w-5 h-5 text-red-500" />
                            )}
                          </span>
                        )}
                      </div>
                    </motion.button>
                  ))}
                </div>
              </Card>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <Card className="bg-white rounded-xl p-8">
                <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Trophy className="w-10 h-10 text-blue-500" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  Quiz Completed!
                </h2>
                <p className="text-gray-600 mb-6">
                  Your score: {score} out of {questions.length}
                </p>
                <Button
                  onClick={resetQuiz}
                  className="bg-blue-500 text-white hover:bg-blue-600"
                >
                  Try Again
                </Button>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </motion.div>
  );
}
