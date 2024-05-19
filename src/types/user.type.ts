export const openAINotificationsJson = {
  responseInitiation: `1. Greets the me personally in a friendly way, you can simplify name if possible.
    2. Remind what goal I'm working on and give your evaluation.
    3. Encourages me to share today's progress.`,
  insightInformation: "4. Provides a professional insight related to my goal.",
};

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
        question:
          "Question about user that is related to the goal and from mentor standpoint is very important for success",
        reasonToAsk: "string",
        importanceForSuccess: "number from 0 to 100",
        userReply: "",
      },
    ],
    goalRelated: [
      {
        question:
          "Question about goal from mentor standpoint is very important for success",
        reasonToAsk: "string",
        importanceForSuccess: "number from 0 to 100",
        userReply: "",
      },
    ],
    userEnvironmentRelated: [
      {
        question:
          "Question about user environment factors from mentor standpoint is very important for success",
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
  createdAt?: string;
  why?: string;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
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
  chatHistory?: ChatMessage[];
  goalSuccess: {
    estimationDate: string | null;
    prediction: typeof openAIGoalSuccessEstimationResponse | null;
  };
}
