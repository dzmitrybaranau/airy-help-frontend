import React from "react";
import styles from "./MainPage.module.scss";
import useUserAccount from "../../hooks/useUserAccount";
import { Helmet } from "react-helmet";
import DevsMotivationalMessage from "../../components/DevsMotivationalMessage/DevsMotivationalMessage";
import { Space } from "@mantine/core";
import CreateGoal from "../../components/CreateGoal";
import Goal from "../../components/Goal";

export interface IMainPageProps {}

/**
 * Main page
 */
function MainPage(props: IMainPageProps) {
  const { userAccount, userExists } = useUserAccount();

  return (
    <div className={styles.wrapper}>
      <Helmet>
        <title>My Goals</title>
      </Helmet>
      {userExists && userAccount?.goals?.length > 0 && (
        <>
          <DevsMotivationalMessage
            message={`At the start of the journey, progress may seem invisible, but you can see at the prediction estimation`}
          />
          <Space h="xs" />
        </>
      )}
      {userAccount?.goals?.length > 0 ? (
        userAccount?.goals?.map((goal) => {
          return (
            <Goal
              description={goal.description}
              key={goal?.id || goal.description}
              estimatedSuccessRate={
                userAccount?.goalSuccess?.prediction?.estimatedSuccessRate
              }
              estimationRationale={
                userAccount?.goalSuccess?.prediction?.estimationRationale
              }
              recommendedActions={
                userAccount?.goalSuccess?.prediction?.recommendedActions
              }
              moreQuestionsToAsk={
                userAccount?.goalSuccess?.prediction?.moreQuestionsToAsk
              }
              realityVsGoalAnalysis={
                userAccount?.goalSuccess?.prediction?.realityVsGoalAnalysis
              }
            />
          );
        })
      ) : (
        <CreateGoal userId={userAccount?.chatId} />
      )}
    </div>
  );
}

export default MainPage;
