import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Globe, BookOpen, Award, Sparkles, MessageSquare, ChevronRight } from 'lucide-react';
import { LanguageSelector } from '@/components/language/LanguageSelector';
import { Card } from '@/components/ui/new/Card';
import { Button } from '@/components/ui/new/Button';
import { usefulPhrases } from '@/data/usefulPhrases';
import { useTelegramInit } from "@/hooks/useTelegramInit";

// Тип для фраз
interface Phrase {
  spanish: string;
  english: string;
}

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const HomePage: React.FC = () => {
  useTelegramInit(/* headerColor */ undefined, /* showMainButton */ false);  
  useTelegramInit('#3B82F6', false);

  const [streak, setStreak] = useState(0);
  const [dailyPhrases, setDailyPhrases] = useState<Phrase[]>([]);


  useEffect(() => {
    const savedStreak = localStorage.getItem('streak');
    const lastVisit = localStorage.getItem('lastVisit');
    const today = new Date().toDateString();

    if (savedStreak) {
      const streakCount = parseInt(savedStreak, 10);

      if (lastVisit && lastVisit !== today) {
        const lastDate = new Date(lastVisit).getTime();
        const currentDate = new Date(today).getTime();
        const daysDifference = Math.floor((currentDate - lastDate) / (1000 * 60 * 60 * 24));

        if (daysDifference === 1) {
          setStreak(streakCount + 1);
          localStorage.setItem('streak', (streakCount + 1).toString());
        } else if (daysDifference > 1) {
          setStreak(1);
          localStorage.setItem('streak', '1');
        } else {
          setStreak(streakCount);
        }
      } else if (!lastVisit) {
        setStreak(1);
        localStorage.setItem('streak', '1');
      } else {
        setStreak(streakCount);
      }
    } else {
      setStreak(1);
      localStorage.setItem('streak', '1');
    }

    localStorage.setItem('lastVisit', today);

    if (Array.isArray(usefulPhrases)) {
      const randomPhrases = [...usefulPhrases]
        .sort(() => 0.5 - Math.random())
        .slice(0, 5);
      setDailyPhrases(randomPhrases);
    } else {
      console.error('usefulPhrases is not an array or is undefined');
      setDailyPhrases([]);
    }
  }, []);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"
    >
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 opacity-20"></div>
        <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-8">
          <motion.h1
            className="text-3xl font-bold text-center mb-4"
            variants={itemVariants}
          >
            Language Learner
          </motion.h1>
          <motion.div
            className="flex items-center justify-center space-x-2"
            variants={itemVariants}
          >
            <Award className="text-yellow-300" size={24} />
            <span className="text-lg font-semibold">Day {streak} streak</span>
          </motion.div>
        </div>
      </header>

      <main className="p-6 max-w-lg mx-auto space-y-6">
        <motion.div variants={itemVariants}>
          <LanguageSelector />
        </motion.div>

        <motion.div className="grid gap-6" variants={containerVariants}>
          <Link to="/english">
            <motion.div
              className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg transition-all hover:shadow-xl"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative flex items-center">
                <div className="rounded-full bg-blue-100 p-3 mr-4">
                  <Globe className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-900">English</h2>
                  <p className="text-sm text-gray-600">IELTS Preparation</p>
                  <div className="mt-2 h-2 rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full bg-blue-500"
                      style={{ width: '60%' }} // Placeholder progress
                    ></div>
                  </div>
                </div>
                <Sparkles className="w-5 h-5 text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.div>
          </Link>

          <Link to="/spanish">
            <motion.div
              className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-lg transition-all hover:shadow-xl"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative flex items-center">
                <div className="rounded-full bg-green-100 p-3 mr-4">
                  <BookOpen className="w-6 h-6 text-green-600" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-gray-900">Spanish</h2>
                  <p className="text-sm text-gray-600">Learn Spanish</p>
                  <div className="mt-2 h-2 rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full bg-green-500"
                      style={{ width: '40%' }} // Placeholder progress
                    ></div>
                  </div>
                </div>
                <Sparkles className="w-5 h-5 text-green-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.div>
          </Link>

          {dailyPhrases.length > 0 && (
            <motion.div variants={itemVariants}>
              <Card className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <MessageSquare className="w-6 h-6 mr-2" />
                    <h2 className="text-lg font-semibold">Useful Phrases</h2>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-white/20 text-white hover:bg-white/10"
                    icon={<ChevronRight size={18} />}
                  >
                    View All
                  </Button>
                </div>
                <div className="space-y-4">
                  {dailyPhrases.map((phrase, index) => (
                    <motion.div
                      key={index}
                      className="border-b border-white/20 pb-3 last:border-0 last:pb-0"
                      variants={itemVariants}
                    >
                      <p className="font-medium text-md">{phrase.spanish}</p>
                      <p className="text-sm opacity-90">{phrase.english}</p>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}
        </motion.div>
      </main>
    </motion.div>
  );
};

export default HomePage;