// src/stories/mocks/useUserStoreMock.js

const useUserStoreMock = () => ({
  userAccount: {
    goals: [
      {
        description: "Learn React",
      },
    ],
    goalSuccessPrediction: {
      estimatedSuccessRate: "40%",
      estimationRationale: "High engagement and timely progress updates.",
      realityVsGoalAnalysis:
        "On track to meet the end-of-quarter expectations.",
      recommendedActions: [
        "Define clear Objectives and Key Results (OKRs).",
        "Leverage specific skills to enhance app potential.",
        "Reflect on past experiences to improve approach.",
        "Collaborate effectively and seek external support.",
        "Develop a compelling pitch for potential stakeholders.",
      ],
    },
  },
});

export default useUserStoreMock;
