import React, { useEffect } from "react";
import NavMenu from "../NavMenu/NavMenu";
import styles from "./App.module.scss";
import { Outlet, useNavigate } from "react-router-dom";
import useUserAccount from "../../hooks/useUserAccount";
import { Loader } from "@mantine/core";

function App() {
  const { isLoading, userExists } = useUserAccount();
  const navigate = useNavigate();

  useEffect(() => {
    console.log({ isLoading, userExists });
    if (!isLoading && !userExists) {
      navigate("/account");
    }
  }, [isLoading, userExists, navigate]);

  if (isLoading) {
    return (
      <div className={styles.root}>
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
    </div>
  );
}

export default App;
