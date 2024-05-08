export const openAIGoalSuccessEstimationResponse = {
  estimatedSuccessRate:
    "Percentage of meeting goal in reality, number from 0 to 100",
  estimationRationale: "Explanation what goes right and what goes wrong.",
  realityVsGoalAnalysis:
    "Feedback about what in reality and desired goal is not matching up.",
  recommendedActions: [
    "Realistic action steps to make to achieve goals, it should be string in array. at least 7 actions",
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

export enum UserGender {
  MALE = "Male",
  FEMALE = "Female",
}
export interface UserAccount {
  firstName: string;
  lastName: string;
  email: string;
  gender?: UserGender;
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
