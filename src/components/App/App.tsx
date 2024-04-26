import React from "react";
import NavMenu from "../NavMenu/NavMenu";
import styles from "./App.module.scss";
import { Outlet } from "react-router-dom";
import useUserAccount from "../../hooks/useUserAccount";
import { Loader } from "@mantine/core";
import AccountPage from "../../pages/account";

function App() {
  const { isLoading, userExists } = useUserAccount();

  if (isLoading) {
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

  // TODO: Make proper redirect
  if (!userExists) {
    return (
      <div className={styles.root}>
        <NavMenu />
        <div className={styles.pageWrapper}>
          <AccountPage />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.root}>
      <NavMenu />
      <div className={styles.pageWrapper}>
        <Outlet />
      </div>
    </div>
  );
}

export default App;
