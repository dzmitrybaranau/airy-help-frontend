import React, { useState } from "react";
import { useUserStore } from "../../store";

export interface IGoalContainerProps {}

/**
 * Goal Container
 */
function GoalContainer(props: IGoalContainerProps) {
  const userAccount = useUserStore((state) => state.userAccount);

  const [isDailyReflectionModalOpen, setIsDailyReflectionModalOpen] =
    useState(false);
  const [isRecommendedActionsModalOpen, setIsRecommendedActionsModalOpen] =
    useState(false);

  if (!userAccount) {
    return null;
  }
  const userGoal = userAccount?.goals?.[0];

  const description = userGoal?.name;
  const estimatedSuccessRate =
    userAccount?.goalSuccessPrediction?.estimatedSuccessRate;
  const estimationRationale =
    userAccount?.goalSuccessPrediction?.estimationRationale;
  const realityVsGoalAnalysis =
    userAccount?.goalSuccessPrediction?.realityVsGoalAnalysis;
  const recommendedActions =
    userAccount?.goalSuccessPrediction?.recommendedActions;

  const isRecommendedActionsAvailable =
    recommendedActions?.length && recommendedActions?.length > 0;
  const isEstimationReady =
    estimatedSuccessRate && estimationRationale && realityVsGoalAnalysis;
  return <div> </div>;
}

export default GoalContainer;
