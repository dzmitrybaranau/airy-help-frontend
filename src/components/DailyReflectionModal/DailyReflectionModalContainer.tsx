import React from "react";
import { Input, Modal, Button, Text, Textarea } from "@mantine/core";
import { useDailyReflection } from "../../hooks/useDailyReflection";
import { useUserStore } from "../../store";
import DailyReflectionModal from "./DailyReflectionModal";

export interface IDailyReflectionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * DailyReflectionModal
 */
function DailyReflectionModalContainer({
  isOpen,
  onClose,
}: IDailyReflectionModalProps) {
  const { form, handleSubmit, userAccount } = useDailyReflection();

  if (!userAccount) return null;

  return (
    <DailyReflectionModal
      isOpen={isOpen}
      onClose={onClose}
      form={form}
      userAccount={userAccount}
      onSubmit={handleSubmit}
    />
  );
}

export default DailyReflectionModalContainer;
