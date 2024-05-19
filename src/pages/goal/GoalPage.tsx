import React, { useEffect } from "react";
import styles from "./GoalPage.module.scss";
import useUserAccount from "../../hooks/useUserAccount";
import { Helmet } from "react-helmet";
import DevsMotivationalMessage from "../../components/DevsMotivationalMessage/DevsMotivationalMessage";
import { Space } from "@mantine/core";
import CreateGoalForm from "../../components/CreateGoalForm";
import Goal from "../../components/Goal";
import { useNavigate } from "react-router-dom";

export interface IMainPageProps {}

/**
 * Main page
 */
function GoalPage(props: IMainPageProps) {
  const navigate = useNavigate();
  const { userAccount, userExists, isLoading } = useUserAccount();

  useEffect(() => {
    if (!isLoading && userAccount?.goals?.length === 0) {
      navigate("/create-goal");
    }
  }, [navigate, isLoading, userAccount]);

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
      {userAccount?.goals?.map((goal) => {
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
      })}
    </div>
  );
}

export default GoalPage;
