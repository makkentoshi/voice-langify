import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/new/Card";
import { Button } from "@/components/ui/new/Button";
import { useTelegramInit } from "@/hooks/useTelegramInit";
import { cn } from "@/lib/utils";
import {
  Volume2,
  VolumeX,
  ArrowLeft,
  ArrowRight,
  Check,
  X,
} from "lucide-react";

const flashcards = [
  {
    id: 1,
    word: "Hola",
    translation: "Hello",
    example: "¡Hola! ¿Cómo estás?",
    exampleTranslation: "Hello! How are you?",
    category: "Greetings",
  },
  {
    id: 2,
    word: "Gracias",
    translation: "Thank you",
    example: "Muchas gracias por tu ayuda.",
    exampleTranslation: "Thank you very much for your help.",
    category: "Common Phrases",
  },
  {
    id: 3,
    word: "Por favor",
    translation: "Please",
    example: "¿Podrías ayudarme, por favor?",
    exampleTranslation: "Could you help me, please?",
    category: "Common Phrases",
  },
  {
    id: 4,
    word: "Buenos días",
    translation: "Good morning",
    example: "¡Buenos días! ¿Cómo amaneciste?",
    exampleTranslation: "Good morning! How did you wake up?",
    category: "Greetings",
  },
  {
    id: 5,
    word: "Adiós",
    translation: "Goodbye",
    example: "Adiós, hasta luego.",
    exampleTranslation: "Goodbye, see you later.",
    category: "Greetings",
  },
];

export default function Flashcards() {
  useTelegramInit("#FFFFFFFF", false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showExample, setShowExample] = useState(false);

  const currentCard = flashcards[currentIndex];

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setIsFlipped(false);
      setShowExample(false);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setIsFlipped(false);
      setShowExample(false);
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleToggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleToggleExample = () => {
    setShowExample(!showExample);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-black text-white"
    >
      <header className="relative overflow-hidden py-12">
        <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-50"></div>
        <div className="relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center mb-8"
          >
            <span className="text-8xl mr-4">🎴</span>
            <h1 className="text-4xl font-bold text-white">
              Spanish Flashcards
            </h1>
          </motion.div>
        </div>
      </header>

      <main className="px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="flex justify-between items-center mb-8">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="text-white border-white/20 hover:bg-white/10"
            >
              <ArrowLeft className="mr-2" size={20} />
              Previous
            </Button>
            <span className="text-white/60">
              {currentIndex + 1} / {flashcards.length}
            </span>
            <Button
              variant="outline"
              onClick={handleNext}
              disabled={currentIndex === flashcards.length - 1}
              className="text-white border-white/20 hover:bg-white/10"
            >
              Next
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </div>

          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="relative aspect-[4/3]"
          >
            <Card
              className={cn(
                "absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-lg rounded-2xl p-8 cursor-pointer transition-transform duration-500",
                isFlipped && "rotate-y-180"
              )}
              onClick={handleFlip}
            >
              <div className="h-full flex flex-col items-center justify-center text-center">
                <span className="text-sm text-white/60 mb-4">
                  {currentCard.category}
                </span>
                <h2 className="text-4xl font-bold mb-4">{currentCard.word}</h2>
                {isFlipped && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-2xl text-white/80"
                  >
                    {currentCard.translation}
                  </motion.div>
                )}
              </div>
            </Card>
          </motion.div>

          <div className="flex justify-center space-x-4">
            <Button
              variant="outline"
              onClick={handleToggleMute}
              className="text-white border-white/20 hover:bg-white/10"
            >
              {isMuted ? (
                <VolumeX className="mr-2" size={20} />
              ) : (
                <Volume2 className="mr-2" size={20} />
              )}
              {isMuted ? "Unmute" : "Mute"}
            </Button>
            <Button
              variant="outline"
              onClick={handleToggleExample}
              className="text-white border-white/20 hover:bg-white/10"
            >
              {showExample ? "Hide Example" : "Show Example"}
            </Button>
          </div>

          <AnimatePresence>
            {showExample && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="mt-8"
              >
                <Card className="bg-white/5 backdrop-blur-lg rounded-2xl p-6">
                  <h3 className="text-xl font-semibold mb-4">Example Usage</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-white/10 rounded-lg">
                      <p className="text-lg mb-2">{currentCard.example}</p>
                      <p className="text-white/60">
                        {currentCard.exampleTranslation}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex justify-center space-x-4 mt-8">
            <Button
              variant="gradient"
              className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
            >
              <X className="mr-2" size={20} />
              Mark as Difficult
            </Button>
            <Button
              variant="gradient"
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
            >
              <Check className="mr-2" size={20} />
              Mark as Learned
            </Button>
          </div>
        </div>
      </main>
    </motion.div>
  );
}
