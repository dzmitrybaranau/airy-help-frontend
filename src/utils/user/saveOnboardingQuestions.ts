import { doc, getDoc } from "@firebase/firestore";
import {
  openAIReplyOnboardingQuestionsExample,
  UserAccount,
} from "../../types/user.type";
import { firestore } from "../../firebase/firebase-config";
import {setUserData} from "./setUserData";

export const saveOnboardingQuestions = async ({
  chatId,
  onboardingQuestions,
}: {
  chatId: string;
  onboardingQuestions: typeof openAIReplyOnboardingQuestionsExample;
}) => {
  const userRef = doc(firestore, "users", chatId);
  const userDoc = await getDoc(userRef);
  const userData = userDoc.data() as UserAccount;
  await setUserData({
    userRef,
    newUserData: {
      ...userData,
      onboardingQuestions: onboardingQuestions,
      onboarded: false,
    },
  });
};
