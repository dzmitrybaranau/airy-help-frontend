import React from "react";
import {Input, Modal, Button, Text, Textarea} from "@mantine/core";
import { useDailyReflection } from "../../hooks/useDailyReflection";
import { useUserStore } from "../../store";

export interface IDailyReflectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * DailyReflectionModal
 */
function DailyReflectionModal({ isOpen, onClose }: IDailyReflectionModalProps) {
  const { form, handleSubmit } = useDailyReflection();
  const userAccount = useUserStore((state) => state.userAccount);

  if (!userAccount) return null;

  return (
    <Modal title={<b>Daily Reflection</b>} opened={isOpen} onClose={onClose}>
      <div style={{ marginBottom: 16 }}>
        This is the place where you can write down anything related to your
        goal. What you have done, what your current feelings, what are obstacles
        you face, what others think about your goal, anything.
      </div>
      <form onSubmit={form.onSubmit(handleSubmit)}>
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
      <div style={{ marginTop: 20 }}>
        <Text fw={500}>Previous Reflections:</Text>
        {userAccount?.dailyReflection?.map((reflection, index) => (
          <Text key={index} size="sm" style={{ marginTop: 8 }}>
            {reflection}
          </Text>
        ))}
      </div>
    </Modal>
  );
}

export default DailyReflectionModal;
