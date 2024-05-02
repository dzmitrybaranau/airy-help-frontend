import { useForm } from "@mantine/form";
import { addUserGoal } from "../redux/userSlice";
import { collection, doc, getDoc, setDoc } from "@firebase/firestore";
import { firestore } from "../firebase/firebase-config";
import WebApp from "@twa-dev/sdk";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { UserGoal } from "../types/user.type";
import { useStartOnboarding } from "./useStartOnboarding";

export const useCreateGoal = (userId: string) => {
  const { handleStartOnboarding } = useStartOnboarding();
  const [isCreatingGoal, setIsCreatingGoal] = useState(false);
  const dispatch = useDispatch();
  const form = useForm<UserGoal>({
    initialValues: {
      description: "",
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
  }: {
    userId: string;
    goalDescription: string;
  }) => {
    setIsCreatingGoal(true);
    const userDocRef = doc(collection(firestore, "users"), userId.toString());

    const newGoal: UserGoal = {
      id: Math.random().toString(36).substr(2) + Date.now().toString(36),
      description: goalDescription,
    };

    try {
      const currentUserData = await getDoc(userDocRef);
      await setDoc(userDocRef, {
        ...currentUserData?.data(),
        goals: [...(currentUserData?.data()?.goals ?? []), newGoal],
      });
      console.log("Goal created!");
      dispatch(addUserGoal(newGoal));
      setIsCreatingGoal(false);
      await handleStartOnboarding().catch((e) => {
        console.error("Error starting onboarding!", e);
      });
      WebApp.showAlert("Goal created! Sending you back to Airy!", () => {
        WebApp.close();
      });
    } catch (e) {
      WebApp.showAlert("Error creating goal!", e.toString());
      setIsCreatingGoal(false);
    }
  };

  const handleSubmit = async () => {
    const { description } = form.getValues();
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
  };
};
