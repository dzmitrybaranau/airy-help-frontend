import React from "react";
import { useDailyReflection } from "../../hooks/useDailyReflection";
import GoalJournalModal from "./GoalJournalModal";

export interface IDailyReflectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  goalId: string;
}

/**
 * DailyReflectionModal
 */
function GoalJournalModalContainer({
  isOpen,
  onClose,
  goalId,
}: IDailyReflectionModalProps) {
  const { form, handleSubmit, userAccount } = useDailyReflection(goalId);

  if (!userAccount) return null;

  const goal = userAccount?.goals.find(({ id }) => id === goalId);

  const journal = goal?.journal ?? [];

  return (
    <GoalJournalModal
      isOpen={isOpen}
      onClose={onClose}
      form={form}
      journal={journal ?? []}
      onSubmit={handleSubmit}
    />
  );
}

export default GoalJournalModalContainer;
