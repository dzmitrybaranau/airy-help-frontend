import { doc, getDoc } from "@firebase/firestore";
import { UserAccount } from "../../types/user.type";
import { firestore } from "../../firebase/firebase-config";

// function should do something about not having information, or function should only throw an error and it should be handled whithin a function that calls this one?
export const getUserGoal = async ({
  chatId,
  user,
}: {
  chatId?: string;
  user?: UserAccount;
}) => {
  if (user && user?.goals?.[0]?.id) {
    return user.goals[0];
  }
  if (chatId) {
    const userRef = doc(firestore, "users", chatId.toString());
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      const userData = userDoc.data() as UserAccount;
      if (userData?.goals?.[0].id) {
        return userData.goals[0];
      }
    }
  }
  throw new Error("User goal not found");
};
