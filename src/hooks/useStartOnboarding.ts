import axios from "axios";
import { useUserStore } from "../store";

export const useStartOnboarding = () => {
  const userAccount = useUserStore((state) => state.userAccount);

  const handleStartOnboarding = async () => {
    if (userAccount?.chatId) {
      console.log(
        "Starting onboarding for user",
        process.env.REACT_APP_API_ENDPOINT,
        userAccount.chatId,
      );
      await axios.post(
        `${process.env.REACT_APP_API_ENDPOINT}/start-onboarding`,
        {
          chatId: userAccount.chatId,
        },
      );
    }
  };

  return { handleStartOnboarding };
};
