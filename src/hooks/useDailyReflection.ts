import { useForm } from "@mantine/form";
import { collection, doc } from "@firebase/firestore";
import { firestore } from "../firebase/firebase-config";
import { useUserStore } from "../store";
import { setUserData } from "../utils/user/setUserData";

export const useDailyReflection = () => {
  const userAccount = useUserStore((state) => state.userAccount);
  const addUserReflection = useUserStore((state) => state.addUserReflection);

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
    };

    try {
      await setUserData({
        userRef: userDocRef,
        newUserData: {
          ...userAccount,
          dailyReflection: [...userAccount.dailyReflection, newReflection],
        },
      });
      form.reset();
      addUserReflection(newReflection);
    } catch (e) {
      console.error("Error adding reflection:", e);
    }
  };

  return {
    form,
    handleSubmit,
  };
};
