import React from "react";
import styles from "./CreateGoalForm.module.scss";
import { IconInfoCircle } from "@tabler/icons-react";
import { Button, Input } from "@mantine/core";
import { useCreateGoal } from "../../hooks/useCreateGoal";
import { useCreateGoalStore } from "../../store";
import { CREATE_GOAL_STEPS } from "../../store/useCreateGoalStore";

export interface ICreateGoalProps {}

const Step1 = ({ form, isCreatingGoal, handleStepChange }) => {
  return (
    <>
      <h2 className={styles.title}>Let’s create your first goals 🙌🏼</h2>
      <div className={styles.createGoalHint}>
        <IconInfoCircle
          color="#24a1de"
          style={{ opacity: "0.9", marginRight: 4 }}
        />
        <p>
          Start with any goal on your mind, Airy will help you make it more
          concrete.
        </p>
      </div>
      <form onSubmit={form.onSubmit(handleStepChange)}>
        <Input.Wrapper
          required
          label="Your goal description"
          style={{ marginBottom: 12 }}
          size="xs"
          error={form.errors.description && "Description is required"}
        >
          <Input
            {...form.getInputProps("description")}
            placeholder="Lose weight..."
            disabled={isCreatingGoal}
            size="xs"
          />
        </Input.Wrapper>
        <Button variant="light" size="xs" color="blue" type="submit">
          Continue
        </Button>
      </form>
    </>
  );
};

const Step2 = ({ form, handleSubmit }) => {
  return (
    <>
      <h2 className={styles.title}>
        Your goal: {form.getValues().description}
      </h2>
      <div className={styles.createGoalHint}>
        <IconInfoCircle
          color="#24a1de"
          style={{ opacity: "0.9", marginRight: 4 }}
        />
        <p>Time to find deep roots of your desire.</p>
      </div>
      <div className={styles.createGoalHint}>
        <p>
          To get best support from Airy you need to tell <b>WHY</b> do you want
          to achieve this goal. Think of how it’ll make you feel once we make it
          real.
        </p>
      </div>
      <form onSubmit={form.onSubmit(handleSubmit)} style={{ width: "100%" }}>
        <Input.Wrapper
          required
          label="Why do you want to achieve this goal?"
          style={{ marginBottom: 12, width: "100%" }}
          size="xs"
          error={form.errors.why && "Description is required"}
        >
          <Input
            {...form.getInputProps("why")}
            placeholder="Losing weight will help me feel more attractive..."
            size="xs"
            style={{
              width: "100%",
            }}
          />
        </Input.Wrapper>
        <Button variant="light" size="xs" color="blue" type="submit" mb="lg">
          Continue
        </Button>
      </form>
      <div className={styles.createGoalHint}>
        <p>
          We know when answering WHY you might want to re-define your goal, feel
          free to do so 😉
        </p>
      </div>
      <Button variant="light" size="xs" color="blue" type="submit">
        Update Goal
      </Button>
    </>
  );
};

/**
 * Create Goals Form
 */
function CreateGoalForm() {
  const { form, handleSubmit } = useCreateGoal();
  const { isCreatingGoal, setCurrentStep, currentStep } = useCreateGoalStore();

  const renderStep = () => {
    switch (currentStep) {
      case CREATE_GOAL_STEPS.INITIAL:
        return (
          <Step1
            form={form}
            isCreatingGoal={isCreatingGoal}
            handleStepChange={setCurrentStep}
          />
        );
      case CREATE_GOAL_STEPS.WHY:
        return <Step2 form={form} handleSubmit={handleSubmit} />;
      default:
        return (
          <Step1
            form={form}
            isCreatingGoal={isCreatingGoal}
            handleStepChange={setCurrentStep}
          />
        );
    }
  };
  return <div className={styles.root}>{renderStep()}</div>;
}

export default CreateGoalForm;
