import React from "react";
import { UseFormReturnType } from "@mantine/form";
import { UserGoal } from "airy-help-utils";
import { Button, Input, Text, Title } from "@mantine/core";
import styles from "../CreateGoalForm.module.scss";
import { Typewriter } from "react-simple-typewriter";
import Todo from "../../Todo/Todo";

export interface IDetermineGoalStepProps {
  form: UseFormReturnType<Omit<UserGoal, "journal">>;
  isCreatingGoal: boolean;
  handleStepChange: () => void;
}

/**
 * Step to determine future goal
 */
function DetermineGoalStep({
  form,
  isCreatingGoal,
  handleStepChange,
}: IDetermineGoalStepProps) {
    return (
      <>
        <Text c="white" mb={0} fw={700}>
          Step 1
        </Text>
        <Title
          mt={0}
          c="#fff"
          fz="h2"
          lh="32px"
          fw={900}
          className={styles.title}
          mb={12}
        >
          <Typewriter
            words={[
              "Think of a Goal 💭",
              "Dream Big ⛰",
              "Challenge Yourself 🏈",
              "Write Down Your Goal ✍🏼",
            ]}
            loop={1}
            cursor
            cursorStyle="|"
            typeSpeed={50}
            deleteSpeed={25}
            delaySpeed={3000}
          />
        </Title>

        <div className={styles.letterSpacingWrapper}>
          <Text
            c="white"
            fz="sm"
            ff="monospace"
            className={styles.letterSpacing}
          >
            <b>To help you decide:</b> <br />* What would you want for{" "}
            <span className={styles.underline}>future self?</span> <br />* Think
            of it if you have{" "}
            <span className={styles.underline}>already done it</span>, like{" "}
            <span>"I wrote my book that helped people to learn English"</span>,
            or <span>"I ran 15km under 1h 30m"</span> <br /> <br /> P.S. - You
            should be feeling inspired about that future, you should not lie to
            yourself about what you want;)
          </Text>
        </div>

        {/* TODO: Make a button to get random goals of other users  */}
        <Todo>
          Make a button to get random goals of other users, to help creative
          process
        </Todo>

        <form
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            marginTop: 6,
          }}
        >
          <Input.Wrapper
            required
            label="My goal is:"
            style={{ marginBottom: 12 }}
            size="sm"
            c="rgba(255,255,255,0.85)"
            error={form.errors.name && "Description is required"}
            w="100%"
            fw={600}
          >
            <Input
              {...form.getInputProps("name")}
              placeholder="Ex: I can do proper backflip, I own creative agency"
              disabled={isCreatingGoal}
              size="sm"
              className={styles.input}
            />
          </Input.Wrapper>
          <Button
            className={styles.continue}
            disabled={Array.from(form.getValues().name).length < 5}
            variant="light"
            size="sm"
            type="submit"
            onClick={handleStepChange}
          >
            Continue
          </Button>
        </form>
      </>
    );
}

export default DetermineGoalStep;
