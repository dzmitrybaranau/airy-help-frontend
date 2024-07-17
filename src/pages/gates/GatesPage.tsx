import React, { useEffect, useState } from "react";
import { Button, Checkbox, Text, Title } from "@mantine/core";
import styles from "./GatesPage.module.scss";
import { useNavigate } from "react-router-dom";

const GatesScreen = () => {
  const BREATH_AMOUNT = 7;
  const navigate = useNavigate();
  const [started, setStarted] = useState(false);
  const [breaths, setBreaths] = useState(BREATH_AMOUNT);
  const [checked, setChecked] = useState({
    noDistractions: false,
    goodIntentions: false,
    commitment: false,
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
          <Title fz="h1" c="#fff" className={styles.welcome} mb={24}>
            Achieve. Effectively
          </Title>
          <Text c="#fff" fz="h2" lh="24px" fw={700} w="100%" ta="left">
            What I need from You
          </Text>
          <div className={styles.welcomeIntro}>
            <div className={styles.needBox}>
              <Text>Focus</Text>
              <div>Icon</div>
            </div>
            <div className={styles.needBox}>
              <Text>Time</Text>
              <div>15 minutes</div>
            </div>
            <div className={styles.needBox}>
              <Text>Attention</Text>
              <div>icon</div>
            </div>
          </div>
          <Button
            variant="light"
            size="xs"
            onClick={handleStart}
            className={styles.startButton}
          >
            Let's Begin
          </Button>
        </>
      )}
      {started && breaths > 0 && (
        <>
          <div
            className={`${styles.breathCircle} ${breaths % 2 === 0 ? styles.inhale : styles.exhale}`}
          >
            <span>
              {breaths === BREATH_AMOUNT
                ? "Prepare to inhale"
                : breaths % 2 === 0
                  ? "Inhale "
                  : "Exhale "}
              {breaths !== BREATH_AMOUNT && `(${breaths})`}
            </span>
          </div>
        </>
      )}
      {!started && breaths === 0 && (
        <>
          <Text className={styles.welcome}>Well done!</Text>
          <Text className={styles.welcomeIntro}>
            Your goals are now much closer to becoming reality. Lastly, let's
            ensure you are in the right environment. Remember, achieving results
            requires time and patience.
          </Text>
          <div>
            <Checkbox
              label="I will be fully focused and free from distractions for the next 10 minutes"
              name="noDistractions"
              checked={checked.noDistractions}
              onChange={handleCheckboxChange}
              className={styles.checkbox}
              mb="xs"
            />
            <Checkbox
              label="I am approaching this with a clear mind and strong intentions"
              name="goodIntentions"
              checked={checked.goodIntentions}
              onChange={handleCheckboxChange}
              mb="xs"
              className={styles.checkbox}
            />
            <Checkbox
              label="I am committed to making progress today"
              name="commitment"
              checked={checked.commitment}
              onChange={handleCheckboxChange}
              className={styles.checkbox}
            />
          </div>
          <Button
            variant="light"
            size="xs"
            className={styles.startButton}
            disabled={
              !checked?.noDistractions ||
              !checked?.goodIntentions ||
              !checked?.commitment
            }
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
