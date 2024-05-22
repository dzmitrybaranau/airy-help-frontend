import { create } from "zustand";

export enum CREATE_GOAL_STEPS {
  INITIAL = "INITIAL",
  WHY = "WHY",
}

export const useCreateGoalStore = create<{
  currentStep: CREATE_GOAL_STEPS;
  setCurrentStep: (step: CREATE_GOAL_STEPS) => void;
  isCreatingGoal: boolean;
  setIsCreatingGoal: (isCreatingGoal: boolean) => void;
}>((set) => ({
  currentStep: CREATE_GOAL_STEPS.INITIAL,
  setCurrentStep: (step: CREATE_GOAL_STEPS) => set({ currentStep: step }),
  isCreatingGoal: false,
  setIsCreatingGoal: (isCreatingGoal: boolean) => set({ isCreatingGoal }),
}));
