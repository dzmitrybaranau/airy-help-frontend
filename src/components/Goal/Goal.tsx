import React, { useState } from "react";
import styles from "./Goal.module.scss";
import { Button, List, ListItem, Modal, Progress, Text } from "@mantine/core";

export interface IGoalProps {
  description: string;
  estimationRationale?: string;
  estimatedSuccessRate?: string;
  recommendedActions?: string[];
  realityVsGoalAnalysis?: string;
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
  realityVsGoalAnalysis,
}: IGoalProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className={styles.root}>
      <h3 className={styles.heading}>{description}</h3>
      {!recommendedActions && (
        <div
          className={styles.estimation}
          style={{ marginBottom: "4px !important" }}
        >
          While under development goal success prediction is done once a day
        </div>
      )}
      {estimationRationale && (
        <div className={styles.estimationWrapper}>
          <p className={styles.estimation}>{estimationRationale}</p>
        </div>
      )}
      {realityVsGoalAnalysis && (
        <div className={styles.estimationWrapper}>
          <p className={styles.estimation}>{realityVsGoalAnalysis}</p>
        </div>
      )}
      {estimatedSuccessRate && (
        <div className={styles.progressWrapper}>
          <Text color="blue" mb={4} size="sm">
            Estimated Progress
          </Text>
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
        size="xs"
        disabled={!recommendedActions}
        mb={8}
        onClick={() => setIsModalOpen(true)}
      >
        Add Daily Reflection
      </Button>
      {recommendedActions && (
        <Button
          size="xs"
          variant="subtle"
          style={{
          }}
          disabled={!recommendedActions}
          onClick={() => setIsModalOpen(true)}
        >
          Check Recommended Actions
        </Button>
      )}
      <Modal
        title={<b>Recommended Actions</b>}
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <List style={{ width: "80%" }}>
          {recommendedActions?.map((action, index) => (
            <ListItem key={index} style={{ marginBottom: "6px" }}>
              {action}
            </ListItem>
          ))}
        </List>
      </Modal>
    </div>
  );
}

export default Goal;
