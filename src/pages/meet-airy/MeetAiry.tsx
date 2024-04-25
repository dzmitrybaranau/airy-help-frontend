import React from "react";
import airyPicSrc from "../../pages/main/airy-pic.webp";
import styles from "./MeetAiry.module.scss";
export interface IMeetAiryProps {}

/**
 *
 */
function MeetAiry(props: IMeetAiryProps) {
  const {} = props;
  return (
    <div className={styles.wrapper}>
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
    </div>
  );
}

export default MeetAiry;
