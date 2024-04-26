import React from "react";
import styles from "./MainPage.module.scss";
import useUserAccount from "../../hooks/useUserAccount";
import { UserGoal } from "../../redux/userSlice";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import DevsMotivationalMessage from "../../components/DevsMotivationalMessage/DevsMotivationalMessage";
import { Space } from "@mantine/core";
import CreateGoal from "../../components/CreateGoal";

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
      {userExists && (
        <>
          <DevsMotivationalMessage
            message={`At the start of the journey, progress may seem invisible, but on the scale, you can already see it`}
          />
          <Space h="xs" />
        </>
      )}
      {userAccount?.goals?.length > 0 ? (
        userAccount?.goals?.map((goal: UserGoal) => {
          return (
            <div key={goal.id}>
              <h2>{goal.description}</h2>
            </div>
          );
        })
      ) : (
        <CreateGoal />
      )}
    </div>
  );
}

export default MainPage;
