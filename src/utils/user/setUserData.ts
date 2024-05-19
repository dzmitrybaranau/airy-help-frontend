import { DocumentReference, setDoc } from "@firebase/firestore";
import { UserAccount } from "../../types/user.type";

export const setUserData = async ({
  userRef,
  newUserData,
}: {
  userRef: DocumentReference;
  newUserData: UserAccount;
}) => {
  return await setDoc(userRef, newUserData);
};
