export const openAIGoalSuccessEstimationResponse = {
  estimatedSuccessRate: "brutal estimation for user as number from 0 to 100",
  estimationRationale: "brutal explanation of estimation",
  realityVsGoalAnalysis:
    "give brutal feedback about what in reality and desired goal is not matching up",
  recommendedActions: [
    "Give brutal realistic action steps to make to achieve goals, it should be string in array",
  ],
  moreQuestionsToAsk: [
    {
      question: "string",
      reasonToAsk: "string",
      importanceForSuccess: "number from 0 to 100",
    },
  ],
};

export const openAIReplyOnboardingQuestionsExample = {
  preparationMessage:
    "Provide a concise statement summarizing the initial assessment and intended guidance.",
  questions: {
    userRelated: [
      {
        question: "string",
        reasonToAsk: "string",
        importanceForSuccess: "number from 0 to 100",
        userReply: "",
      },
    ],
    goalRelated: [
      {
        question: "string",
        reasonToAsk: "string",
        importanceForSuccess: "number from 0 to 100",
        userReply: "",
      },
    ],
    userEnvironmentRelated: [
      {
        question: "string",
        reasonToAsk: "string",
        importanceForSuccess: "number from 0 to 100",
        userReply: "",
      },
    ],
  },
};

export interface UserGoal {
  id?: string;
  description: string;
  prediction?: typeof openAIGoalSuccessEstimationResponse;
}

export interface UserAccount {
  firstName: string;
  lastName: string;
  email: string;
  gender?: "M" | "F" | "N/A";
  favoriteMusicGenre: string;
  birthdayYear?: string;
  birthdayMonth?: string;
  birthdayDay?: string;
  threadId: string;
  chatId: string;
  paymentPending: boolean;
  goals: UserGoal[];
  onboarded: boolean;
  onboardingQuestions?: typeof openAIReplyOnboardingQuestionsExample;
}
