import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Achievement } from "../types";

interface AchievementState {
  achievements: Achievement[];
  updateAchievement: (id: string, progress: number) => void;
  checkAndUnlockAchievement: (id: string) => boolean;
}

const initialAchievements: Achievement[] = [
  {
    id: "first-lesson",
    title: "First Steps",
    description: "Complete your first lesson",
    icon: "🎯",
    progress: 0,
    target: 1,
    unlocked: false,
    category: "beginner",
  },
  {
    id: "vocabulary-master",
    title: "Vocabulary Master",
    description: "Learn 50 new words",
    icon: "📚",
    progress: 0,
    target: 50,
    unlocked: false,
    category: "intermediate",
  },
  {
    id: "practice-streak",
    title: "Practice Streak",
    description: "Practice for 7 consecutive days",
    icon: "🔥",
    progress: 0,
    target: 7,
    unlocked: false,
    category: "intermediate",
  },
  {
    id: "perfect-score",
    title: "Perfect Score",
    description: "Get 100% in a game session",
    icon: "⭐",
    progress: 0,
    target: 1,
    unlocked: false,
    category: "advanced",
  },
];

export const useAchievementStore = create<AchievementState>()(
  persist(
    (set, get) => ({
      achievements: initialAchievements,

      updateAchievement: (id, progress) =>
        set((state) => ({
          achievements: state.achievements.map((achievement) =>
            achievement.id === id ? { ...achievement, progress } : achievement
          ),
        })),

      checkAndUnlockAchievement: (id) => {
        const achievement = get().achievements.find((a) => a.id === id);
        if (
          achievement &&
          !achievement.unlocked &&
          achievement.progress >= achievement.target
        ) {
          set((state) => ({
            achievements: state.achievements.map((a) =>
              a.id === id ? { ...a, unlocked: true } : a
            ),
          }));
          return true;
        }
        return false;
      },
    }),
    {
      name: "language-learning-achievements",
    }
  )
);
