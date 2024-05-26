import React from "react";
import { useUserStore } from "../../store";

export interface IOnboardingPageProps {}

/**
 * Onboarding
 */
function OnboardingPage(props: IOnboardingPageProps) {
  const { userAccount } = useUserStore();

  return <div>Onboarding Page</div>;
}

export default OnboardingPage;
