import React, {useState} from "react";
import styles from "./CreateGoalForm.module.scss";
import { IconInfoCircle } from "@tabler/icons-react";
import {Button, Input, Select, Text, Title} from "@mantine/core";
import { useCreateGoal } from "../../hooks/useCreateGoal";
import { CREATE_GOAL_STEPS } from "../../store/useCreateGoalStore";
import { Typewriter } from "react-simple-typewriter";
import { UseFormReturnType } from "@mantine/form";
import { UserGoal } from "airy-help-utils";
import pleaseStop from "./Please Stop.gif";

export interface ICreateGoalProps {}

const commonGoals = {
  "Learning Goals": [
    "Learn a new language",
    "Take a cooking class",
    "Master a musical instrument",
  ],
  "Fitness Goals": [
    "Run a marathon",
    "Complete a 30-day yoga challenge",
    "Lose 10 pounds",
  ],
  "Career Goals": [
    "Get a promotion at work",
    "Learn a new professional skill",
    "Start a side business",
  ],
  "Financial Goals": [
    "Save $5000 in six months",
    "Pay off credit card debt",
    "Create a monthly budget",
  ],
  "Personal Development Goals": [
    "Read 12 books in a year",
    "Meditate daily for 30 days",
    "Develop a daily journaling habit",
  ],
  "Wellness Goals": [
    "Sleep 8 hours per night",
    "Reduce screen time to 2 hours per day",
    "Follow a balanced diet",
  ],
  "Social Goals": [
    "Make 5 new friends",
    "Reconnect with old friends",
    "Volunteer in the community once a week",
  ],
  "Environmental Goals": [
    "Reduce plastic use",
    "Start composting",
    "Plant a tree",
  ],
};

const Step1 = ({
  form,
  isCreatingGoal,
  handleStepChange,
}: {
  form: UseFormReturnType<Omit<UserGoal, "journal">>;
  isCreatingGoal: boolean;
  handleStepChange: () => void;
}) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedGoal, setSelectedGoal] = useState("");

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    setSelectedGoal("");
    form.setFieldValue("name", "");
  };

  const handleGoalChange = (value) => {
    setSelectedGoal(value);
    form.setFieldValue("name", value);
  };

  return (
    <>
      <Title c="#fff" fz="h1" lh="32px" fw={900} className={styles.title}>
        <Typewriter
          words={[
            "What's Your Goal?🚀",
            "Dream Big ⛰",
            "Challenge Yourself 🏈",
            "What's Your Goal?🚀",
          ]}
          loop={1}
          cursor
          cursorStyle="|"
          typeSpeed={50}
          deleteSpeed={25}
          delaySpeed={3000}
        />
      </Title>

      <Text c="white"> Common Goals section</Text>

      <Select
        label="Select a Category"
        placeholder="Pick one"
        data={Object.keys(commonGoals)}
        value={selectedCategory}
        onChange={handleCategoryChange}
        mb={12}
      />

      {selectedCategory && (
        <Select
          label="Select a Goal"
          placeholder="Pick one"
          data={commonGoals[selectedCategory]}
          value={selectedGoal}
          onChange={handleGoalChange}
          mb={12}
        />
      )}

      <form style={{ width: "100%", display: "flex", flexDirection: "column" }}>
        <Input.Wrapper
          required
          label="Goal Name"
          style={{ marginBottom: 12 }}
          size="sm"
          c="rgba(255,255,255,0.85)"
          error={form.errors.name && "Description is required"}
          w="100%"
          fw={600}
        >
          <Input
            {...form.getInputProps("name")}
            placeholder="Run a marathon"
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
};

const Step2 = ({
  form,
  handleSubmit,
  handleStepChange,
  isCreatingGoal,
}: {
  form: UseFormReturnType<Omit<UserGoal, "journal">>;
  isCreatingGoal: boolean;
  handleStepChange: () => void;
  handleSubmit: () => void;
}) => {
  return (
    <>
      <Text c="white" fz="xl" fw={900} mb={16}>
        <Typewriter
          words={[`Step 2: Find your "Why"`]}
          loop={1}
          cursor
          cursorStyle="||"
          typeSpeed={50}
          deleteSpeed={25}
          delaySpeed={3000}
        />
      </Text>
      <div
        style={{
          color: "#fff",
          background: "radial-gradient(rgba(56, 85, 121, 0.78), #2a3757)",
          width: "100%",
          padding: "14px 14px 14px",
          borderRadius: "8px",
          boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
          marginBottom: 16,
        }}
      >
        <img src={pleaseStop} alt="stop gif" />

        <div className={styles.createGoalHint}>
          <Text fw={900} fz="h4" mb={4} style={{ textDecoration: "underline" }}>
            Time to find deep roots of your desire.
          </Text>
        </div>
        <div className={styles.createGoalHint}>
          <Text fw={500}>
            To get best support from Airy you need to tell <b>WHY</b> do you
            want to achieve this goal. Think of how it’ll make you feel, or what
            outcomes do you want to achieve with it once we make it real.
          </Text>
        </div>
      </div>

      <form onSubmit={form.onSubmit(handleSubmit)} style={{ width: "100%" }}>
        <Input.Wrapper
          required
          label="Why do you want to achieve this goal?"
          mb={12}
          c="#fff"
          size="sm"
          error={form.errors.why && "Description is required"}
        >
          <Input
            {...form.getInputProps("reason")}
            placeholder="Running a marathon will gift me feel of accomplishment"
            size="sm"
            disabled={isCreatingGoal}
            className={styles.input}
          />
        </Input.Wrapper>
        <Button
          className={styles.continue}
          disabled={Array?.from(form.getValues()?.reason).length < 5}
          variant="light"
          size="sm"
          w="100%"
          color="blue"
          type="submit"
          mb="lg"
          loading={isCreatingGoal}
        >
          Continue
        </Button>
      </form>
      <div className={styles.createGoalHint}>
        <Text fw={400}>
          We know when answering WHY you might want to re-define your goal, feel
          free to do so 😉
        </Text>
      </div>
      <Button
        onClick={handleStepChange}
        variant="light"
        size="xs"
        color="cyan"
        w="100%"
        c="rgba(255,255,255,0.55)"
        type="submit"
        disabled={isCreatingGoal}
      >
        Return To Goal Creation
      </Button>
    </>
  );
};

/**
 * Create Goals Form
 */
function CreateGoalForm() {
  const { form, handleSubmit, isCreatingGoal, setCurrentStep, currentStep } =
    useCreateGoal();

  const renderStep = () => {
    switch (currentStep) {
      case CREATE_GOAL_STEPS.INITIAL:
        return (
          <Step1
            form={form}
            isCreatingGoal={isCreatingGoal}
            handleStepChange={() => setCurrentStep(CREATE_GOAL_STEPS.WHY)}
          />
        );
      case CREATE_GOAL_STEPS.WHY:
        return (
          <Step2
            handleStepChange={() => setCurrentStep(CREATE_GOAL_STEPS.INITIAL)}
            isCreatingGoal={isCreatingGoal}
            form={form}
            handleSubmit={handleSubmit}
          />
        );
      default:
        return (
          <Step1
            form={form}
            isCreatingGoal={isCreatingGoal}
            handleStepChange={() => setCurrentStep(CREATE_GOAL_STEPS.WHY)}
          />
        );
    }
  };
  return <div className={styles.root}>{renderStep()}</div>;
}

export default CreateGoalForm;
