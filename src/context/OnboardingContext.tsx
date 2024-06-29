import React, { createContext, ReactNode, useContext, useState } from "react";

const OnboardingContext = createContext<{
  steps: {
    meta: string;
    stepNumber: number;
    userInfo: string;
  }[];
  currentStep: number;
  nextStep: () => void;
  prevStep: () => void;
  endOnboarding: () => void;
}>({
  steps: [],
  currentStep: 0,
  nextStep: () => {},
  prevStep: () => {},
  endOnboarding: () => {},
});

export const useOnboarding = () => useContext(OnboardingContext);

interface IOnboardingProviderProps {
  steps: {
    meta: string;
    stepNumber: number;
    userInfo: string;
  }[];
  children: ReactNode;
}

export const OnboardingProvider = ({
  children,
  steps,
}: IOnboardingProviderProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const endOnboarding = () => {
    setCurrentStep(0);
  };

  console.log("STEPS", { steps });
  return (
    <OnboardingContext.Provider
      value={{
        steps,
        currentStep,
        nextStep,
        prevStep,
        endOnboarding,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};
