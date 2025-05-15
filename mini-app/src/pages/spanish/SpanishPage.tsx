// src/pages/spanish/SpanishPage.tsx
import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  BookOpen,
  MessageCircle,
  Compass,
  Gamepad2,
  GraduationCap,
  ChevronRight,
  ArrowLeft,
  MessageSquare,
} from "lucide-react";
import { ProgressBar } from "../../components/ui/ProgressBar";
import { Card } from "@/components/ui/new/Card";
import { useProgressStore } from "../../stores/progressStore";
import { useTelegramInit } from "../../hooks/useTelegramInit";
import { cn } from "@/lib/utils";

interface Module {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: "primary" | "secondary" | "accent" | "warning" | "danger" | "info";
  to: string;
  progressKey?: "vocab" | "grammar" | "conversation";
  image: string;
}

const colorVariants = {
  primary: "from-blue-500/80 to-blue-600/80",
  secondary: "from-purple-500/80 to-purple-600/80",
  accent: "from-green-500/80 to-green-600/80",
  warning: "from-yellow-500/80 to-yellow-600/80",
  danger: "from-red-500/80 to-red-600/80",
  info: "from-blue-500/80 to-blue-600/80",
};

const SpanishPage: React.FC = () => {
  useTelegramInit("#FFFFFFFF", false);
  const { progress } = useProgressStore();
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const modules: Module[] = [
    {
      icon: <BookOpen size={24} />,
      title: "Topics",
      description: "Learn by themes",
      color: "primary",
      to: "/spanish/topics",
      image:
        "https://images.unsplash.com/photo-1543783207-ec64e4d95325?ixlib=rb-4.0.3",
    },
    {
      icon: <MessageCircle size={24} />,
      title: "Vocabulary",
      description: "Essential words & flashcards",
      color: "accent",
      to: "/spanish/flashcards",
      progressKey: "vocab",
      image:
        "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3",
    },
    {
      icon: <Compass size={24} />,
      title: "Conversation",
      description: "Daily phrases",
      color: "secondary",
      to: "/spanish/conversation",
      progressKey: "conversation",
      image:
        "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3",
    },
    {
      icon: <GraduationCap size={24} />,
      title: "Grammar",
      description: "Spanish tenses",
      color: "warning",
      to: "/spanish/grammar",
      progressKey: "grammar",
      image:
        "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3",
    },
    {
      icon: <Gamepad2 size={24} />,
      title: "Game",
      description: "Test your Spanish",
      color: "danger",
      to: "/spanish/game",
      image:
        "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3",
    },
  ];

  const percentVocab = useMemo(() => {
    if (!progress.spanish.flashcardsTotal) return 0;
    return (
      (progress.spanish.flashcardsLearned / progress.spanish.flashcardsTotal) *
      100
    );
  }, [progress.spanish.flashcardsLearned, progress.spanish.flashcardsTotal]);

  const percentGrammar = useMemo(() => {
    if (!progress.spanish.grammarTotal) return 0;
    return (
      (progress.spanish.grammarCompleted / progress.spanish.grammarTotal) * 100
    );
  }, [progress.spanish.grammarCompleted, progress.spanish.grammarTotal]);

  const percentConversation = useMemo(() => 60, []);

  const getProgressPercent = (
    key?: "vocab" | "grammar" | "conversation"
  ): number => {
    switch (key) {
      case "vocab":
        return percentVocab;
      case "grammar":
        return percentGrammar;
      case "conversation":
        return percentConversation;
      default:
        return 0;
    }
  };

  const getProgressFraction = (
    key?: "vocab" | "grammar" | "conversation"
  ): string => {
    switch (key) {
      case "vocab":
        return `${progress.spanish.flashcardsLearned}/${progress.spanish.flashcardsTotal}`;
      case "grammar":
        return `${progress.spanish.grammarCompleted}/${progress.spanish.grammarTotal}`;
      default:
        return "";
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <motion.div style={{ y }} className="relative overflow-hidden py-12">
        <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-50"></div>
        <div className="relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center mb-8"
          >
            <span className="text-8xl mr-4">🇪🇸</span>
            <h1 className="text-4xl font-bold">Spanish Learning</h1>
          </motion.div>
        </div>
      </motion.div>

      <main className="px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {modules.map((module, index) => (
            <Link to={module.to} key={module.title}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative rounded-2xl overflow-hidden h-[300px] group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
                  style={{
                    backgroundImage: `url(${module.image})`,
                    transform: "scale(1.1)",
                  }}
                />
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-t",
                    colorVariants[module.color]
                  )}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                  <div className="text-4xl mb-4">{module.icon}</div>
                  <h2 className="text-2xl font-bold mb-2">{module.title}</h2>
                  <p className="text-lg opacity-90 mb-4">
                    {module.description}
                  </p>
                  {module.progressKey && (
                    <div className="w-32 h-1 bg-white/30 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-white rounded-full transition-all duration-500"
                        style={{
                          width: `${getProgressPercent(module.progressKey)}%`,
                        }}
                      />
                    </div>
                  )}
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 max-w-2xl mx-auto"
        >
          <Card className="bg-white/5 backdrop-blur-lg rounded-2xl p-6">
            <h2 className="text-xl font-semibold mb-6">Learning Tip</h2>
            <div className="p-4 bg-white/10 rounded-lg">
              <h3 className="font-medium mb-2">Today's Tip ✨</h3>
              <p className="text-white/80">
                Practice speaking Spanish out loud every day, even if just for 5
                minutes. Repetition is key!
              </p>
            </div>
          </Card>
        </motion.div>
      </main>
    </div>
  );
};

export default SpanishPage;
