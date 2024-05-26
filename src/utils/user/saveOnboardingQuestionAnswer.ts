import { DocumentReference } from "@firebase/firestore";
import { setUserData } from "./setUserData";
import { UserAccount } from "airy-help-utils";

export const saveOnboardingQuestionAnswer = async ({

}: {
  userRef: DocumentReference;
  user: UserAccount;
  category: string;
  text: string;
}) => {};
