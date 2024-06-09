import { useForm } from "@mantine/form";
import { doc, updateDoc, collection } from "@firebase/firestore";
import { firestore } from "../firebase/firebase-config";
import { useUserStore } from "../store";

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

  const handleSubmit = async (values) => {
    if (!userAccount?.chatId) return;

    const userDocRef = doc(
      collection(firestore, "users"),
      userAccount.chatId.toString(),
    );
    const newReflection = {
      reflection: values.reflection,
      timestamp: new Date().toISOString(),
    };

    try {
      await updateDoc(userDocRef, {
        dailyReflection: [
          ...(userAccount?.dailyReflection ?? []),
          newReflection,
        ],
      });
      addUserReflection(newReflection.reflection);
    } catch (e) {
      console.error("Error adding reflection:", e);
    }
  };

  return {
    form,
    handleSubmit,
  };
};
