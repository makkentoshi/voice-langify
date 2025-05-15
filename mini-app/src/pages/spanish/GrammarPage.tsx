// src/pages/spanish/GrammarPage.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/new/Card";
import { Button } from "@/components/ui/new/Button";
import { useTelegramInit } from "@/hooks/useTelegramInit";
import { cn } from "@/lib/utils";

const grammarTopics = [
  {
    title: "Present Tense",
    description: "Learn about regular and irregular verbs in present tense",
    examples: ["Yo hablo español", "Tú comes frutas", "Él vive en Madrid"],
    color: "from-blue-500/80 to-blue-600/80",
    image:
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3",
  },
  {
    title: "Past Tense",
    description: "Master the preterite and imperfect tenses",
    examples: [
      "Yo hablé con él ayer",
      "Ella vivía en Barcelona",
      "Nosotros comimos paella",
    ],
    color: "from-purple-500/80 to-purple-600/80",
    image:
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3",
  },
  {
    title: "Future Tense",
    description: "Learn to express future actions and plans",
    examples: ["Yo hablaré español", "Tú comerás paella", "Ellos vivirán aquí"],
    color: "from-green-500/80 to-green-600/80",
    image:
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3",
  },
  {
    title: "Subjunctive Mood",
    description: "Understand when and how to use the subjunctive",
    examples: [
      "Espero que hables español",
      "Quiero que comas frutas",
      "Dudo que viva aquí",
    ],
    color: "from-red-500/80 to-red-600/80",
    image:
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3",
  },
];

export default function GrammarPage() {
  useTelegramInit("#FFFFFFFF", false);
  const [hovered, setHovered] = useState<number | null>(null);

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
            <span className="text-8xl mr-4">📚</span>
            <h1 className="text-4xl font-bold text-white">Spanish Grammar</h1>
          </motion.div>
        </div>
      </header>

      <main className="px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {grammarTopics.map((topic, index) => (
              <motion.div
                key={topic.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
                className={cn(
                  "relative rounded-2xl overflow-hidden h-[400px] transition-all duration-500",
                  hovered !== null &&
                    hovered !== index &&
                    "blur-sm scale-[0.98]"
                )}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
                  style={{
                    backgroundImage: `url(${topic.image})`,
                    transform: hovered === index ? "scale(1.1)" : "scale(1)",
                  }}
                />
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-t",
                    topic.color
                  )}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                  <div className="text-4xl mb-4">
                    <BookOpen className="w-12 h-12" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{topic.title}</h3>
                  <p className="text-lg opacity-90 mb-4 text-center">
                    {topic.description}
                  </p>
                  <div className="space-y-2 mb-6">
                    {topic.examples.map((example, i) => (
                      <p
                        key={i}
                        className="text-sm bg-white/10 px-4 py-2 rounded-lg"
                      >
                        {example}
                      </p>
                    ))}
                  </div>
                  <Button
                    variant="gradient"
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500"
                  >
                    Learn More
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-12 max-w-2xl mx-auto"
          >
            <Card className="bg-white/5 backdrop-blur-lg rounded-2xl p-6">
              <h2 className="text-xl font-semibold mb-6">Quick Tips</h2>
              <div className="space-y-4">
                <div className="p-4 bg-white/10 rounded-lg">
                  <h3 className="font-medium mb-2">Remember!</h3>
                  <p className="text-white/80">
                    Spanish verbs change their endings based on the subject and
                    tense. Practice regularly to master the patterns.
                  </p>
                </div>
                <div className="p-4 bg-white/10 rounded-lg">
                  <h3 className="font-medium mb-2">Pro Tip</h3>
                  <p className="text-white/80">
                    Create flashcards for irregular verbs and review them daily
                    to improve your grammar skills.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </main>
    </motion.div>
  );
}
