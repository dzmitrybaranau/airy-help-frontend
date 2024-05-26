import React from "react";
import { onboardingJSON } from "airy-help-utils";

export interface IOnboardingQuestionsProps {
  questions: typeof onboardingJSON;
}

/**
 * Onboarding Questions Inputs
 */
function OnboardingQuestions(props: IOnboardingQuestionsProps) {
  const { questions } = props;
  return <div></div>;
}

export default OnboardingQuestions;
