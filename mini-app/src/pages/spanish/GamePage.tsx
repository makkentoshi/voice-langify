import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Trophy, Star, Timer } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/new/Card";
import { Button } from "@/components/ui/new/Button";
import { useTelegramInit } from "@/hooks/useTelegramInit";
import { cn } from "@/lib/utils";

const gameModes = [
  {
    title: "Word Match",
    description: "Match Spanish words with their English translations",
    icon: <Star className="w-8 h-8" />,
    color: "from-purple-500/80 to-purple-600/80",
    image:
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3",
  },
  {
    title: "Time Challenge",
    description: "Answer as many questions as possible in 60 seconds",
    icon: <Timer className="w-8 h-8" />,
    color: "from-blue-500/80 to-blue-600/80",
    image:
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3",
  },
  {
    title: "Grammar Quiz",
    description: "Test your knowledge of Spanish grammar",
    icon: <Trophy className="w-8 h-8" />,
    color: "from-green-500/80 to-green-600/80",
    image:
      "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?ixlib=rb-4.0.3",
  },
];

export default function GamePage() {
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
            <span className="text-8xl mr-4">🎮</span>
            <h1 className="text-4xl font-bold text-white">Spanish Games</h1>
          </motion.div>
        </div>
      </header>

      <main className="px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {gameModes.map((mode, index) => (
              <motion.div
                key={mode.title}
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
                    backgroundImage: `url(${mode.image})`,
                    transform: hovered === index ? "scale(1.1)" : "scale(1)",
                  }}
                />
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-t",
                    mode.color
                  )}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                  <div className="text-4xl mb-4">{mode.icon}</div>
                  <h3 className="text-2xl font-bold mb-2">{mode.title}</h3>
                  <p className="text-lg opacity-90 mb-4 text-center">
                    {mode.description}
                  </p>
                  <Button
                    variant="gradient"
                    className="bg-gradient-to-r from-purple-500 to-blue-500 hover:from-blue-500 hover:to-purple-500"
                  >
                    Play Now
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
              <h2 className="text-xl font-semibold mb-6">Leaderboard</h2>
              <div className="space-y-4">
                {[1, 2, 3].map((rank) => (
                  <div
                    key={rank}
                    className="flex items-center justify-between p-4 bg-white/10 rounded-lg"
                  >
                    <div className="flex items-center">
                      <span className="text-2xl mr-4">🏆</span>
                      <div>
                        <h3 className="font-medium">Player {rank}</h3>
                        <p className="text-sm text-white/70">
                          Score: {1000 - (rank - 1) * 100}
                        </p>
                      </div>
                    </div>
                    <span className="text-lg font-bold">#{rank}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </main>
    </motion.div>
  );
}
