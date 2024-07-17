import React, { useEffect } from "react";
import styles from "./GoalPage.module.scss";
import { Helmet } from "react-helmet";
import DevsMotivationalMessage from "../../components/DevsMotivationalMessage/DevsMotivationalMessage";
import { Space } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store";
import GoalContainer from "../../components/GoalsList/GoalContainer";

export interface IMainPageProps {}

/**
 * Main page
 */
function GoalPage(props: IMainPageProps) {
  const navigate = useNavigate();
  const { userAccount, isUserLoading } = useUserStore();

  useEffect(() => {
    if (
      (!isUserLoading && !userAccount?.goals) ||
      userAccount?.goals?.length === 0
    ) {
      return navigate("/create-goal");
    }
  }, [navigate, isUserLoading, userAccount]);

  return (
    <div className={styles.wrapper}>
      <Helmet>
        <title>My Goals</title>
      </Helmet>
      {userAccount && userAccount?.goals?.length > 0 && (
        <>
          <DevsMotivationalMessage />
          <Space h="xs" />
        </>
      )}
      <GoalContainer />
    </div>
  );
}

export default GoalPage;
