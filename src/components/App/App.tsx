import React, { useEffect } from "react";
import NavMenu from "../NavMenu/NavMenu";
import styles from "./App.module.scss";
import { Outlet } from "react-router-dom";
import useLoadUserAccount from "../../hooks/useLoadUserAccount";
import { Loader } from "@mantine/core";
import { useUserStore } from "../../store";
import { AchievementContainer } from "../Achievement";
import { useMutateUserAccount } from "../../hooks/useMutateUserAccount";

function App() {
  const { isUserLoading, userAccount } = useUserStore();
  useLoadUserAccount();
  const { handleCreateAccount } = useMutateUserAccount();
  useEffect(() => {
    if (!isUserLoading && !userAccount?.chatId) {
      handleCreateAccount();
    }
  }, [isUserLoading, handleCreateAccount, userAccount]);

  if (isUserLoading) {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Loader />
      </div>
    );
  }

  return (
    <div className={styles.root}>
      <NavMenu />
      <div className={styles.pageWrapper}>
        <Outlet />
      </div>
      <AchievementContainer />
    </div>
  );
}

export default App;
