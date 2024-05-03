import React from "react";
import styles from "./Goal.module.scss";
import { Button, Progress } from "@mantine/core";

export interface IGoalProps {
  description: string;
  estimationRationale?: string;
  estimatedSuccessRate?: number;
  recommendedActions?: string[];
  moreQuestionsToAsk?: {
    question: string;
    reasonToAsk: string;
    importanceForSuccess: number;
  }[];
}

/**
 * User Goal
 */
function Goal({
  description,
  estimatedSuccessRate,
  estimationRationale,
  recommendedActions,
  moreQuestionsToAsk,
}: IGoalProps) {
  return (
    <div className={styles.root}>
      <h3 className={styles.heading}>{description}</h3>
      {estimationRationale && (
        <div className={styles.estimationWrapper}>
          <p className={styles.estimation}>
            Success prediction: {estimationRationale}
          </p>
        </div>
      )}
      {estimatedSuccessRate && (
        <div className={styles.progressWrapper}>
          <Progress
            style={{
              height: "10px",
              width: "100%",
            }}
            title="Estimated Progress"
            value={Number(estimatedSuccessRate)}
          />
        </div>
      )}
      <Button
        color="Gray"
        size="xs"
        variant="light"
        style={{
          background: "#F1F3F5",
          color: "#000",
          fontWeight: 400,
        }}
      >
        Check Detailed Plan
      </Button>
    </div>
  );
}

export default Goal;
