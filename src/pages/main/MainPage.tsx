import React from "react";
import styles from "./MainPage.module.scss";
import airyPicSrc from "./airy-pic.webp";
import CreateAccountModal from "../../components/CreateAccountModal";
import { Loader, Paper } from "@mantine/core";
import { TonConnectButton, useTonAddress } from "@tonconnect/ui-react";
import useUserAccount from "../../hooks/useUserAccount";

export interface IMainPageProps {}

/**
 * Main page
 */
function MainPage(props: IMainPageProps) {
  const userAddress = useTonAddress();
  const { userAccount, isLoading, userExists } = useUserAccount();

  console.log({ userAddress });

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
        Airy is a delightful fairy who is always there for those in need. With
        her gentle and understanding nature, she provides a comforting presence
        for people dealing with mental health issues. Always ready to listen and
        support, Airy is a beacon of hope and a true friend to all.
      </p>
      {!userExists && <CreateAccountModal isOpen={!userExists} />}
    </div>
  );
}

export default MainPage;
