import React from "react";
import { UseFormReturnType } from "@mantine/form";
import { UserGoal } from "airy-help-utils";
import { Text, Title } from "@mantine/core";
import styles from "../CreateGoalForm.module.scss";
import { Typewriter } from "react-simple-typewriter";
import Todo from "../../Todo/Todo";

export interface IProcessGoalStepProps {
  form: UseFormReturnType<Omit<UserGoal, "journal">>;
  isCreatingGoal: boolean;
  handleStepChange: () => void;
  handleSubmit: () => void;
}
// Where do you start, where are you going (exactly, objectives), how much you can move forward every day (need to know available time, available resources),

/**
 * Process Goal (Action Plan, Resources,
 */
function ProcessGoalStep({
  isCreatingGoal,
  handleStepChange,
  handleSubmit,
  form,
}: IProcessGoalStepProps) {
  return (
    <div>
      <Text c="white" mb={0} fw={700}>
        Step 2
      </Text>
      <Title c="white" fw={900} mt={-8} mb={8}>
        <Typewriter
          words={[
            "Thinking Of Details 💭",
            "Breaking Illusions ⛓️‍💥",
            "Visualizing The Goal 🤞🏼",
            "Thinking Of Details 💭",
          ]}
          loop={1}
          cursor
          cursorStyle="|"
          typeSpeed={50}
          deleteSpeed={25}
          delaySpeed={3000}
        />
      </Title>
      <Todo>
        Maybe create video, or some slides to show step by step with icons
      </Todo>
      <div className={styles.letterSpacingWrapper}>
        <Text c="white" fz="sm" ff="monospace" className={styles.letterSpacing}>
          * I want you to think of any goal as a hike <br />* You need a route
          🧭 <br />* Do you need to get prepared 🎒 and how long it will take ⏳
          <br />* Details about the final destination (where{" "}
          <span className={styles.underline}>exactly</span> are you going)
          <br />
        </Text>
      </div>
      <div className={styles.letterSpacingWrapper}>
        <Text c="white" fz="sm" ff="monospace" className={styles.letterSpacing}>
          <b>Remeber, </b> <br />
          any hike can be a well known 15 mins route. Or wild one, where you{" "}
          <span>start in the middle of nowhere</span>, you can do only 5 steps a
          day, you will need to <span>fight lions</span> in the jungles and pick
          berries to survive <br /> All to see the view from a mountain no one
          being at:)
        </Text>
      </div>

      <Title c="white" fw={900} mt={-8} mb={8}>
        Let's start by planning out your acions
      </Title>
      <Text c="white" mb={0} fw={700}>
        Action Plan
      </Text>
      <Text c="white" mb={0} fw={700}>
        Objectives
      </Text>

      <Text c="white" mb={0} fw={700}>
        Position
      </Text>

      <Text c="white" mb={0} fw={700}>
        Limitations (time, energy, resources)
      </Text>

      <Text c="white" mb={0} fw={700}>
        Your Abilities
      </Text>

      <Text c="white" mb={0} fw={700}>
        Needed Abilities
      </Text>
    </div>
  );
}

export default ProcessGoalStep;
