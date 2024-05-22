import { doc, getDoc } from "@firebase/firestore";
import { firestore } from "../../firebase/firebase-config";
import { UserAccount } from "airy-help-utils";

export const getUser = async ({ chatId }: { chatId: string }) => {
  const userRef = doc(firestore, "users", chatId.toString());
  const userDoc = await getDoc(userRef);
  if (userDoc.exists()) {
    return userDoc.data() as UserAccount;
  }
  return undefined;
};
