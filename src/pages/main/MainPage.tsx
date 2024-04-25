import React from "react";
import styles from "./MainPage.module.scss";
import { Loader, Paper } from "@mantine/core";
import useUserAccount from "../../hooks/useUserAccount";
import {UserGoal} from "../../redux/userSlice";

export interface IMainPageProps {}

/**
 * Main page
 */
function MainPage(props: IMainPageProps) {
  const { userAccount, isLoading, userExists } = useUserAccount();

  if (isLoading ?? true) {
    return (
      <Paper className={styles.loadingState}>
        <Loader />
      </Paper>
    );
  }

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.yourGoals}>Your Goals:</h1>
      {userAccount?.goals?.map((goal: UserGoal) => {
        return (
          <div key={goal.id}>
            <h2>{goal.description}</h2>
          </div>
        );
      })}
    </div>
  );
}

export default MainPage;
