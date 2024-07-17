import React from "react";
import { Button, Input, Modal, Text, Textarea } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { UserAccount, UserGoal } from "airy-help-utils";

export interface IDailyReflectionModalProps extends Pick<UserGoal, "journal"> {
  isOpen: boolean;
  onClose: () => void;
  form: UseFormReturnType<{ reflection: string }>;
  onSubmit: () => Promise<void>;
}

/**
 * DailyReflectionModal
 */
function GoalJournalModal({
  isOpen,
  onClose,
  form,
  onSubmit,
  journal,
}: IDailyReflectionModalProps) {
  return (
    <Modal title={<b>Daily Reflection</b>} opened={isOpen} onClose={onClose}>
      <div style={{ marginBottom: 16 }}>
        This is the place where you can write down anything related to your
        goal. What you have done, what your current feelings, what are obstacles
        you face, what others think about your goal, anything.
      </div>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Input.Wrapper
          required
          label="Your Reflection"
          style={{ marginBottom: 12, width: "100%" }}
          size="xs"
        >
          <Textarea
            {...form.getInputProps("reflection")}
            placeholder="What's happening?"
            size="xs"
            style={{
              width: "100%",
            }}
          />
        </Input.Wrapper>
        <Button type="submit" variant="light" size="xs" color="blue">
          Submit
        </Button>
      </form>
      {journal?.map(({ reflection }, index) => (
        <div style={{ marginTop: 20 }}>
          <Text fw={500}>Previous Reflections:</Text>
          <Text key={index} size="sm" style={{ marginTop: 8 }}>
            {reflection}
          </Text>
        </div>
      ))}
    </Modal>
  );
}

export default GoalJournalModal;
