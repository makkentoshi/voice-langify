// src/pages/HomePage.tsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

// Импорты из первого файла (стили и UI)
import PageTransition from "@/components/ui/PageTransition"; // Предполагаем, что путь корректен
import { Card } from "@/components/ui/Card"; // Предполагаем, что путь корректен
import { Button } from "@/components/ui/Button"; // Предполагаем, что путь корректен
import { Flame, MessageSquare, ChevronRight } from "lucide-react";
import { usefulPhrases } from "@/data/usefulPhrases"; // Предполагаем, что путь корректен

// Импорты из второго файла (логика и Telegram)
import { LanguageSelector } from "@/components/language/LanguageSelector"; // Путь из второго файла
import { useTelegramInit } from "@/hooks/useTelegramInit"; // Путь из второго файла

const flagVariants = {
  hover: {
    scale: 1.05,
    y: -5,
    transition: { duration: 0.2 },
  },
  tap: {
    scale: 0.95,
    transition: { duration: 0.1 },
  },
};

// Тип для фраз, если он не определен в usefulPhrases.ts
interface Phrase {
  spanish: string;
  english: string;
}

const HomePage: React.FC = () => {
  // Логика из второго файла: инициализация Telegram
  useTelegramInit(/* headerColor */ undefined, /* showMainButton */ false);

  // Состояние из первого файла
  const [streak, setStreak] = useState(0);
  const [dailyPhrases, setDailyPhrases] = useState<Phrase[]>([]);

  // Логика из второго файла: установка заголовка документа
  useEffect(() => {
    document.title = "Language Learning";
  }, []);

  // useEffect из первого файла (логика стрика и полезных фраз)
  useEffect(() => {
    // Load streak from localStorage
    const savedStreak = localStorage.getItem("streak");
    const lastVisit = localStorage.getItem("lastVisit");
    const today = new Date().toDateString();

    if (savedStreak) {
      const streakCount = parseInt(savedStreak, 10);

      if (lastVisit && lastVisit !== today) {
        const lastDate = new Date(lastVisit).getTime();
        const currentDate = new Date(today).getTime();
        // Разница в миллисекундах / (1000 мс/с * 60 с/мин * 60 мин/ч * 24 ч/день)
        const daysDifference = Math.floor(
          (currentDate - lastDate) / (1000 * 60 * 60 * 24)
        );

        if (daysDifference === 1) {
          // Consecutive day - increase streak
          setStreak(streakCount + 1);
          localStorage.setItem("streak", (streakCount + 1).toString());
        } else if (daysDifference > 1) {
          // Streak broken - reset to 1
          setStreak(1);
          localStorage.setItem("streak", "1");
        } else {
          // Visited same day or error in date logic (e.g. future lastVisit) - keep current streak
          setStreak(streakCount);
        }
      } else if (!lastVisit) {
        // This case handles if savedStreak exists but lastVisit doesn't (should be rare, means first visit logic wasn't complete)
        // For safety, we can treat this as a new streak or continue if we trust savedStreak
        // Let's assume it's a new day for streak calculation if lastVisit is missing but streak exists.
        setStreak(1); // Or potentially streakCount + 1 if we assume it's the next day
        localStorage.setItem("streak", "1"); // Reset or increment based on assumption
      } else {
        // lastVisit === today
        setStreak(streakCount);
      }
    } else {
      // First visit
      setStreak(1);
      localStorage.setItem("streak", "1");
    }

    // Update last visit date
    localStorage.setItem("lastVisit", today);

    // Get 5 random phrases for the day
    // Ensure usefulPhrases is actually an array before trying to spread and sort
    if (Array.isArray(usefulPhrases)) {
      const randomPhrases = [...usefulPhrases]
        .sort(() => 0.5 - Math.random())
        .slice(0, 5);
      setDailyPhrases(randomPhrases);
    } else {
      console.error("usefulPhrases is not an array or is undefined");
      setDailyPhrases([]); // Set to empty array to avoid errors
    }
  }, []);

  // JSX структура из первого файла, с интеграцией LanguageSelector
  return (
    <PageTransition>
      {/* Классы min-h-screen bg-gray-50 pt-4 pb-16 из второго файла можно добавить сюда, если PageTransition это не переопределяет */}
      {/* Например: <div className="min-h-screen bg-gray-50 pt-4 pb-16 space-y-6"> */}
      {/* Однако, первый файл использует space-y-6 напрямую. Я оставлю структуру первого файла, т.к. она более детализирована */}
      <div className="space-y-6 p-4 md:p-6">
        {" "}
        {/* Добавлены отступы для контента */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold">Language Learner</h1>
          <div className="flex items-center justify-center mt-2 space-x-2">
            <Flame className="text-accent-500" size={24} />{" "}
            {/* Увеличил размер иконки для лучшей видимости */}
            <span className="text-lg font-semibold">Day {streak} streak</span>
          </div>
        </motion.div>
        {/* Интеграция LanguageSelector из второго файла */}
        {/* Можно добавить обертку и стили для LanguageSelector, если необходимо */}
        <div className="my-4">
          {" "}
          {/* Добавлен отступ для LanguageSelector */}
          <LanguageSelector />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Link to="/english">
            <motion.div
              className="aspect-square bg-gradient-to-br from-primary-100 to-primary-200 rounded-ios-lg flex flex-col items-center justify-center p-4 text-center shadow-md hover:shadow-lg transition-shadow" // Добавлены тени и transition
              variants={flagVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <motion.div
                className="w-16 h-16 sm:w-20 sm:h-20 mb-3" // Адаптивный размер
                initial={{ rotate: -5 }}
                animate={{ rotate: 5 }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              >
                <span className="text-5xl sm:text-6xl">🇬🇧</span>
              </motion.div>
              <h2 className="text-lg sm:text-xl font-semibold">English</h2>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                IELTS Preparation
              </p>
            </motion.div>
          </Link>

          <Link to="/spanish">
            <motion.div
              className="aspect-square bg-gradient-to-br from-accent-100 to-accent-200 rounded-ios-lg flex flex-col items-center justify-center p-4 text-center shadow-md hover:shadow-lg transition-shadow" // Добавлены тени и transition
              variants={flagVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <motion.div
                className="w-16 h-16 sm:w-20 sm:h-20 mb-3" // Адаптивный размер
                initial={{ rotate: 5 }}
                animate={{ rotate: -5 }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              >
                <span className="text-5xl sm:text-6xl">🇪🇸</span>
              </motion.div>
              <h2 className="text-lg sm:text-xl font-semibold">Spanish</h2>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                Learn Spanish
              </p>
            </motion.div>
          </Link>
        </div>
        {/* Проверка, есть ли фразы для отображения */}
        {dailyPhrases.length > 0 && (
          <Card className="p-5 mt-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <MessageSquare className="text-primary-500 mr-2" size={22} />
                <h2 className="text-xl font-semibold">Useful Phrases</h2>
              </div>
              {/* Можно сделать кнопку "View All" функциональной, если есть отдельная страница для всех фраз */}
              <Button
                variant="outline"
                size="sm"
                icon={<ChevronRight size={18} />}
                // onClick={() => navigate('/all-phrases')} // Пример навигации
              >
                View All
              </Button>
            </div>

            <div className="space-y-4">
              {dailyPhrases.map((phrase, index) => (
                <motion.div
                  key={index}
                  className="border-b border-gray-200 dark:border-gray-700 pb-3 last:border-0 last:pb-0" // Улучшен цвет разделителя для темной темы, если будет
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 + 0.5 }} // Небольшая общая задержка для появления после основного контента
                >
                  <p className="font-medium text-md sm:text-lg">
                    {phrase.spanish}
                  </p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">
                    {phrase.english}
                  </p>
                </motion.div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </PageTransition>
  );
};

export default HomePage;
