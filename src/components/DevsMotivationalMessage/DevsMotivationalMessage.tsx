import React from "react";
import styles from "./DevsMotivationalMessage.module.scss";

export interface IDevsMotivationalMessageProps {
  message: string;
}

/**
 * Motivational message from the devs
 */
function DevsMotivationalMessage({ message }: IDevsMotivationalMessageProps) {
  return (
    <div className={styles.root}>
      <p>
        🙌
        <span className={styles.message}>{message}</span>
      </p>
    </div>
  );
}

export default DevsMotivationalMessage;
