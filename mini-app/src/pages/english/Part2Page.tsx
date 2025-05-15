import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/new/Card";
import { Button } from "@/components/ui/new/Button";
import { useTelegramInit } from "@/hooks/useTelegramInit";
import { cn } from "@/lib/utils";

const topics = [
  {
    title: "Describe a Place",
    description: "Talk about a memorable location",
    image:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3",
  },
  {
    title: "Describe a Person",
    description: "Share about someone important to you",
    image:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3",
  },
  {
    title: "Describe an Event",
    description: "Talk about a significant experience",
    image:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3",
  },
  {
    title: "Describe an Object",
    description: "Discuss something meaningful to you",
    image:
      "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3",
  },
];

export default function Part2Page() {
  useTelegramInit("#FFFFFFFF", false);
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-[#012169] text-white"
    >
      <header className="relative overflow-hidden py-12">
        <div className="absolute inset-0 bg-gradient-to-b from-[#012169] to-transparent opacity-50"></div>
        <div className="relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center mb-8"
          >
            <span className="text-8xl mr-4">🇬🇧</span>
            <h1 className="text-4xl font-bold text-white">
              Part 2 - Long Turn
            </h1>
          </motion.div>
        </div>
      </header>

      <main className="px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                <div className="absolute inset-0 bg-gradient-to-t from-[#C8102E]/80 to-[#C8102E]/90" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                  <h3 className="text-2xl font-bold mb-2">{topic.title}</h3>
                  <p className="text-lg opacity-90 mb-4 text-center">
                    {topic.description}
                  </p>
                  <Link to="/english/chat">
                    <Button
                      variant="gradient"
                      className="bg-gradient-to-r from-[#012169] to-[#C8102E] hover:from-[#C8102E] hover:to-[#012169]"
                    >
                      Start Practice
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </motion.div>
  );
}
