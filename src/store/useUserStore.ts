import { create } from "zustand";
import { UserAccount, UserGoal } from "airy-help-utils";
import WebApp from "@twa-dev/sdk";
import { getUser } from "../utils/user/getUser";

interface UserStore {
  userAccount?: UserAccount;
  isTmaInfoLoading: boolean;
  isUserLoading: boolean;
  userTmaInfo?: typeof WebApp.initDataUnsafe;
  fetchUserAccount: (chatId: string) => Promise<void>;
  setUserTmaInfo: (userTmaInfo: typeof WebApp.initDataUnsafe) => void;
  setUserAccount: (userAccount: UserAccount) => void;
  addUserGoal: (goal: UserGoal) => void;
  addJournalReflection: (reflection: {
    reflection: string;
    timestamp: string;
    goalId: string;
  }) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  userAccount: undefined,
  isUserLoading: true,
  isTmaInfoLoading: true,
  userTmaInfo: undefined,

  fetchUserAccount: async (chatId: string) => {
    set({ isUserLoading: true });
    try {
      const user = await getUser({ chatId });
      set({ userAccount: user, isUserLoading: false });
    } catch (error) {
      console.error("Failed to fetch user account:", error);
      set({ isUserLoading: false });
    }
  },

  setUserAccount: (userAccount: UserAccount) => {
    set({ userAccount });
  },

  setUserTmaInfo: (userTmaInfo: typeof WebApp.initDataUnsafe) => {
    set({ userTmaInfo, isTmaInfoLoading: false });
  },

  addUserGoal: (goal: UserGoal) => {
    set((state) => {
      const updatedGoals = [...(state.userAccount?.goals ?? []), goal];
      return {
        userAccount: {
          ...state.userAccount!,
          goals: updatedGoals,
        },
      };
    });
  },

  addJournalReflection: (reflection: {
    reflection: string;
    timestamp: string;
    goalId: string;
  }) => {
    set((state) => {
      const updatedGoals = state.userAccount?.goals.map((goal) => {
        if (goal.id === reflection.goalId) {
          return {
            ...goal,
            journal: [reflection, ...goal.journal],
          };
        }
        return goal;
      });

      return {
        userAccount: {
          ...state.userAccount!,
          goals: updatedGoals ?? [],
        },
      };
    });
  },
}));
