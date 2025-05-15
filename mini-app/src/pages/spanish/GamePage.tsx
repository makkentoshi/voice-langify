import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Trophy, Timer, Target, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/new/Card";
import { Button } from "@/components/ui/new/Button";
import { useTelegramInit } from "@/hooks/useTelegramInit";
import { cn } from "@/lib/utils";

const gameModes = [
  {
    id: 1,
    title: "Word Match",
    description: "Match Spanish words with their English translations",
    icon: "🎯",
    color: "from-blue-500 to-blue-600",
    questions: [
      {
        spanish: "Hola",
        options: ["Hello", "Goodbye", "Thank you", "Please"],
        correct: "Hello",
      },
      {
        spanish: "Gracias",
        options: ["Hello", "Goodbye", "Thank you", "Please"],
        correct: "Thank you",
      },
      {
        spanish: "Adiós",
        options: ["Hello", "Goodbye", "Thank you", "Please"],
        correct: "Goodbye",
      },
    ],
  },
  {
    id: 2,
    title: "Time Challenge",
    description: "Answer as many questions as possible in 60 seconds",
    icon: "⏱️",
    color: "from-purple-500 to-purple-600",
    questions: [
      {
        spanish: "¿Cómo estás?",
        options: [
          "How are you?",
          "What's your name?",
          "Where are you from?",
          "How old are you?",
        ],
        correct: "How are you?",
      },
      {
        spanish: "¿Dónde vives?",
        options: [
          "How are you?",
          "What's your name?",
          "Where do you live?",
          "How old are you?",
        ],
        correct: "Where do you live?",
      },
    ],
  },
  {
    id: 3,
    title: "Grammar Quiz",
    description: "Test your knowledge of Spanish grammar",
    icon: "📝",
    color: "from-green-500 to-green-600",
    questions: [
      {
        spanish: "Yo ___ español.",
        options: ["hablo", "hablas", "habla", "hablamos"],
        correct: "hablo",
      },
      {
        spanish: "Ella ___ en Madrid.",
        options: ["vivo", "vives", "vive", "vivimos"],
        correct: "vive",
      },
    ],
  },
];

export default function GamePage() {
  useTelegramInit("#FFFFFFFF", false);
  const [selectedMode, setSelectedMode] = useState<number | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleAnswer = (answer: string) => {
    const mode = gameModes.find((m) => m.id === selectedMode);
    if (!mode) return;

    const isCorrect = answer === mode.questions[currentQuestion].correct;
    if (isCorrect) {
      setScore(score + 1);
    }

    if (currentQuestion < mode.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
      setIsPlaying(false);
    }
  };

  const startGame = (modeId: number) => {
    setSelectedMode(modeId);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setTimeLeft(60);
    setIsPlaying(true);
  };

  const resetGame = () => {
    setSelectedMode(null);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setTimeLeft(60);
    setIsPlaying(false);
  };

  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setShowResult(true);
      setIsPlaying(false);
    }
    return () => clearInterval(timer);
  }, [isPlaying, timeLeft]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#F2F2F7]"
    >
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/spanish" className="text-blue-500">
              <ArrowLeft size={24} />
            </Link>
            <h1 className="text-xl font-semibold">Spanish Games</h1>
            <div className="w-6" />
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-6">
        <AnimatePresence mode="wait">
          {!selectedMode ? (
            <motion.div
              key="modes"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              {gameModes.map((mode) => (
                <Card
                  key={mode.id}
                  className="bg-white rounded-xl overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => startGame(mode.id)}
                >
                  <div className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="text-4xl">{mode.icon}</div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {mode.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {mode.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </motion.div>
          ) : !showResult ? (
            <motion.div
              key="game"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <Trophy className="w-5 h-5 text-yellow-500 mr-1" />
                    <span className="text-sm font-medium">Score: {score}</span>
                  </div>
                  <div className="flex items-center">
                    <Timer className="w-5 h-5 text-blue-500 mr-1" />
                    <span className="text-sm font-medium">{timeLeft}s</span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={resetGame}
                  className="text-gray-500"
                >
                  Exit Game
                </Button>
              </div>

              <Card className="bg-white rounded-xl p-6">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {gameModes.find((m) => m.id === selectedMode)?.title}
                    </h3>
                    <span className="text-sm text-gray-500">
                      Question {currentQuestion + 1} of{" "}
                      {
                        gameModes.find((m) => m.id === selectedMode)?.questions
                          .length
                      }
                    </span>
                  </div>

                  <div className="text-2xl font-medium text-gray-900">
                    {
                      gameModes.find((m) => m.id === selectedMode)?.questions[
                        currentQuestion
                      ].spanish
                    }
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    {gameModes
                      .find((m) => m.id === selectedMode)
                      ?.questions[currentQuestion].options.map(
                        (option, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            className="w-full justify-start text-left"
                            onClick={() => handleAnswer(option)}
                          >
                            {option}
                          </Button>
                        )
                      )}
                  </div>
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
                  <Star className="w-10 h-10 text-blue-500" />
                </div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  Game Over!
                </h2>
                <p className="text-gray-600 mb-6">
                  Your score: {score} out of{" "}
                  {
                    gameModes.find((m) => m.id === selectedMode)?.questions
                      .length
                  }
                </p>
                <div className="space-y-3">
                  <Button
                    onClick={resetGame}
                    className="w-full bg-blue-500 text-white hover:bg-blue-600"
                  >
                    Play Again
                  </Button>
                  <Button
                    variant="outline"
                    onClick={resetGame}
                    className="w-full text-gray-500"
                  >
                    Choose Another Game
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </motion.div>
  );
}
