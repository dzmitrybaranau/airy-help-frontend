import { useForm } from "@mantine/form";
import { collection, doc } from "@firebase/firestore";
import { firestore } from "../firebase/firebase-config";
import { useUserStore } from "../store";
import { setUserData } from "../utils/user/setUserData";

export const useDailyReflection = (goalId: string) => {
  const userAccount = useUserStore((state) => state.userAccount);
  const addJournalReflection = useUserStore(
    (state) => state.addJournalReflection,
  );

  const form = useForm({
    initialValues: {
      reflection: "",
    },
    validate: {
      reflection: (value) =>
        value.length < 5 ? "Reflection must be at least 5 characters" : null,
    },
  });

  const handleSubmit = async () => {
    if (!userAccount?.chatId) return;

    const userDocRef = doc(
      collection(firestore, "users"),
      userAccount.chatId.toString(),
    );

    const newReflection = {
      reflection: form.getValues().reflection,
      timestamp: new Date().toISOString(),
      goalId,
    };

    try {
      const updatedGoals = userAccount.goals.map((goal) => {
        if (goal.id === newReflection.goalId) {
          return {
            ...goal,
            journal: [newReflection, ...goal.journal],
          };
        }
        return goal;
      });

      await setUserData({
        userRef: userDocRef,
        newUserData: {
          ...userAccount,
          goals: updatedGoals,
        },
      });
      form.reset();
      addJournalReflection(newReflection);
    } catch (e) {
      console.error("Error adding reflection:", e);
    }
  };

  return {
    form,
    handleSubmit,
    userAccount,
  };
};
