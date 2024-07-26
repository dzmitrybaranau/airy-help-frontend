import React from "react";
import styles from "./CreateGoalForm.module.scss";
import { Text, Title } from "@mantine/core";
import { useCreateGoal } from "../../hooks/useCreateGoal";
import { CREATE_GOAL_STEPS } from "../../store/useCreateGoalStore";
import { UseFormReturnType } from "@mantine/form";
import { UserGoal } from "airy-help-utils";
import DetermineGoalStep from "./components/DetermineGoalStep";
import ProcessGoalStep from "./components/ProcessGoalStep";

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
          <DetermineGoalStep
            form={form}
            isCreatingGoal={isCreatingGoal}
            handleStepChange={() => setCurrentStep(CREATE_GOAL_STEPS.WHY)}
          />
        );
      case CREATE_GOAL_STEPS.WHY:
        return (
          <ProcessGoalStep
            handleStepChange={() => setCurrentStep(CREATE_GOAL_STEPS.INITIAL)}
            isCreatingGoal={isCreatingGoal}
            form={form}
            handleSubmit={handleSubmit}
          />
        );
      default:
        return (
          <DetermineGoalStep
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
