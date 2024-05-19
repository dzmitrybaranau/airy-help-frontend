import { DocumentReference } from "@firebase/firestore";
import { setUserData } from "./setUserData";
import {UserAccount} from "airy-help-utils";

export const saveOnboardingQuestionAnswer = async ({
  category,
  replyMessage,
  user,
  userRef,
  text,
}: {
  userRef: DocumentReference;
  user: UserAccount;
  category: string;
  replyMessage: string;
  text: string;
}) => {
  await setUserData({
    userRef,
    newUserData: {
      ...user,
      onboardingQuestions: {
        ...user.onboardingQuestions,
        // @ts-ignore
        questions: {
          ...user.onboardingQuestions?.questions,
          [category]: user.onboardingQuestions?.questions[category].map(
            (question: { question: string }) => {
              if (question.question === replyMessage) {
                return {
                  ...question,
                  userReply: text,
                };
              }
              return question;
            },
          ),
        },
      },
    },
  });
};
