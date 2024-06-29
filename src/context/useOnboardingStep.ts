import { useEffect } from 'react';
import { useOnboarding } from './OnboardingContext';

export const useOnboardingStep = (stepIndex, elementRef) => {
    const { currentStep, steps, nextStep, prevStep, endOnboarding } = useOnboarding();

    useEffect(() => {
        if (currentStep === stepIndex && elementRef.current) {
            elementRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [currentStep, stepIndex, elementRef]);

    return {
        isActive: currentStep === stepIndex,
        nextStep,
        prevStep,
        endOnboarding,
        step: steps[stepIndex],
    };
};
