import React from "react";
import { useAchievementsStore } from "../../store";
import { Button, Modal, Text } from "@mantine/core";
import { ACHIEVEMENTS } from "./achivements";

export interface IAchievementProps {}

/**
 * Achievement
 */
function Achievement(props: IAchievementProps) {
  const {
    userAchievements,
    takeAchievement,
  } = useAchievementsStore();
  // const userAchievements = [
  //   {
  //     isTaken: false,
  //     id: "FIRST_STEPS",
  //   },
  // ];

  const isModalOpen = Boolean(
    userAchievements.find((achievement) => !achievement.isTaken),
  );

  return (
    <Modal
      size="xs"
      opened={isModalOpen}
      withCloseButton={false}
      onClose={() => {}}
    >
      <div style={{ padding: "8px 24px 8px", display: "flex" }}>
        {userAchievements.map(({ isTaken, id }) => {
          if (isTaken) return null;
          return (
            <div key={id}>
              <Text
                size="32px"
                fw={700}
                ta="center"
                mb={8}
                color="rgba(0,0,0,0.8)"
              >
                {ACHIEVEMENTS[id].name}
              </Text>
              <img
                src={ACHIEVEMENTS[id].image}
                style={{
                  width: "100%",
                  height: "190px",
                  background: "rgba(0,0,0,0)",
                  margin: "0 auto",
                  marginBottom: 4,
                  borderRadius: 8,
                  objectFit: "contain",
                }}
              />
              <Text size="sm" mb={20} ta="center" color="gray">
                {ACHIEVEMENTS[id].description}
              </Text>
              <Button w="100%" onClick={() => takeAchievement(id)} variant="gradient">
                Collect Reward
              </Button>
            </div>
          );
        })}
      </div>
    </Modal>
  );
}

export default Achievement;
