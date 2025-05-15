import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/ui/PageTransition";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ChevronLeft, Trophy, RefreshCw, Star } from "lucide-react";

// Quiz data
interface QuizQuestion {
  id: number;
  question: string;
  correctAnswer: string;
  options: { text: string; emoji: string }[];
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "Which of these is 'the cheese'?",
    correctAnswer: "el queso",
    options: [
      { text: "el queso", emoji: "🧀" },
      { text: "el pan", emoji: "🍞" },
      { text: "la leche", emoji: "🥛" },
      { text: "la manzana", emoji: "🍎" },
    ],
  },
  {
    id: 2,
    question: "Which of these is 'the dog'?",
    correctAnswer: "el perro",
    options: [
      { text: "el gato", emoji: "🐱" },
      { text: "el pájaro", emoji: "🐦" },
      { text: "el perro", emoji: "🐶" },
      { text: "el pez", emoji: "🐠" },
    ],
  },
  {
    id: 3,
    question: "Which of these is 'the house'?",
    correctAnswer: "la casa",
    options: [
      { text: "el coche", emoji: "🚗" },
      { text: "la casa", emoji: "🏠" },
      { text: "el edificio", emoji: "🏢" },
      { text: "el parque", emoji: "🏞️" },
    ],
  },
  {
    id: 4,
    question: "Which of these is 'good morning'?",
    correctAnswer: "buenos días",
    options: [
      { text: "buenas noches", emoji: "🌙" },
      { text: "buenos días", emoji: "☀️" },
      { text: "buenas tardes", emoji: "🌇" },
      { text: "hola", emoji: "👋" },
    ],
  },
  {
    id: 5,
    question: "Which of these is 'the water'?",
    correctAnswer: "el agua",
    options: [
      { text: "el vino", emoji: "🍷" },
      { text: "la cerveza", emoji: "🍺" },
      { text: "el café", emoji: "☕" },
      { text: "el agua", emoji: "💧" },
    ],
  },
];

const GamePage: React.FC = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isGameFinished, setIsGameFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  const handleBackClick = () => {
    navigate(-1);
  };

  const handleAnswerSelect = (answer: string) => {
    if (isAnswered) return;

    setSelectedAnswer(answer);
    setIsAnswered(true);
    setIsTimerRunning(false);

    if (answer === quizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (currentQuestion < quizQuestions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setIsAnswered(false);
        setTimeLeft(15);
        setIsTimerRunning(true);
      } else {
        setIsGameFinished(true);
      }
    }, 1500);
  };

  const resetGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setIsGameFinished(false);
    setTimeLeft(15);
    setIsTimerRunning(true);
  };

  // Timer effect
  useEffect(() => {
    if (isTimerRunning && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (isTimerRunning && timeLeft === 0) {
      setIsAnswered(true);
      setIsTimerRunning(false);

      setTimeout(() => {
        if (currentQuestion < quizQuestions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setSelectedAnswer(null);
          setIsAnswered(false);
          setTimeLeft(15);
          setIsTimerRunning(true);
        } else {
          setIsGameFinished(true);
        }
      }, 1500);
    }
  }, [timeLeft, isTimerRunning, currentQuestion]);

  return (
    <PageTransition>
      <div className="space-y-6">
        <motion.div
          className="flex items-center mb-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <button
            onClick={handleBackClick}
            className="ios-back-button flex items-center"
          >
            <ChevronLeft size={20} />
            <span>Back</span>
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex justify-between items-center"
        >
          <div>
            <h1 className="text-2xl font-bold">Spanish Game</h1>
            <p className="text-gray-500 mt-1">Test your vocabulary</p>
          </div>

          {!isGameFinished && (
            <div className="bg-primary-100 text-primary-500 px-3 py-1 rounded-full text-sm font-medium">
              Score: {score}
            </div>
          )}
        </motion.div>

        {!isGameFinished ? (
          <div className="space-y-5">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">
                Question {currentQuestion + 1} of {quizQuestions.length}
              </span>

              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <span
                    className={`text-sm font-medium ${
                      timeLeft <= 5 ? "text-danger-500" : "text-gray-700"
                    }`}
                  >
                    {timeLeft}
                  </span>
                </div>
              </div>
            </div>

            <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary-500 rounded-full"
                initial={{ width: 0 }}
                animate={{
                  width: `${
                    ((currentQuestion + 1) / quizQuestions.length) * 100
                  }%`,
                }}
                transition={{ duration: 0.5 }}
              />
            </div>

            <Card className="p-5">
              <h2 className="text-xl font-semibold text-center mb-6">
                {quizQuestions[currentQuestion].question}
              </h2>

              <div className="grid grid-cols-2 gap-4">
                {quizQuestions[currentQuestion].options.map((option, index) => {
                  const isCorrect =
                    option.text ===
                    quizQuestions[currentQuestion].correctAnswer;
                  const isSelected = selectedAnswer === option.text;
                  let bgColor = "bg-white";

                  if (isAnswered) {
                    if (isCorrect) {
                      bgColor = "bg-success-100 border-success-500";
                    } else if (isSelected && !isCorrect) {
                      bgColor = "bg-danger-100 border-danger-500";
                    }
                  }

                  return (
                    <motion.div
                      key={index}
                      whileTap={!isAnswered ? { scale: 0.95 } : {}}
                      className={`border rounded-ios p-4 text-center cursor-pointer transition-colors duration-200 ${bgColor}`}
                      onClick={() => handleAnswerSelect(option.text)}
                    >
                      <span className="text-3xl block mb-2">
                        {option.emoji}
                      </span>
                      <span className="font-medium">{option.text}</span>
                    </motion.div>
                  );
                })}
              </div>
            </Card>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Card className="p-6 text-center">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary-100 flex items-center justify-center">
                <Trophy className="text-primary-500" size={36} />
              </div>

              <h2 className="text-2xl font-bold mb-2">Game Completed!</h2>
              <p className="text-gray-500 mb-3">Your Score</p>

              <div className="flex items-center justify-center mb-4">
                <span className="text-4xl font-bold text-primary-500">
                  {score}
                </span>
                <span className="text-gray-500 ml-1">
                  / {quizQuestions.length}
                </span>
              </div>

              <div className="flex justify-center mb-6">
                {[...Array(5)].map((_, i) => {
                  const percentage = (score / quizQuestions.length) * 100;
                  const stars = Math.round((percentage / 100) * 5);
                  return (
                    <Star
                      key={i}
                      size={24}
                      className={
                        i < stars
                          ? "text-warning-500 fill-warning-500"
                          : "text-gray-300"
                      }
                    />
                  );
                })}
              </div>

              <Button onClick={resetGame} icon={<RefreshCw size={18} />}>
                Play Again
              </Button>
            </Card>
          </motion.div>
        )}
      </div>
    </PageTransition>
  );
};

export default GamePage;
