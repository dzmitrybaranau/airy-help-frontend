import React from "react";
import { useAchievementsStore } from "../../store";
import Achievement from "./Achievement";

export interface IAchievementContainerProps {}

/**
 * Achievement
 */
function AchievementContainer() {
  const { userAchievements, takeAchievement } = useAchievementsStore();

  const cardToRender = userAchievements.find(({ isTaken }) => !isTaken);
  if (!cardToRender) {
    return null;
  }

  const isModalOpen =
    Boolean(userAchievements.find((achievement) => !achievement.isTaken)) &&
    !!cardToRender;

  return (
    <Achievement
      takeAchievement={takeAchievement}
      cardToRender={cardToRender}
      isOpen={isModalOpen}
    />
  );
}

export default AchievementContainer;
