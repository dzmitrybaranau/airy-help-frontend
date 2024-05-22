import { useForm } from "@mantine/form";
import WebApp from "@twa-dev/sdk";
import { collection, doc, setDoc } from "@firebase/firestore";
import { firestore } from "../firebase/firebase-config";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAccount } from "airy-help-utils";
import { useUserStore } from "../store";

export const useMutateUserAccount = () => {
  const navigate = useNavigate();
  const { userAccount, setUserAccount } = useUserStore();
  const userTmaInfo = useSelector((state: RootState) => state.user.userTmaInfo);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<
    Pick<
      UserAccount,
      | "birthdayMonth"
      | "birthdayDay"
      | "birthdayYear"
      | "firstName"
      | "lastName"
    >
  >({
    mode: "controlled",
    initialValues: {
      birthdayYear: "",
      birthdayMonth: "",
      birthdayDay: "",
      firstName: "",
      lastName: "",
    },
    validate: {
      birthdayYear: (value) => {
        if (!value) {
          return "Year is required";
        }
        return false;
      },
      birthdayMonth: (value) => {
        if (!value) {
          return "Month is required";
        }
        return false;
      },
      birthdayDay: (value) => {
        if (!value) {
          return "Day is required";
        }
        const { birthdayYear, birthdayMonth } = form.getValues();
        if (birthdayYear && birthdayMonth) {
          const date = new Date(
            Number(birthdayYear),
            Number(birthdayMonth),
            Number(value),
          );

          if (date.getDate().toString() !== value) {
            return "Invalid date";
          }
        }

        return false;
      },
    },
  });

  useEffect(() => {
    form.setValues({
      ...userAccount,
    });
  }, [userAccount]);

  const handleCreateAccount = async (values) => {
    // Add the user to Firestore
    try {
      setIsSubmitting(true);
      const chatId = userTmaInfo?.user?.id;
      if (!chatId) {
        WebApp.showAlert("Problems receiving chat ID");
        return;
      }
      const userDocRef = doc(collection(firestore, "users"), chatId.toString());
      const newUserAcc: UserAccount = {
        ...values,
        birthday: {
          year: values.birthdayYear,
          month: values.birthdayMonth,
          day: values.birthdayDay,
        },
        chatId: chatId.toString(),
      };
      await setDoc(userDocRef, newUserAcc);
      form.reset();
      setIsSubmitting(false);
      setUserAccount(newUserAcc);
      WebApp.showAlert(userAccount ? "Account updated" : "Account created");
      navigate("/");
    } catch (e) {
      setIsSubmitting(false);
      WebApp.showAlert("Error creating account.", e.toString());
    }
  };

  return {
    form,
    handleCreateAccount,
    setIsSubmitting,
    isSubmitting,
  };
};
