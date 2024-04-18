import { useForm } from "@mantine/form";
import { setIsSignUpOpen, setUserAccount } from "../redux/userSlice";
import WebApp from "@twa-dev/sdk";
import { collection, doc, setDoc } from "@firebase/firestore";
import { firestore } from "../firebase/firebase-config";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";

export const useCreateUserAccount = () => {
  const dispatch = useDispatch();
  const isSignUpOpen = useSelector(
    (state: RootState) => state.user.isSignUpOpen,
  );
  const userTmaInfo = useSelector((state: RootState) => state.user.userTmaInfo);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      birthday: "",
    },
  });

  const handleSignInOpen = () => {
    dispatch(setIsSignUpOpen(true));
  };

  const handleSignInClose = () => {
    dispatch(setIsSignUpOpen(false));
  };

  const handleCreateAccount = async (values) => {
    // Add the user to Firestore
    try {
      const { id: chatId } = userTmaInfo.user;
      if (!chatId) {
        WebApp.showAlert("Problems receiving chat ID");
        return;
      }
      const userDocRef = doc(collection(firestore, "users"), chatId.toString());
      const newUserAcc = {
        ...values,
        birthday: values.birthday ? values.birthday.toISOString() : null,
        chatId,
      };
      await setDoc(userDocRef, newUserAcc);
      dispatch(setIsSignUpOpen(false));
      dispatch(setUserAccount({ ...newUserAcc, id: chatId }));
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
  };
};
