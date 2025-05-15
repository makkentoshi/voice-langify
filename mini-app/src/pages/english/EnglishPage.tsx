// src/pages/english/EnglishPage.tsx
import React, { useEffect, useMemo, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/new/Card";
import { Button } from "@/components/ui/new/Button";
import { IELTSQuestion } from "@/components/english/IELTSQuestion";
import { ieltsQuestions } from "@/data/ieltsData";
import { useProgressStore } from "@/stores/progressStore";
import { useTelegramRecognition } from "@/hooks/useTelegramRecognition";
import { useTelegramInit } from "@/hooks/useTelegramInit";
import { cn } from "@/lib/utils";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function EnglishPage() {
  useTelegramInit("#FFFFFFFF", false);
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  const {
    transcript,
    isRecognizing,
    language,
    toggleRecognition,
    switchLanguage,
  } = useTelegramRecognition();

  const { progress, updateEnglishProgress } = useProgressStore();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showGptChat, setShowGptChat] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);

  const part1Questions = useMemo(
    () => ieltsQuestions.filter((q) => q.category === "part1"),
    []
  );
  const part2Questions = useMemo(
    () => ieltsQuestions.filter((q) => q.category === "part2"),
    []
  );
  const part3Questions = useMemo(
    () => ieltsQuestions.filter((q) => q.category === "part3"),
    []
  );

  const percentComplete = useMemo(
    () =>
      (progress.english.ieltsQuestionsCompleted /
        progress.english.ieltsQuestionsTotal) *
      100,
    [progress.english]
  );

  const handleCompleteQuestion = () => {
    if (currentQuestionIndex < ieltsQuestions.length - 1) {
      setCurrentQuestionIndex((i) => i + 1);
    }
    const newCompleted = Math.min(
      progress.english.ieltsQuestionsCompleted + 1,
      progress.english.ieltsQuestionsTotal
    );
    updateEnglishProgress(newCompleted, progress.english.ieltsQuestionsTotal);
  };

  useEffect(() => {
    document.title = "IELTS Preparation";
  }, []);

  const sections = [
    {
      title: "Part 1 – Interview",
      description: "Questions about yourself and familiar topics",
      questions: part1Questions,
      image:
        "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3",
      color: "from-blue-500/80 to-blue-600/80",
    },
    {
      title: "Part 2 – Long Turn",
      description: "Speak for 1–2 minutes on a topic",
      questions: part2Questions,
      image:
        "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3",
      color: "from-purple-500/80 to-purple-600/80",
    },
    {
      title: "Part 3 – Discussion",
      description: "In-depth discussion related to Part 2",
      questions: part3Questions,
      image:
        "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3",
      color: "from-green-500/80 to-green-600/80",
    },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-black text-white"
    >
      <motion.div style={{ y }} className="relative overflow-hidden py-12">
        <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-50"></div>
        <div className="relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center mb-8"
          >
            <span className="text-8xl mr-4">🇬🇧</span>
            <h1 className="text-4xl font-bold text-white">IELTS Preparation</h1>
          </motion.div>
        </div>
      </motion.div>

      <main className="px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Progress Section */}
          <motion.div
            variants={itemVariants}
            className="bg-white/5 backdrop-blur-lg rounded-2xl p-6"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Your Progress</h2>
              <span className="text-lg">
                {progress.english.ieltsQuestionsCompleted} /{" "}
                {progress.english.ieltsQuestionsTotal}
              </span>
            </div>
            <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-blue-500 rounded-full transition-all duration-500"
                style={{ width: `${percentComplete}%` }}
              />
            </div>
          </motion.div>

          {!showGptChat ? (
            <>
              {/* Current Question */}
              <motion.div variants={itemVariants}>
                <IELTSQuestion
                  question={ieltsQuestions[currentQuestionIndex]}
                  onComplete={handleCompleteQuestion}
                />
              </motion.div>

              {/* AI Chat Button */}
              <motion.div variants={itemVariants}>
                <Button
                  onClick={() => setShowGptChat(true)}
                  fullWidth
                  variant="gradient"
                  className="bg-gradient-to-r from-blue-500 to-purple-600"
                >
                  Chat with AI Assistant
                </Button>
              </motion.div>

              {/* IELTS Sections */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {sections.map((section, index) => (
                  <motion.div
                    key={section.title}
                    variants={itemVariants}
                    onMouseEnter={() => setHovered(index)}
                    onMouseLeave={() => setHovered(null)}
                    className={cn(
                      "relative rounded-2xl overflow-hidden h-[300px] transition-all duration-500",
                      hovered !== null &&
                        hovered !== index &&
                        "blur-sm scale-[0.98]"
                    )}
                  >
                    <div
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
                      style={{
                        backgroundImage: `url(${section.image})`,
                        transform:
                          hovered === index ? "scale(1.1)" : "scale(1)",
                      }}
                    />
                    <div
                      className={cn(
                        "absolute inset-0 bg-gradient-to-t",
                        section.color
                      )}
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                      <h3 className="text-2xl font-bold mb-2">
                        {section.title}
                      </h3>
                      <p className="text-lg opacity-90 mb-4 text-center">
                        {section.description}
                      </p>
                      <div className="flex flex-wrap gap-2 justify-center">
                        {section.questions.map((q, qIdx) => {
                          const completed = qIdx <= currentQuestionIndex;
                          return (
                            <span
                              key={q.id}
                              className={cn(
                                "w-8 h-8 rounded-full text-sm flex items-center justify-center transition-all duration-300",
                                completed
                                  ? "bg-white text-black"
                                  : "bg-white/20 text-white"
                              )}
                            >
                              {qIdx + 1}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </>
          ) : (
            /* AI Chat Interface */
            <motion.div
              variants={itemVariants}
              className="h-[80vh] flex flex-col space-y-4"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">AI Assistant</h2>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowGptChat(false)}
                >
                  Back to Practice
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-4">
                <Card className="p-3 bg-white/5 backdrop-blur-lg">
                  Hi there! How can I help with Part 2?
                </Card>
                <Card className="p-3 ml-auto bg-blue-500/20 backdrop-blur-lg">
                  Try asking tips for Part 2.
                </Card>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={toggleRecognition}
                  variant="outline"
                  className="bg-white/10"
                >
                  {isRecognizing ? "Stop" : "Record"}
                </Button>
                <input
                  type="text"
                  placeholder="Type your message…"
                  className="flex-1 bg-white/10 border border-white/20 rounded-full px-4 py-2 text-white placeholder-white/50 focus:ring-2 focus:ring-blue-500"
                />
                <Button
                  variant="gradient"
                  className="bg-gradient-to-r from-blue-500 to-purple-600"
                >
                  Send
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </motion.div>
  );
}
