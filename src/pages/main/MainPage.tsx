import React from "react";
import styles from "./MainPage.module.scss";
import airyPicSrc from "./airy-pic.webp";
import CreateAccountModal from "../../components/CreateAccountModal";
import { Loader, Paper } from "@mantine/core";
import { TonConnectButton } from "@tonconnect/ui-react";
import useUserAccount from "../../hooks/useUserAccount";
import UserInfoModal from "../../components/AccountInfoModal";

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
      {userExists && (
        <h2 className={styles.userName}>
          Hey {userAccount.firstName} {userAccount.lastName}
        </h2>
      )}

      <div className={styles.connectButton}>
        <TonConnectButton />
      </div>

      <h1>Meet Airy!</h1>
      <img
        alt="airy-helper image"
        src={airyPicSrc}
        className={styles.airyPic}
      />
      <p className={styles.description}>
        Hi! I'm Airy, a wise friend here to help you reach your dreams. Whether
        it's learning, growing, or winning, I'll guide and cheer you on. Your
        secrets are safe with me. Got a question? Just ask, and let’s make your
        dreams come true together!
      </p>
      {!userExists && <CreateAccountModal />}
      {userExists && <UserInfoModal />}
    </div>
  );
}

export default MainPage;
