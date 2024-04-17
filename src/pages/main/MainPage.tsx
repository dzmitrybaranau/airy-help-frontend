import React, { useEffect, useState } from "react";
import styles from "./MainPage.module.scss";
import airyPicSrc from "./airy-pic.webp";
import CreateAccountModal from "../../components/CreateAccountModal";
import { collection, doc } from "@firebase/firestore";
import { useFirestoreDocument } from "@react-query-firebase/firestore";
import { Loader, Paper } from "@mantine/core";
import { firestore } from "../../firebase/firebase-config";
import WebApp from "@twa-dev/sdk";

export interface IMainPageProps {}

/**
 * Main page
 */
function MainPage(props: IMainPageProps) {
  const [userId, setUserId] = useState(null);
  const [webAppData, setWebAppData] = useState(WebApp.initData);

  useEffect(() => {
    const checkWebApp = () => {
      if (WebApp.initData !== webAppData) {
        setWebAppData(WebApp.initData);
        // WebApp is ready and initData has changed
        // You can perform your operations here
        const { user } = JSON.parse(decodeURIComponent(WebApp.initData));
        console.log({ user });
        setUserId(user.id);
      }
    };

    // Check WebApp readiness immediately
    checkWebApp();

    // Set an interval to check WebApp readiness periodically
    const intervalId = setInterval(checkWebApp, 1000); // Check every second

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [webAppData]);

  console.log({ userId });

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

  console.log({ usersQuery });

  const userData = usersQuery?.data?.data() ?? null;
  const userExists = usersQuery?.data?.exists() ?? false;

  return (
    <div className={styles.wrapper}>
      <h1>Meet Airy!</h1>
      {userExists && (
        <h2>
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
