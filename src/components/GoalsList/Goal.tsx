import React from "react";
import styles from "./Goal.module.scss";
import { Button, Text, Title } from "@mantine/core";
import GoalJournalModalContainer from "../GoalJournal";
import { UserGoal } from "airy-help-utils";

interface IGoalProps extends Partial<UserGoal> {
  onJournalOpen: () => void;
  onCloseJournal: () => void;
  isJournalOpen: boolean;
}

/**
 * User Goal
 */
function Goal({
  id,
  name,
  onJournalOpen,
  isJournalOpen,
  onCloseJournal,
}: IGoalProps) {
  return (
    <div className={styles.root}>
      <Title mb={8} c="#fff" lh="32px" fw={900}>
        {name}
      </Title>
      {/*<Text c="#fff" fw={600} mb={12}>
        App where people can set any goals they want, bet money against
        themselves and show as a social proof their commitment to achieve what
        they want
      </Text>*/}
      <Text c="#fff" fw={600} mb={6}>
        Objectives: <u></u>
      </Text>
      <Text c="#fff" fw={600}>
        Deadline: <u>August 21</u>
      </Text>
      <Button
        size="sm"
        w="100%"
        onClick={onJournalOpen}
        bg="radial-gradient(#1c202f, #0d132d)"
      >
        Journal Progress
      </Button>

      <GoalJournalModalContainer
        isOpen={isJournalOpen}
        onClose={onCloseJournal}
        goalId={id as string}
      />
    </div>
  );
}

export default Goal;
