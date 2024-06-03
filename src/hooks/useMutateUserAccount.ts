import WebApp from "@twa-dev/sdk";
import { collection, doc, setDoc } from "@firebase/firestore";
import { firestore } from "../firebase/firebase-config";
import { useNavigate } from "react-router-dom";
import { UserAccount } from "airy-help-utils";
import { useUserStore } from "../store";

export const useMutateUserAccount = () => {
  const navigate = useNavigate();
  const { userAccount, setUserAccount, userTmaInfo } = useUserStore();

  const handleCreateAccount = async () => {
    try {
      const chatId = userTmaInfo?.user?.id;
      if (!chatId) {
        WebApp.showAlert("Problems receiving chat ID");
        return;
      }
      const userDocRef = doc(collection(firestore, "users"), chatId.toString());

      const newUserAcc: UserAccount = {
        chatId: chatId.toString(),
        firstName: userTmaInfo?.user?.first_name ?? "",
        lastName: userTmaInfo?.user?.last_name ?? "",
        achievementsId: [],
        onboarded: false,
        goals: [],
        onboardingQuestions: {
          current_position_resources: [],
          end_goal_clarity: [],
          key_capabilities_skills: [],
          planning_strategy: [],
          adaptability_resilience: [],
          potential_obstacles_mitigation: [],
          support_assistance: [],
        },
        goalSuccessPrediction: {
          estimatedSuccessRate: ``,
          estimationRationale: ``,
          realityVsGoalAnalysis: ``,
          recommendedActions: [],
          moreQuestionsToAsk: [],
        },
        dailyReflection: [],
      };

      await setDoc(userDocRef, newUserAcc);
      setUserAccount(newUserAcc);
      if (userAccount) {
        WebApp.showAlert("Account updated");
      }
      navigate("/");
    } catch (e) {
      WebApp.showAlert("Error creating account.", e.toString());
    }
  };

  return {
    handleCreateAccount,
  };
};
