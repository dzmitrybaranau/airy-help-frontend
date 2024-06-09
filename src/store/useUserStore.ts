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
  addUserReflection: (reflection: string) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  userAccount: undefined,
  isUserLoading: true,
  isTmaInfoLoading: true,
  userTmaInfo: undefined,
  fetchUserAccount: async (chatId: string) => {
    const user = await getUser({ chatId });
    set({
      isUserLoading: false,
      userAccount: user,
    });
  },
  setUserAccount: (userAccount: UserAccount) => {
    set({ userAccount });
  },
  setUserTmaInfo: (userTmaInfo: typeof WebApp.initDataUnsafe) => {
    set({ userTmaInfo, isTmaInfoLoading: false });
  },
  addUserGoal: (goal: UserGoal) => {
    set((state) => ({
      userAccount: {
        ...state.userAccount!,
        goals: [...(state.userAccount?.goals ?? []), goal],
      },
    }));
  },
  addUserReflection: (reflection: string) => {
    set((state) => ({
      userAccount: {
        ...state.userAccount!,
        dailyReflection: [
          ...(state.userAccount?.dailyReflection ?? []),
          reflection,
        ],
      },
    }));
  },
}));
