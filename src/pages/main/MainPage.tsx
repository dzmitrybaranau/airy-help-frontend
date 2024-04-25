import React from "react";
import styles from "./MainPage.module.scss";
import { Loader, Paper } from "@mantine/core";
import useUserAccount from "../../hooks/useUserAccount";
import { UserGoal } from "../../redux/userSlice";
import { Link } from "react-router-dom";

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
      {userAccount?.goals?.length > 0 ? (
        userAccount?.goals?.map((goal: UserGoal) => {
          return (
            <div key={goal.id}>
              <h2>{goal.description}</h2>
            </div>
          );
        })
      ) : (
        <Link to="/account">Add Goals</Link>
      )}
    </div>
  );
}

export default MainPage;
