import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MessageSquare } from "lucide-react";
import { Card } from "@/components/ui/new/Card";
import { Button } from "@/components/ui/new/Button";
import { usefulPhrases } from "@/data/usefulPhrases";
import { useTelegramInit } from "@/hooks/useTelegramInit";
import { cn } from "@/lib/utils";

// Тип для фраз
interface Phrase {
  spanish: string;
  english: string;
}

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

const HomePage: React.FC = () => {
  useTelegramInit("#FFFFFFFF", false);

  const [streak, setStreak] = useState(0);
  const [dailyPhrases, setDailyPhrases] = useState<Phrase[]>([]);
  const [hovered, setHovered] = useState<number | null>(null);

  useEffect(() => {
    const savedStreak = localStorage.getItem("streak");
    const lastVisit = localStorage.getItem("lastVisit");
    const today = new Date().toDateString();

    if (savedStreak) {
      const streakCount = parseInt(savedStreak, 10);

      if (lastVisit && lastVisit !== today) {
        const lastDate = new Date(lastVisit).getTime();
        const currentDate = new Date(today).getTime();
        const daysDifference = Math.floor(
          (currentDate - lastDate) / (1000 * 60 * 60 * 24)
        );

        if (daysDifference === 1) {
          setStreak(streakCount + 1);
          localStorage.setItem("streak", (streakCount + 1).toString());
        } else if (daysDifference > 1) {
          setStreak(1);
          localStorage.setItem("streak", "1");
        } else {
          setStreak(streakCount);
        }
      } else if (!lastVisit) {
        setStreak(1);
        localStorage.setItem("streak", "1");
      } else {
        setStreak(streakCount);
      }
    } else {
      setStreak(1);
      localStorage.setItem("streak", "1");
    }

    localStorage.setItem("lastVisit", today);

    if (Array.isArray(usefulPhrases)) {
      const randomPhrases = [...usefulPhrases]
        .sort(() => 0.5 - Math.random())
        .slice(0, 5);
      setDailyPhrases(randomPhrases);
    } else {
      console.error("usefulPhrases is not an array or is undefined");
      setDailyPhrases([]);
    }
  }, []);

  const cards = [
    {
      title: "English",
      description: "IELTS Preparation",
      src: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-4.0.3",
      flag: "🇬🇧",
      progress: 60,
      to: "/english",
    },
    {
      title: "Spanish",
      description: "Learn Spanish",
      src: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?ixlib=rb-4.0.3",
      flag: "🇪🇸",
      progress: 40,
      to: "/spanish",
    },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-black text-white"
    >
      <header className="relative overflow-hidden py-12">
        <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-50"></div>
        <div className="relative z-10 text-center">
          <motion.h1
            className="text-4xl font-bold mb-8 text-white"
            variants={itemVariants}
          >
            Hola!
          </motion.h1>
          <motion.div
            className="flex flex-col items-center justify-center space-y-2"
            variants={itemVariants}
          >
            <div className="text-8xl mb-2">🔥</div>
            <span className="text-2xl font-semibold">Day {streak}</span>
          </motion.div>
        </div>
      </header>

      <main className="px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {cards.map((card, index) => (
            <Link to={card.to} key={card.title}>
              <motion.div
                onMouseEnter={() => setHovered(index)}
                onMouseLeave={() => setHovered(null)}
                className={cn(
                  "relative rounded-2xl overflow-hidden h-[400px] transition-all duration-500",
                  hovered !== null &&
                    hovered !== index &&
                    "blur-sm scale-[0.98]"
                )}
                variants={itemVariants}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700"
                  style={{
                    backgroundImage: `url(${card.src})`,
                    transform: hovered === index ? "scale(1.1)" : "scale(1)",
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                  <span className="text-8xl mb-4">{card.flag}</span>
                  <h2 className="text-3xl font-bold mb-2">{card.title}</h2>
                  <p className="text-lg opacity-90 mb-4">{card.description}</p>
                  <div className="w-32 h-1 bg-white/30 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white rounded-full transition-all duration-500"
                      style={{ width: `${card.progress}%` }}
                    />
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        {dailyPhrases.length > 0 && (
          <motion.div
            variants={itemVariants}
            className="mt-12 max-w-2xl mx-auto"
          >
            <Card className="bg-white/5 backdrop-blur-lg rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <MessageSquare className="w-6 h-6 mr-2" />
                  <h2 className="text-xl font-semibold">Useful Phrases</h2>
                </div>
              </div>
              <div className="space-y-4">
                {dailyPhrases.map((phrase, index) => (
                  <motion.div
                    key={index}
                    className="border-b border-white/10 pb-4 last:border-0 last:pb-0 text-white"
                    variants={itemVariants}
                  >
                    <p className="font-medium text-lg">{phrase.spanish}</p>
                    <p className="text-sm opacity-70">{phrase.english}</p>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        )}
      </main>
    </motion.div>
  );
};

export default HomePage;
