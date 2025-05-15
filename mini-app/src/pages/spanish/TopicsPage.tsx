import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/new/Card";
import { Button } from "@/components/ui/new/Button";
import { useTelegramInit } from "@/hooks/useTelegramInit";
import { cn } from "@/lib/utils";

const topics = [
  {
    title: "Animals",
    emoji: "🐾",
    description: "Learn animal names and sounds",
    color: "from-orange-500/80 to-orange-600/80",
    image:
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3",
    progress: 40,
  },
  {
    title: "Food & Drinks",
    emoji: "🍔",
    description: "Essential vocabulary for restaurants",
    color: "from-red-500/80 to-red-600/80",
    image:
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3",
    progress: 60,
  },
  {
    title: "Travel",
    emoji: "✈️",
    description: "Useful phrases for travelers",
    color: "from-blue-500/80 to-blue-600/80",
    image:
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3",
    progress: 20,
  },
  {
    title: "Family",
    emoji: "👨‍👩‍👧‍👦",
    description: "Family members and relationships",
    color: "from-purple-500/80 to-purple-600/80",
    image:
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3",
    progress: 80,
  },
  {
    title: "Shopping",
    emoji: "🛍️",
    description: "Shopping vocabulary and phrases",
    color: "from-green-500/80 to-green-600/80",
    image:
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3",
    progress: 30,
  },
  {
    title: "Weather",
    emoji: "☁️",
    description: "Weather conditions and forecasts",
    color: "from-yellow-500/80 to-yellow-600/80",
    image:
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3",
    progress: 50,
  },
];

export default function TopicsPage() {
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
            <h1 className="text-4xl font-bold text-white">Spanish Topics</h1>
          </motion.div>
        </div>
      </header>

      <main className="px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topics.map((topic, index) => (
              <motion.div
                key={topic.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
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
                  <span className="text-6xl mb-4">{topic.emoji}</span>
                  <h3 className="text-2xl font-bold mb-2">{topic.title}</h3>
                  <p className="text-lg opacity-90 mb-4 text-center">
                    {topic.description}
                  </p>
                  <div className="w-full max-w-[200px] h-1 bg-white/30 rounded-full overflow-hidden mb-4">
                    <div
                      className="h-full bg-white rounded-full transition-all duration-500"
                      style={{ width: `${topic.progress}%` }}
                    />
                  </div>
                  <Button
                    variant="gradient"
                    className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-purple-500 hover:to-blue-500"
                  >
                    Start Learning
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
              <h2 className="text-xl font-semibold mb-6">Learning Progress</h2>
              <div className="space-y-4">
                <div className="p-4 bg-white/10 rounded-lg">
                  <h3 className="font-medium mb-2">Your Achievement</h3>
                  <p className="text-white/80">
                    You've completed 3 out of 6 topics. Keep going!
                  </p>
                </div>
                <div className="p-4 bg-white/10 rounded-lg">
                  <h3 className="font-medium mb-2">Next Goal</h3>
                  <p className="text-white/80">
                    Complete the Weather topic to unlock new vocabulary sets.
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
