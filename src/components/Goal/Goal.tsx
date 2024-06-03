import React, { useState } from "react";
import styles from "./Goal.module.scss";
import {
  Button,
  Input,
  List,
  ListItem,
  Modal,
  Progress,
  Text,
} from "@mantine/core";

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
  const [isDailyReflectionModalOpen, setIsDailyReflectionModalOpen] =
    useState(false);
  const [isRecommendedActionsModalOpen, setIsRecommendedActionsModalOpen] =
    useState(false);
  return (
    <div className={styles.root}>
      <h3 className={styles.heading}>{description}</h3>
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
            {estimatedSuccessRate
              ? "Estimated Progress"
              : "You need to add 2 daily reflections to see the progress"}
          </Text>
          <Progress
            style={{
              height: "10px",
              width: "100%",
            }}
            title="Estimated Progress"
            value={estimatedSuccessRate ? Number(estimatedSuccessRate) : 0}
          />
        </div>
      )}
      <Button
        size="xs"
        disabled={!recommendedActions}
        mb={8}
        onClick={() => setIsDailyReflectionModalOpen(true)}
      >
        Add Daily Reflection
      </Button>
      {recommendedActions && (
        <Button
          size="xs"
          variant="subtle"
          style={{}}
          disabled={!recommendedActions}
          onClick={() => setIsRecommendedActionsModalOpen(true)}
        >
          Check Recommended Actions
        </Button>
      )}

      <Modal
        title={<b>Daily Reflection</b>}
        opened={isDailyReflectionModalOpen}
        onClose={() => setIsDailyReflectionModalOpen(false)}
      >
        <form>
          <Input.Wrapper
            required
            label="Tell anything, what you did, your feelings, anything you want"
            style={{ marginBottom: 12, width: "100%" }}
            size="xs"
          >
            <Input
              placeholder="I did..."
              size="xs"
              style={{
                width: "100%",
              }}
            />
          </Input.Wrapper>
        </form>
      </Modal>

      <Modal
        title={<b>Recommended Actions</b>}
        opened={isRecommendedActionsModalOpen}
        onClose={() => setIsRecommendedActionsModalOpen(false)}
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
