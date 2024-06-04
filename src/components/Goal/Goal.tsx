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
}

/**
 * User Goal
 */
function Goal({
  description,
  estimatedSuccessRate,
  estimationRationale,
  realityVsGoalAnalysis,
  recommendedActions,
}: IGoalProps) {
  const [isDailyReflectionModalOpen, setIsDailyReflectionModalOpen] =
    useState(false);
  const [isRecommendedActionsModalOpen, setIsRecommendedActionsModalOpen] =
    useState(false);

  const isRecommendedActionsAvailable =
    recommendedActions?.length && recommendedActions?.length > 0;
  const isEstimationReady =
    estimatedSuccessRate && estimationRationale && realityVsGoalAnalysis;
  return (
    <div className={styles.root}>
      <h3 className={styles.heading}>{description}</h3>
      {isEstimationReady && (
        <div className={styles.estimationWrapper}>
          <p className={styles.estimation}>{estimationRationale}</p>
        </div>
      )}
      {isEstimationReady && (
        <div className={styles.estimationWrapper}>
          <p className={styles.estimation}>{realityVsGoalAnalysis}</p>
        </div>
      )}
      <div className={styles.progressWrapper}>
        <Text color="blue" mb={4} size="sm">
          {estimatedSuccessRate
            ? "Estimated Progress"
            : "Airy need 2 days of reflection to estimate progress"}
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
      <Button
        size="xs"
        w="100%"
        mb={8}
        onClick={() => setIsDailyReflectionModalOpen(true)}
      >
        Add Daily Reflection
      </Button>
      <Button
        w="100%"
        size="xs"
        variant="subtle"
        style={{}}
        disabled={!isRecommendedActionsAvailable}
        onClick={() => setIsRecommendedActionsModalOpen(true)}
      >
        {isRecommendedActionsAvailable
          ? "Check Recommended Actions"
          : "Recommended actions will be available tomorrow"}
      </Button>

      <Modal
        title={<b>Daily Reflection</b>}
        opened={isDailyReflectionModalOpen}
        onClose={() => setIsDailyReflectionModalOpen(false)}
      >
        <div style={{ marginBottom: 16 }}>
          This is the place where you can write down anything related to your
          goal. What you have done, what your current feelings, what are
          obstacles you face, what others think about your goal, anything.
        </div>
        <form>
          <Input.Wrapper
            required
            label=""
            style={{ marginBottom: 12, width: "100%" }}
            size="xs"
          >
            <Input
              placeholder="What's happening?"
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
