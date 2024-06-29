import React, { useEffect, useRef } from "react";
import styles from "./CreateGoalForm.module.scss";
import { IconInfoCircle } from "@tabler/icons-react";
import { Button, Input } from "@mantine/core";
import { useCreateGoal } from "../../hooks/useCreateGoal";
import { CREATE_GOAL_STEPS } from "../../store/useCreateGoalStore";
import { useOnboardingStep } from "../../context/useOnboardingStep";

export interface ICreateGoalProps {}

const Step1 = ({ form, isCreatingGoal, handleStepChange }) => {
  const formRef = useRef(null);
  const { isActive, nextStep, step } = useOnboardingStep(1, formRef);

  useEffect(() => {
    nextStep();
  }, []);

  return (
    <>
      {isActive && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.4)",
            zIndex: 9999999,
          }}
        ></div>
      )}
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
      <form
        ref={formRef}
        onSubmit={form.onSubmit(handleStepChange)}
        style={{ width: "100%" }}
      >
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
        <Button
          disabled={Array.from(form.getValues().description).length < 5}
          variant="light"
          size="xs"
          color="blue"
          type="submit"
        >
          Continue
        </Button>
      </form>
    </>
  );
};

const Step2 = ({ form, handleSubmit, handleStepChange, isCreatingGoal }) => {
  return (
    <>
      <h2 className={styles.title}>
        <span>Goal: </span>"{form.getValues().description}"
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
          to achieve this goal. Think of how it’ll make you feel, or what
          outcomes do you want to achieve with it once we make it real.
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
            disabled={isCreatingGoal}
            style={{
              width: "100%",
            }}
          />
        </Input.Wrapper>
        <Button
          disabled={Array.from(form.getValues().why).length < 5}
          variant="light"
          size="xs"
          color="blue"
          type="submit"
          mb="lg"
          loading={isCreatingGoal}
        >
          Continue
        </Button>
      </form>
      <div className={styles.createGoalHint}>
        <p>
          We know when answering WHY you might want to re-define your goal, feel
          free to do so 😉
        </p>
      </div>
      <Button
        onClick={handleStepChange}
        variant="light"
        size="xs"
        color="indigo"
        type="submit"
        disabled={isCreatingGoal}
      >
        Update Goal
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
            handleStepChange={setCurrentStep}
          />
        );
    }
  };
  return <div className={styles.root}>{renderStep()}</div>;
}

export default CreateGoalForm;
