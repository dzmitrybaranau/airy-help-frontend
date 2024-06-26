import React from "react";
import { Button, Modal, Text } from "@mantine/core";
import { ACHIEVEMENTS } from "./achivements";
import { IAchievement } from "../../store/useAchievementsStore";

export interface IAchievementProps {
  isOpen: boolean;
  takeAchievement: (id: string) => void;
  cardToRender: IAchievement;
}

/**
 * Achievement
 */
function Achievement({
  isOpen,
  takeAchievement,
  cardToRender,
}: IAchievementProps) {
  const { id } = cardToRender;

  return (
    <Modal size="xs" opened={isOpen} withCloseButton={false} onClose={() => {}}>
      <div style={{ padding: "8px 24px 8px", overflow: "hidden" }}>
        <div style={{ width: "100%" }}>
          <Text
            size="32px"
            fw={700}
            ta="center"
            mb={12}
            color="rgba(0,0,0,0.8)"
          >
            {ACHIEVEMENTS?.[id]?.name}
          </Text>
          <div
            style={{
              width: "100%",
              height: "190px",
              margin: "0 auto",
              marginBottom: 12,
              borderRadius: 16,
              overflow: "hidden",
            }}
          >
            <img
              src={ACHIEVEMENTS?.[id]?.image}
              style={{
                width: "100%",
                height: "100%",
                background: "rgba(0,0,0,0)",
                objectFit: "contain",
                ...ACHIEVEMENTS?.[id]?.cssStyles,
              }}
            />
          </div>

          <Text size="sm" mb={12} ta="center" color="gray">
            {ACHIEVEMENTS?.[id]?.description}
          </Text>
          <Button
            w="100%"
            onClick={() => takeAchievement(id)}
            variant="gradient"
          >
            Collect Reward
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default Achievement;
