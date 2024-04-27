import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import WebApp from "@twa-dev/sdk";

export interface UserGoal {
  id?: string;
  description: string;
  dateDue?: string;
}

export interface UserAccount {
  firstName: string;
  lastName: string;
  email: string;
  gender?: "M" | "F" | "N/A";
  favoriteMusicGenre: string;
  birthday: string;
  threadId: string;
  chatId: string;
  paymentPending: boolean;
  goals: UserGoal[];
}

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
    birthday: "",
    threadId: "",
    chatId: "",
    gender: undefined,
    favoriteMusicGenre: "",
    paymentPending: false,
    goals: [],
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
  },
});

export const {
  setIsSignUpOpen,
  setUserTmaInfo,
  setUserAccount,
  setIsUserAccountLoading,
  setIsTmaInfoLoading,
  addUserGoal,
} = userSlice.actions;

export default userSlice.reducer;
