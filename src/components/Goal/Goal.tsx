import React, { useState } from "react";
import styles from "./Goal.module.scss";
import { Button, Modal, Progress } from "@mantine/core";
import { useGoalSuccessPrediction } from "../../hooks/useGoalSuccessPrediction";

export interface IGoalProps {
  description: string;
  estimationRationale?: string;
  estimatedSuccessRate?: string;
  recommendedActions?: string[];
  moreQuestionsToAsk?: {
    question: string;
    reasonToAsk: string;
    importanceForSuccess: string;
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
  const { isLoadingPrediction } = useGoalSuccessPrediction();
  const [isModalOpen, setIsModalOpen] = useState(true);
  return (
    <div className={styles.root}>
      <h3 className={styles.heading}>{description}</h3>
      {estimationRationale && (
        <div className={styles.estimationWrapper}>
          <p className={styles.estimation}>{estimationRationale}</p>
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
        disabled={
          isLoadingPrediction || !recommendedActions || !moreQuestionsToAsk
        }
        loading={isLoadingPrediction}
        onClick={() => setIsModalOpen(true)}
      >
        Check Recommended Actions
      </Button>
      <Modal opened={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Modal.Title>Recommended Actions</Modal.Title>
        <Modal.Body>
          {recommendedActions?.map((action, index) => (
            <p key={index}>{action}</p>
          ))}
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Goal;
