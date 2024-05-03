import React from "react";
import styles from "./CreateGoal.module.scss";
import { IconInfoCircle } from "@tabler/icons-react";
import { Button, Input, Loader } from "@mantine/core";
import { useCreateGoal } from "../../hooks/useCreateGoal";

export interface ICreateGoalProps {
  userId: string;
}

/**
 * Create Goals Form
 */
function CreateGoal({ userId }: ICreateGoalProps) {
  const { form, handleSubmit, isCreatingGoal } = useCreateGoal(userId);
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
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Input.Wrapper
          required
          label="Your goal description"
          style={{ marginBottom: 12 }}
          size="xs"
          error={form.errors.description && "Description is required"}
        >
          <Input
            {...form.getInputProps("description")}
            placeholder="Lose weight..."
            disabled={isCreatingGoal}
            size="xs"
          />
        </Input.Wrapper>
        <Button
          variant="default"
          size="xs"
          color="Gray"
          disabled={isCreatingGoal}
          type="submit"
          loading={isCreatingGoal}
        >
          Create
        </Button>
      </form>
    </div>
  );
}

export default CreateGoal;
