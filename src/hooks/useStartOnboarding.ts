import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import axios from "axios";

export const useStartOnboarding = () => {
  const userAccount = useSelector((state: RootState) => state.user.userAccount);

  const handleStartOnboarding = async () => {
    if (userAccount.chatId) {
      console.log("Starting onboarding for user", userAccount.chatId);
      await axios.post(`${process.env.API_ENDPOINT}/start-onboarding`, {
        chatId: userAccount.chatId,
      });
    }
  };

  return { handleStartOnboarding };
};
