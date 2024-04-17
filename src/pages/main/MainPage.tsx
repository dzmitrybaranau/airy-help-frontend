import React, { useLayoutEffect, useState } from "react";
import styles from "./MainPage.module.scss";
import airyPicSrc from "./airy-pic.webp";
import CreateAccountModal from "../../components/CreateAccountModal";
import { collection, doc } from "@firebase/firestore";
import { useFirestoreDocument } from "@react-query-firebase/firestore";
import { Loader, Paper } from "@mantine/core";
import { getTmaUserInfo } from "../../components/CreateAccountModal/CreateAccountModal";
import { firestore } from "../../firebase/firebase-config";

export interface IMainPageProps {}

/**
 * Main page
 */
function MainPage(props: IMainPageProps) {
  const [userId, setUserId] = useState(null);

  useLayoutEffect(() => {
    const { id } = getTmaUserInfo();
    setUserId(id);
  }, []);

  let ref = userId ? doc(collection(firestore, "users"), userId) : null;
  const usersQuery = useFirestoreDocument(["users"], ref, null, {
    enabled: !!userId,
  });

  if (usersQuery?.isLoading ?? true) {
    return (
      <Paper
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Loader />
      </Paper>
    );
  }

  const userData = usersQuery?.data?.data() ?? null;
  const userExists = usersQuery?.data?.exists() ?? false;

  return (
    <div className={styles.wrapper}>
      <h1>Meet Airy!</h1>
      {userExists && (
        <h2 className={styles.userName}>
          Hey {userData.firstName} {userData.lastName}
        </h2>
      )}
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
      <CreateAccountModal isOpen={!userExists} />
    </div>
  );
}

export default MainPage;
