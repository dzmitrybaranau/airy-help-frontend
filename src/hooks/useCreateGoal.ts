import { useForm } from "@mantine/form";
import { collection, doc, getDoc } from "@firebase/firestore";
import { firestore } from "../firebase/firebase-config";
import WebApp from "@twa-dev/sdk";
import { useStartOnboarding } from "./useStartOnboarding";
import { UserAccount, UserGoal } from "airy-help-utils";
import {
  useAchievementsStore,
  useCreateGoalStore,
  useUserStore,
} from "../store";
import { useNavigate } from "react-router-dom";
import { ACHIEVEMENTS } from "../components/Achievement/achivements";
import { setUserData } from "../utils/user/setUserData";

export const useCreateGoal = () => {
  const { handleStartOnboarding } = useStartOnboarding();
  const { setIsCreatingGoal } = useCreateGoalStore();
  const createAchievement = useAchievementsStore(
    (state) => state.createAchievement,
  );
  const { addUserGoal, userAccount, fetchUserAccount } = useUserStore();
  const navigate = useNavigate();

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
      const userAccount = currentUserData.data() as UserAccount;

      await setUserData({
        userRef: userDocRef,
        newUserData: {
          ...userAccount,
          goals: [...(userAccount?.goals ?? []), newGoal],
          achievementsId: [
            ...userAccount.achievementsId,
            ACHIEVEMENTS.FIRST_STEPS.id,
          ],
        },
      });

      addUserGoal(newGoal);
      setIsCreatingGoal(false);

      createAchievement(ACHIEVEMENTS.FIRST_STEPS.id);
      createAchievement(ACHIEVEMENTS.FIRST_BREATH.id);

      navigate("/goals");
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
