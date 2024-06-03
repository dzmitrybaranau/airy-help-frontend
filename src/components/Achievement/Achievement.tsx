import React from "react";
import { useAchievementsStore } from "../../store";
import { Button, Modal, Text } from "@mantine/core";
import { ACHIEVEMENTS } from "./achivements";

export interface IAchievementProps {}

/**
 * Achievement
 */
function Achievement(props: IAchievementProps) {
  const { userAchievements, takeAchievement } = useAchievementsStore();
  // const userAchievements = [
  //   {
  //     isTaken: true,
  //     id: "FIRST_BREATH",
  //   },
  //   {
  //     isTaken: false,
  //     id: "FIRST_STEPS",
  //   },
  // ];

  const isModalOpen = Boolean(
    userAchievements.find((achievement) => !achievement.isTaken),
  );

  const cardToRender = userAchievements.find(({ isTaken }) => !isTaken);
  if (!cardToRender) {
    return null;
  }

  const { id } = cardToRender;

  return (
    <Modal
      size="xs"
      opened={isModalOpen}
      withCloseButton={false}
      onClose={() => {}}
    >
      <div style={{ padding: "8px 24px 8px", overflow: "hidden" }}>
        <div style={{ width: "100%" }}>
          <Text
            size="32px"
            fw={700}
            ta="center"
            mb={12}
            color="rgba(0,0,0,0.8)"
          >
            {ACHIEVEMENTS[id].name}
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
              src={ACHIEVEMENTS[id].image}
              style={{
                width: "100%",
                height: "100%",
                background: "rgba(0,0,0,0)",
                objectFit: "contain",
                ...ACHIEVEMENTS[id].cssStyles,
              }}
            />
          </div>

          <Text size="sm" mb={12} ta="center" color="gray">
            {ACHIEVEMENTS[id].description}
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
