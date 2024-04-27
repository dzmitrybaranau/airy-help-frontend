import { useForm } from "@mantine/form";
import { addUserGoal, UserGoal } from "../redux/userSlice";
import {
  arrayUnion,
  collection,
  doc,
  setDoc,
  Timestamp,
} from "@firebase/firestore";
import { firestore } from "../firebase/firebase-config";
import WebApp from "@twa-dev/sdk";
import { useDispatch } from "react-redux";
import { useState } from "react";

export const useCreateGoal = (userId: string) => {
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
    const userDocRef = doc(collection(firestore, "users"), userId);

    const newGoal = {
      id: Math.random().toString(36).substr(2) + Date.now().toString(36),
      description: goalDescription,
      createdAt: Timestamp.now(),
    };

    try {
      await setDoc(userDocRef, { goals: arrayUnion(newGoal) }, { merge: true });
      dispatch(addUserGoal(newGoal));
      setIsCreatingGoal(false);
      WebApp.showAlert("Goal created! Sending you back to Airy!", () => {
        WebApp.close();
      });
    } catch (e) {
      WebApp.showAlert("Error creating goal!", e.toString());
      setIsCreatingGoal(true);
    }
  };

  const handleSubmit = async () => {
    const { description } = form.getValues();
    await createGoalForUser({ userId, goalDescription: description });
  };

  return {
    form,
    handleSubmit,
    isCreatingGoal,
  };
};
