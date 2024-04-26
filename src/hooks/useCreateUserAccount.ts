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
import { useEffect } from "react";

interface UserForm extends Omit<UserAccount, "birthday"> {
  birthday?: Date;
}
export const useCreateUserAccount = () => {
  const dispatch = useDispatch();
  const isSignUpOpen = useSelector(
    (state: RootState) => state.user.isSignUpOpen,
  );
  const { userAccount, userExists } = useUserAccount();
  const userTmaInfo = useSelector((state: RootState) => state.user.userTmaInfo);

  const form = useForm<UserForm>({
    mode: "controlled",
    initialValues: {
      ...userAccount,
      birthday: userAccount.birthday
        ? new Date(userAccount.birthday)
        : undefined,
    },
  });

  useEffect(() => {
    form.setValues({
      ...userAccount,
      birthday: userAccount.birthday
        ? new Date(userAccount.birthday)
        : undefined,
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
      const chatId = userTmaInfo?.user?.id;
      if (!chatId) {
        WebApp.showAlert("Problems receiving chat ID");
        return;
      }
      const userDocRef = doc(collection(firestore, "users"), chatId.toString());
      const newUserAcc = {
        ...values,
        birthday: values.birthday ? values.birthday.toISOString() : null,
        chatId,
        goals: values.goals.map((goal) => ({
          id: Math.random().toString(36).substr(2) + Date.now().toString(36),
          ...goal,
        })),
      };
      await setDoc(userDocRef, newUserAcc);
      dispatch(setIsSignUpOpen(false));
      dispatch(setUserAccount({ ...newUserAcc, id: chatId }));
      WebApp.showAlert(userExists ? "Account updated" : "Account created");
    } catch (e) {
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
  };
};
