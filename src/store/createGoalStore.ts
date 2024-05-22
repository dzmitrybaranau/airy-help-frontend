import { create } from "zustand";

export const createGoalStore = create<{
  currentStep: number;
  setCurrentStep: (step: number) => void;
  isCreatingGoal: boolean;
}>((set) => ({
  currentStep: 1,
  setCurrentStep: (step: number) => set({ currentStep: step }),
  isCreatingGoal: false,
}));
