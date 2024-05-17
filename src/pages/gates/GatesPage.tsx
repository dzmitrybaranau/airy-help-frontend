import React, { useEffect, useState } from "react";
import { Button, Checkbox, Stack, Text } from "@mantine/core";
import styles from "./GatesPage.module.scss";
import { useNavigate } from "react-router-dom";

const GatesScreen = () => {
  const navigate = useNavigate();
  const [started, setStarted] = useState(false);
  const [breaths, setBreaths] = useState(2);
  const [checked, setChecked] = useState({
    noDistractions: false,
    goodIntentions: false,
  });

  const handleStart = () => {
    setStarted(true);
  };

  const handleCheckboxChange = (e) => {
    setChecked({ ...checked, [e.target.name]: e.target.checked });
  };

  useEffect(() => {
    if (started && breaths > 0) {
      const interval = setInterval(() => {
        setBreaths((prev) => prev - 1);
      }, 2500);
      return () => clearInterval(interval);
    }
  }, [started, breaths]);

  useEffect(() => {
    if (breaths === 0) {
      setStarted(false);
    }
  }, [breaths]);

  const handleEnter = () => {
    navigate("/goals");
  };
  return (
    <div className={styles.root}>
      {!started && breaths > 0 && (
        <>
          <Text className={styles.welcome}>Welcome to Airy Gates!</Text>
          <Text className={styles.welcomeIntro}>
            Before start, I want you to get into an
            <span> awareness</span> state. Let’s do quick breath work!
          </Text>
          <Button
            variant="light"
            size="xs"
            onClick={handleStart}
            className={styles.startButton}
          >
            Start
          </Button>
        </>
      )}
      {started && breaths > 0 && (
        <div>
          <div
            className={`${styles.breathCircle} ${breaths % 2 === 0 ? styles.inhale : styles.exhale}`}
          >
            {breaths % 2 === 0 ? "Inhale" : "Exhale"}
          </div>
        </div>
      )}
      {!started && breaths === 0 && (
        <>
          <Text className={styles.welcome}>Let's Start</Text>
          <Text className={styles.welcomeIntro}>
            Now your goals are much closer to becoming real. Let’s ensure you
            are in the right environment and state of mind. Remember, achieving
            results takes time and patience.
          </Text>
          <div>
            <Checkbox
              label="I will not have distractions for the next 10 minutes"
              name="noDistractions"
              checked={checked.noDistractions}
              onChange={handleCheckboxChange}
              className={styles.checkbox}
              mb="xs"
            />
            <Checkbox
              label="I’m coming with good intentions"
              name="goodIntentions"
              checked={checked.goodIntentions}
              onChange={handleCheckboxChange}
            />
          </div>
          <Button
            variant="light"
            size="xs"
            className={styles.startButton}
            disabled={!checked?.noDistractions || !checked?.goodIntentions}
            mt="md"
            onClick={handleEnter}
          >
            Enter Airy
          </Button>
        </>
      )}
    </div>
  );
};

export default GatesScreen;
