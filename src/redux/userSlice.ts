import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import WebApp from "@twa-dev/sdk";
import { UserAccount, UserGoal } from "../types/user.type";

interface UserState {
  userAccount: UserAccount;
  isTmaInfoLoading: boolean;
  isUserLoading: boolean;
  userTmaInfo: typeof WebApp.initDataUnsafe | null;
  isSignUpOpen: boolean;
}

const initialState: UserState = {
  userAccount: {
    firstName: "",
    lastName: "",
    email: "",
    birthdayYear: undefined,
    birthdayMonth: undefined,
    birthdayDay: undefined,
    threadId: "",
    chatId: "",
    gender: undefined,
    favoriteMusicGenre: "",
    paymentPending: false,
    goals: [],
    onboarded: false,
  },
  isUserLoading: true,
  isTmaInfoLoading: true,
  userTmaInfo: null,
  isSignUpOpen: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserAccount: (state, action: PayloadAction<UserAccount>) => {
      state.userAccount = action.payload;
    },
    setIsUserAccountLoading: (state, action: PayloadAction<boolean>) => {
      state.isUserLoading = action.payload;
    },
    setIsTmaInfoLoading: (state, action: PayloadAction<boolean>) => {
      state.isTmaInfoLoading = action.payload;
    },
    setUserTmaInfo: (
      state,
      action: PayloadAction<typeof WebApp.initDataUnsafe | null>,
    ) => {
      state.userTmaInfo = action.payload;
    },
    setIsSignUpOpen: (state, action: PayloadAction<boolean>) => {
      state.isSignUpOpen = action.payload;
    },
    addUserGoal: (state, action: PayloadAction<UserGoal>) => {
      state.userAccount.goals.push(action.payload);
    },
    setGoalSuccessEstimation: (state, action: PayloadAction<UserGoal>) => {
      state.userAccount.goals.find(
        (goal) => goal.id === action.payload.id,
      )!.prediction = action.payload.prediction;
    },
  },
});

export const {
  setIsSignUpOpen,
  setUserTmaInfo,
  setUserAccount,
  setIsUserAccountLoading,
  setIsTmaInfoLoading,
  addUserGoal,
  setGoalSuccessEstimation,
} = userSlice.actions;

export default userSlice.reducer;
