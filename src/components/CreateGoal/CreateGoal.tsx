import React from "react";
import styles from "./CreateGoal.module.scss";
import { IconInfoCircle } from "@tabler/icons-react";
import { Input, TextInput } from "@mantine/core";
import { useCreateGoal } from "../../hooks/useCreateGoal";
export interface ICreateGoalProps {}

/**
 * Create Goals Form
 */
function CreateGoal(props: ICreateGoalProps) {
  /* TODO: Let user create goal and after the goal is created - set this goal default and ask
      if user wants to go to bot to make it more clear */

  const { form } = useCreateGoal();
  return (
    <div className={styles.root}>
      <h2 className={styles.title}>Let’s create your first goals 🙌🏼</h2>
      <div className={styles.createGoalHint}>
        <IconInfoCircle
          color="#24a1de"
          style={{ opacity: "0.9", marginRight: 4 }}
        />
        <p>
          Start with any goal on your mind, Airy will help you make it more
          concrete.
        </p>
      </div>
      <Input.Wrapper required label="Your goal description">
        <Input
          {...form.getInputProps("description")}
          placeholder="Lose weight..."
        />
      </Input.Wrapper>
    </div>
  );
}

export default CreateGoal;
