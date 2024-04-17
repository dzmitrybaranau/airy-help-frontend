import React, { useLayoutEffect, useState } from "react";
import styles from "./MainPage.module.scss";
import airyPicSrc from "./airy-pic.webp";
import CreateAccountModal from "../../components/CreateAccountModal";
import { doc, getDoc } from "@firebase/firestore";
import { Loader, Paper } from "@mantine/core";
import { getTmaUserInfo } from "../../components/CreateAccountModal/CreateAccountModal";
import { firestore } from "../../firebase/firebase-config";

export interface IMainPageProps {}

/**
 * Main page
 */
function MainPage(props: IMainPageProps) {
  const [userId, setUserId] = useState<string>(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    const { id } = getTmaUserInfo();
    setUserId(id);
  }, []);

  useLayoutEffect(() => {
    async function fetchUser() {
      if (!userId) return;

      try {
        const docRef = doc(firestore, "users", userId?.toString());
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUser(docSnap.data()); // Use data
          setLoading(false);
        } else {
          console.log("No such document!");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        setLoading(false);
      }
    }

    fetchUser();
  }, [userId]); // Re-run when userId changes

  if (loading) {
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

  return (
    <div className={styles.wrapper}>
      <h1>Meet Airy!</h1>
      {userId && (
        <h2>
          Hey {user?.firstName} {user?.lastName}
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
      <CreateAccountModal isOpen={!userId} />
    </div>
  );
}

export default MainPage;
