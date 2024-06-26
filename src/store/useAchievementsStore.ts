import { create } from "zustand";

export interface IAchievement {
  id: string;
  isTaken: boolean;
}
export const useAchievementsStore = create<{
  userAchievements: IAchievement[];
  createAchievement: (id: string) => void;
  takeAchievement: (id: string) => void;
  fetchUserAchievements: (chatId: string) => void;
}>((set) => ({
  userAchievements: [],
  fetchUserAchievements: (chatId: string) => {},
  createAchievement: (id) => {
    set((state) => ({
      userAchievements: [
        ...state.userAchievements,
        {
          id,
          isTaken: false,
        },
      ],
    }));
  },
  takeAchievement: (id) => {
    set((state) => ({
      userAchievements: state.userAchievements.map((achievement) => {
        if (achievement.id === id) {
          return {
            ...achievement,
            isTaken: true,
          };
        }
        return achievement;
      }),
    }));
  },
}));
