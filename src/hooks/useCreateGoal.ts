import { useForm } from "@mantine/form";
import { collection, doc, getDoc, setDoc } from "@firebase/firestore";
import { firestore } from "../firebase/firebase-config";
import WebApp from "@twa-dev/sdk";
import { useStartOnboarding } from "./useStartOnboarding";
import { UserGoal } from "airy-help-utils";
import { useCreateGoalStore, useUserStore } from "../store";

export const useCreateGoal = () => {
  const { handleStartOnboarding } = useStartOnboarding();
  const { setIsCreatingGoal } = useCreateGoalStore();
  const { addUserGoal, userAccount } = useUserStore();

  const form = useForm<UserGoal>({
    initialValues: {
      description: "",
      createdAt: "",
      why: "",
      id: "",
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

  const createUserGoal = async ({
    goalDescription,
    userId,
    why,
  }: {
    userId: string;
    goalDescription: string;
    why: string;
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
      addUserGoal(newGoal);
      setIsCreatingGoal(false);
    } catch (e) {
      WebApp.showAlert("Error creating goal!", e.toString());
      setIsCreatingGoal(false);
    }
  };

  const handleSubmit = async () => {
    const { description, why } = form.getValues();
    const userId = userAccount?.chatId as string;
    console.log("SUBMIT", { userId });
    await createUserGoal({ userId, goalDescription: description, why }).catch(
      (e) => {
        console.error("Error creating goal!", e);
      },
    );
  };

  return {
    form,
    handleSubmit,
  };
};
