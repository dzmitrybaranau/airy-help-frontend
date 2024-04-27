import { useForm } from "@mantine/form";
import {
  setIsSignUpOpen,
  setUserAccount,
  UserAccount,
} from "../redux/userSlice";
import WebApp from "@twa-dev/sdk";
import { collection, doc, setDoc } from "@firebase/firestore";
import { firestore } from "../firebase/firebase-config";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import useUserAccount from "./useUserAccount";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface UserForm
  extends Pick<
    UserAccount,
    | "firstName"
    | "lastName"
    | "email"
    | "gender"
    | "favoriteMusicGenre"
    | "birthdayYear"
    | "birthdayMonth"
    | "birthdayDay"
  > {}
export const useMutateUserAccount = () => {
  const dispatch = useDispatch();
  const isSignUpOpen = useSelector(
    (state: RootState) => state.user.isSignUpOpen,
  );
  const navigate = useNavigate();
  const { userAccount, userExists } = useUserAccount();
  const userTmaInfo = useSelector((state: RootState) => state.user.userTmaInfo);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<UserForm>({
    mode: "controlled",
    initialValues: {
      ...userAccount,
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

  const handleSignInOpen = () => {
    dispatch(setIsSignUpOpen(true));
  };

  const handleSignInClose = () => {
    dispatch(setIsSignUpOpen(false));
  };

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
      const newUserAcc = {
        ...values,
        birthday: {
          year: values.birthdayYear,
          month: values.birthdayMonth,
          day: values.birthdayDay,
        },
        chatId,
      };
      await setDoc(userDocRef, newUserAcc);
      form.reset();
      setIsSubmitting(false);
      dispatch(setIsSignUpOpen(false));
      dispatch(setUserAccount({ ...newUserAcc, id: chatId }));
      WebApp.showAlert(userExists ? "Account updated" : "Account created");
      navigate("/");
    } catch (e) {
      setIsSubmitting(false);
      WebApp.showAlert("Error creating account.", e.toString());
    }
  };

  return {
    form,
    isSignUpOpen,
    handleSignInOpen,
    handleCreateAccount,
    handleSignInClose,
    userExists,
    setIsSubmitting,
    isSubmitting,
  };
};
