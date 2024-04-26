import React from "react";
import styles from "./Goal.module.scss";
import { Button, Progress } from "@mantine/core";

export interface IGoalProps {
  description: string;
  timeEstimates?: string;
  successPrediction?: string;
  progressEstimation?: number;
}

/**
 * User Goal
 */
function Goal({
  description,
  progressEstimation = 20,
  timeEstimates,
  successPrediction,
}: IGoalProps) {
  return (
    <div className={styles.root}>
      <h3 className={styles.heading}>{description}</h3>
      {timeEstimates && (
        <div className={styles.estimationWrapper}>
          <p className={styles.estimation}>Time prediction: {timeEstimates}</p>
          <p className={styles.estimation}>
            Success prediction: {successPrediction}
          </p>
        </div>
      )}
      {progressEstimation && (
        <div className={styles.progressWrapper}>
          <Progress
            style={{
              height: "10px",
              width: "100%",
            }}
            title="Estimated Progress"
            value={progressEstimation}
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
