import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import WebApp from "@twa-dev/sdk";

export interface UserGoal {
  description: string;
  dateDue?: string;
}

export interface UserAccount {
  id: string;
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
  userAccount: UserAccount | null;
  isLoading: boolean;
  userTmaInfo: typeof WebApp.initDataUnsafe;
  isSignUpOpen: boolean;
  isUserInfoOpen: boolean;
}

const initialState: UserState = {
  userAccount: null,
  isLoading: true,
  userTmaInfo: null,
  isSignUpOpen: true,
  isUserInfoOpen: true,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserAccount: (state, action: PayloadAction<UserAccount | null>) => {
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
    setIsUserInfoOpen: (state, action: PayloadAction<boolean>) => {
      state.isUserInfoOpen = action.payload;
    },
  },
});

export const {
  setIsSignUpOpen,
  setUserTmaInfo,
  setUserAccount,
  setIsUserAccountLoading,
  setIsUserInfoOpen,
} = userSlice.actions;

export default userSlice.reducer;
