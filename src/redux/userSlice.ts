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
  birthday: string;
  threadId: string;
  chatId: string;
  paymentPending: boolean;
  goals: UserGoal[];
}

interface UserState {
  userAccount: UserAccount;
  isLoading: boolean;
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
    paymentPending: false,
    goals: [],
  },
  isLoading: true,
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
      state.isLoading = action.payload;
    },
    setUserTmaInfo: (
      state,
      action: PayloadAction<typeof WebApp.initDataUnsafe>,
    ) => {
      state.userTmaInfo = action.payload;
    },
    setIsSignUpOpen: (state, action: PayloadAction<boolean>) => {
      state.isSignUpOpen = action.payload;
    },
  },
});

export const {
  setIsSignUpOpen,
  setUserTmaInfo,
  setUserAccount,
  setIsUserAccountLoading,
} = userSlice.actions;

export default userSlice.reducer;
