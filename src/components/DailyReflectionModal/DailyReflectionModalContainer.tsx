import React from "react";
import { useDailyReflection } from "../../hooks/useDailyReflection";
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

  userAccount?.dailyReflection.sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  );

  return (
    <DailyReflectionModal
      isOpen={isOpen}
      onClose={onClose}
      form={form}
      dailyReflection={userAccount?.dailyReflection ?? []}
      onSubmit={handleSubmit}
    />
  );
}

export default DailyReflectionModalContainer;
