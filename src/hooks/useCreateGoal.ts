import { useForm } from "@mantine/form";
import { addUserGoal } from "../redux/userSlice";
import { collection, doc, getDoc, setDoc } from "@firebase/firestore";
import { firestore } from "../firebase/firebase-config";
import WebApp from "@twa-dev/sdk";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useStartOnboarding } from "./useStartOnboarding";
import { RootState } from "../redux/store";
import { UserGoal } from "airy-help-utils";

export enum CREATE_GOAL_STEPS {
  INITIAL = "INITIAL",
  WHY = "WHY",
}

export const useCreateGoal = () => {
  const [createGoalFormStep, setCreateGoalFormStep] =
    useState<CREATE_GOAL_STEPS>(CREATE_GOAL_STEPS.WHY);

  const handleStepChange = (step: CREATE_GOAL_STEPS) => {
    setCreateGoalFormStep(step);
  };

  const { handleStartOnboarding } = useStartOnboarding();
  const [isCreatingGoal, setIsCreatingGoal] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const form = useForm<UserGoal>({
    initialValues: {
      description: "",
      createdAt: "",
      why: "",
    },
    validate: {
      description: (value) => {
        if (value.length > 0) {
          return false;
        }
        return "Description is required";
      },
    },
  });

  const createGoalForUser = async ({
    goalDescription,
    userId,
    why,
  }: {
    userId: string;
    goalDescription: string;
    why?: string;
  }) => {
    setIsCreatingGoal(true);
    const userDocRef = doc(collection(firestore, "users"), userId.toString());

    const newGoal: UserGoal = {
      id: Math.random().toString(36).substr(2) + Date.now().toString(36),
      description: goalDescription,
      createdAt: new Date().toISOString(),
      why,
    };

    try {
      const currentUserData = await getDoc(userDocRef);
      await setDoc(userDocRef, {
        ...currentUserData?.data(),
        goals: [...(currentUserData?.data()?.goals ?? []), newGoal],
      });
      console.log("Goal created!");
      await handleStartOnboarding().catch((e) => {
        console.error("Error starting onboarding!", e);
        WebApp.showAlert(`Error creating goal! ${e.toString()}`);
      });
      dispatch(addUserGoal(newGoal));
      setIsCreatingGoal(false);
      WebApp.showAlert("Goal created! Sending you back to Airy!", () => {
        WebApp.close();
      });
    } catch (e) {
      WebApp.showAlert("Error creating goal!", e.toString());
      setIsCreatingGoal(false);
    }
  };

  const handleSubmit = async () => {
    const { description, why } = form.getValues();
    const userId = user.userAccount.chatId;
    console.log("SUBMIT", { userId });
    await createGoalForUser({ userId, goalDescription: description }).catch(
      (e) => {
        console.error("Error creating goal!", e);
      },
    );
  };

  return {
    form,
    handleSubmit,
    isCreatingGoal,
    createGoalFormStep,
    handleStepChange,
  };
};
