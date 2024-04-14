import React from "react";
import styles from "./MainPage.module.scss";
import airyPicSrc from "./airy-pic.webp";
import WebApp from "@twa-dev/sdk";
export interface IMainPageProps {}

/**
 * Main page
 */
function MainPage(props: IMainPageProps) {
  const {} = props;
  return (
    <div className={styles.wrapper}>
      <h1>Meet Airy!</h1>
      <p className={styles.description}>
        Airy is a delightful fairy who is always there for those in need. With
        her gentle and understanding nature, she provides a comforting presence
        for people dealing with mental health issues. Always ready to listen and
        support, Airy is a beacon of hope and a true friend to all.
      </p>
      <img
        alt="airy-helper image"
        src={airyPicSrc}
        className={styles.airyPic}
        onClick={() =>
          WebApp.showPopup({
            title: "Airy",
            message:
              "Hello! I'm Airy, your friendly mental health assistant. How can I help you today?",
            buttons: [
              {
                id: "get-started",
                text: "Get Started",
                type: "default",
              },
            ],
          })
        }
      />
    </div>
  );
}

export default MainPage;
