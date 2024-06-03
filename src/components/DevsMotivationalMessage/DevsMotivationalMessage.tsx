import React from "react";
import styles from "./DevsMotivationalMessage.module.scss";
import { useUserStore } from "../../store";

export interface IDevsMotivationalMessageProps {}

/**
 * Motivational message from the devs
 */
function DevsMotivationalMessage() {
  const userAccount = useUserStore((state) => state.userAccount);
  const message = userAccount?.onboarded
    ? "🙌🏼 At the start of the journey, progress may seem invisible, but on the scale, you can already see it"
    : "First step is done, congratulations! You showed your dedication and I hope you are excited about your new journey";

  return (
    <div className={styles.root}>
      <p>
        <span className={styles.message}>{message}</span>
      </p>
    </div>
  );
}

export default DevsMotivationalMessage;
