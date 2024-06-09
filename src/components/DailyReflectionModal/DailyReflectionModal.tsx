import React from "react";
import { Input, Modal } from "@mantine/core";
import { useUserStore } from "../../store";

export interface IDailyReflectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * DailyReflectionModal
 */
function DailyReflectionModal({ isOpen, onClose }: IDailyReflectionModalProps) {
    // TODO:
  const userAccount = useUserStore((state) => state.userAccount);
  if (
    !userAccount?.dailyReflection?.length ||
    userAccount?.dailyReflection?.length === 0
  ) {
    return null;
  }
  return (
    <Modal title={<b>Daily Reflection</b>} opened={isOpen} onClose={onClose}>
      <div style={{ marginBottom: 16 }}>
        This is the place where you can write down anything related to your
        goal. What you have done, what your current feelings, what are obstacles
        you face, what others think about your goal, anything.
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
  );
}

export default DailyReflectionModal;
