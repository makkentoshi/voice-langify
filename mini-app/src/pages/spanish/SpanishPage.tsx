// src/pages/spanish/SpanishPage.tsx
import React, { useMemo } from "react"; // Убрали useState, если activeTab не нужен
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import PageTransition from "@/components/ui/PageTransition";

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

import { ProgressBar as UiProgressBar } from "../../components/ui/ProgressBar";
import { Button } from "@/components/ui/new/Button";
import {Card} from "@/components/ui/new/Card";
import { useProgressStore } from "../../stores/progressStore";
import { useTelegramInit } from "../../hooks/useTelegramInit";

interface Module {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: "primary" | "secondary" | "accent" | "warning" | "danger" | "info";
  to: string;
  progressKey?: "vocab" | "grammar" | "conversation";
}

const colorVariants = {
  primary: "bg-primary-100 text-primary-500",
  secondary: "bg-secondary-100 text-secondary-500",
  accent: "bg-accent-100 text-accent-500",
  warning: "bg-warning-100 text-warning-500",
  danger: "bg-danger-100 text-danger-500",
  info: "bg-blue-100 text-blue-500", // Пример для 'info'
};

const SpanishPage: React.FC = () => {
  // Логика из второго файла: инициализация Telegram
  useTelegramInit("#FFFFFFFF", false); // Используем цвет из второго файла

  // Логика из второго файла: получение прогресса
  const { progress } = useProgressStore();

  // Данные модулей из первого файла, адаптированные и расширенные
  const modules: Module[] = [
    {
      icon: <BookOpen size={24} />,
      title: "Topics",
      description: "Learn by themes",
      color: "primary",
      to: "/spanish/topics",
    },
    {
      icon: <MessageCircle size={24} />,
      title: "Vocabulary",
      description: "Essential words & flashcards",
      color: "accent",
      to: "/spanish/flashcards",
      progressKey: "vocab",
    },
    {
      icon: <Compass size={24} />,
      title: "Conversation",
      description: "Daily phrases",
      color: "secondary",
      to: "/spanish/conversation",
      progressKey: "conversation",
    },
    {
      icon: <GraduationCap size={24} />,
      title: "Grammar",
      description: "Spanish tenses",
      color: "warning",
      to: "/spanish/grammar",
      progressKey: "grammar",
    },
    {
      icon: <Gamepad2 size={24} />,
      title: "Game",
      description: "Test your Spanish",
      color: "danger",
      to: "/spanish/game",
    },
  ];

  // Вычисляемые значения прогресса из второго файла
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

  const percentConversation = useMemo(
    () => {
      // Заменить на реальные данные из useProgressStore, если они появятся
      // const conversationProgress = progress.spanish.conversationCompleted || 0;
      // const conversationTotal = progress.spanish.conversationTotal || 1; // избегаем деления на 0
      // return (conversationProgress / conversationTotal) * 100;
      return 60; // Placeholder
    },
    [
      /* progress.spanish */
    ]
  );

  const getProgressPercent = (
    key?: "vocab" | "grammar" | "conversation"
  ): number => {
    switch (key) {
      case "vocab":
        return percentVocab;
      case "grammar":
        return percentGrammar;
      case "conversation":
        return percentConversation; // Пример
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
      // case 'conversation':
      // return `${progress.spanish.conversationCompleted}/${progress.spanish.conversationTotal}`;
      default:
        return "";
    }
  };

  return (
    <PageTransition>
      <div className="space-y-6 p-4 md:p-6">
        {" "}
        {/* Добавлены отступы */}
        <motion.div
          initial={{ opacity: 0, y: -20 }} // Изменена анимация для заголовка
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between mb-6" // justify-between для кнопки назад
        >
          <div className="flex items-center">
            <span className="text-4xl mr-3">🇪🇸</span> 
            <h1 className="text-2xl font-bold">Spanish Learning</h1>{" "}
            {/* Название из второго файла */}
          </div>
          <Link to="/" className="text-gray-600 hover:text-primary-500">
            {" "}
            {/* Кнопка назад */}
            <ArrowLeft size={24} />
          </Link>
        </motion.div>
        {/* Секция быстрого старта из второго файла, стилизованная */}
        <Card className="p-4 mb-6 shadow-sm">
          <h2 className="text-lg font-semibold mb-3 text-gray-700">
            Quick Start
          </h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/spanish/flashcards" className="flex-1">
              <Button fullWidth variant="primary">
                {" "}
                {/* Используем UiButton и его варианты */}
                Start Flashcards
              </Button>
            </Link>
            <Link to="/spanish/grammar" className="flex-1">
              <Button variant="outline" fullWidth>
                Learn Grammar
              </Button>
            </Link>
          </div>
        </Card>
        {/* Список модулей из первого файла, но с динамическим прогрессом */}
        <h2 className="text-xl font-semibold text-gray-800 pt-2">
          Course Content
        </h2>
        <div className="space-y-4">
          {modules.map((module, index) => (
            <Link to={module.to} key={index} className="block">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
              >
                <Card
                  className="p-5 hover:shadow-lg transition-shadow duration-200 shadow-md" // Улучшен hover эффект
                  interactive
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div
                        className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full ${
                          colorVariants[
                            module.color as keyof typeof colorVariants
                          ]
                        } flex items-center justify-center mr-3 sm:mr-4`}
                      >
                        {React.cloneElement(module.icon as React.ReactElement, {
                          size: 22,
                        })}{" "}
                        {/* Убедимся, что размер иконки внутри круга корректен */}
                      </div>
                      <div>
                        <h2 className="font-semibold text-md sm:text-lg">
                          {module.title}
                        </h2>
                        <p className="text-gray-500 text-xs sm:text-sm">
                          {module.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {module.progressKey &&
                        getProgressFraction(module.progressKey) && (
                          <span className="text-xs sm:text-sm text-gray-500 mr-2">
                            {getProgressFraction(module.progressKey)}
                          </span>
                        )}
                      <ChevronRight className="text-gray-400" size={20} />
                    </div>
                  </div>
                  {module.progressKey &&
                    getProgressPercent(module.progressKey) > 0 && (
                      <div className="mt-3">
                        <UiProgressBar
                          progress={getProgressPercent(module.progressKey)}
                          color={
                            module.color === "primary"
                              ? "bg-primary-500"
                              : module.color === "accent"
                              ? "bg-accent-500"
                              : module.color === "secondary"
                              ? "bg-secondary-500"
                              : module.color === "warning"
                              ? "bg-warning-500"
                              : module.color === "danger"
                              ? "bg-danger-500"
                              : "bg-gray-500"
                          }
                        />
                      </div>
                    )}
                </Card>
              </motion.div>
            </Link>
          ))}
          {/* "Coming soon" секция из второго файла, если нужна */}
          <div className="p-4 bg-white rounded-lg shadow-md flex justify-between items-center opacity-60 cursor-not-allowed">
            <div className="flex items-center">
              <div
                className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full ${colorVariants.info} flex items-center justify-center mr-3 sm:mr-4`}
              >
                <MessageSquare size={22} className="text-blue-500" />
              </div>
              <div>
                <h3 className="font-semibold text-md sm:text-lg">
                  Practice Exercises
                </h3>
                <p className="text-gray-500 text-xs sm:text-sm">
                  Interactive dialogues & more
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-xs sm:text-sm text-gray-500 mr-2">
                Coming soon
              </span>
              <ChevronRight className="text-gray-400" size={20} />
            </div>
          </div>
        </div>
        {/* Отображение общего прогресса (адаптировано из первого файла, но с данными из useProgressStore) */}
        <Card className="p-5 mt-8">
          <h3 className="font-semibold text-lg mb-4">
            Overall Spanish Progress
          </h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Vocabulary</span>
                <span className="text-sm text-accent-500 font-medium">
                  {progress.spanish.flashcardsLearned}/
                  {progress.spanish.flashcardsTotal} ({percentVocab.toFixed(0)}
                  %)
                </span>
              </div>
              <UiProgressBar progress={percentVocab} color="bg-accent-500" />
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Grammar</span>
                <span className="text-sm text-warning-500 font-medium">
                  {progress.spanish.grammarCompleted}/
                  {progress.spanish.grammarTotal} ({percentGrammar.toFixed(0)}%)
                </span>
              </div>
              <UiProgressBar progress={percentGrammar} color="bg-warning-500" />
            </div>

            {/* Пример для Conversation, если будет отслеживаться */}
            {/* <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">Conversation</span>
                <span className="text-sm text-secondary-500 font-medium">{percentConversation.toFixed(0)}%</span>
              </div>
              <UiProgressBar progress={percentConversation} colorClassName="bg-secondary-500" />
            </div> */}
          </div>
        </Card>
        {/* Learning Tips из второго файла */}
        <Card className="p-5 mt-8 shadow-sm">
          <h2 className="text-lg font-semibold mb-3 text-gray-700">
            Learning Tip
          </h2>
          <div className="p-3 bg-green-50 rounded-lg">
            <h3 className="font-medium text-green-700 mb-1">Today's Tip ✨</h3>
            <p className="text-gray-700 text-sm">
              Practice speaking Spanish out loud every day, even if just for 5
              minutes. Repetition is key!
            </p>
          </div>
        </Card>
      </div>
    </PageTransition>
  );
};

export default SpanishPage;
