import React from "react";
import NavMenu from "../NavMenu/NavMenu";
import styles from "./App.module.scss";
import { Outlet } from "react-router-dom";
import useLoadUserAccount from "../../hooks/useLoadUserAccount";
import { Loader } from "@mantine/core";
import { useUserStore } from "../../store";
import Achievement from "../Achievement";

function App() {
  const { isUserLoading } = useUserStore();
  useLoadUserAccount();

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
      <Achievement />
    </div>
  );
}

export default App;
