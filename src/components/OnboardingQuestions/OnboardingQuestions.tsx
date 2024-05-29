import React from "react";
import { onboardingJSON } from "airy-help-utils";
import { Input } from "@mantine/core";

export interface IOnboardingQuestionsProps {
  questions: typeof onboardingJSON;
}

/**
 * Onboarding Questions Inputs
 */
function OnboardingQuestions(props: IOnboardingQuestionsProps) {
  const { questions } = props;
  return (
    <div>
      <form style={{ width: "100%" }}>
        <h3>End Goal Clarity</h3>
        {questions.end_goal_clarity.map((question) => (
          <Input.Wrapper
            required
            label={question.question}
            style={{ marginBottom: 12, width: "100%" }}
            size="xs"
          >
            <Input
              placeholder="Losing weight will help me feel more attractive..."
              size="xs"
              style={{
                width: "100%",
              }}
            />
          </Input.Wrapper>
        ))}
        <h3>Current Position Resources</h3>
        {questions.current_position_resources.map((question) => (
          <Input.Wrapper
            required
            label={question.question}
            style={{ marginBottom: 12, width: "100%" }}
            size="xs"
          >
            <Input
              placeholder="Losing weight will help me feel more attractive..."
              size="xs"
              style={{ width: "100%" }}
            />
          </Input.Wrapper>
        ))}
        <h3>Key Capabilities Skills</h3>
        {questions.key_capabilities_skills.map((question) => (
          <Input.Wrapper
            required
            label={question.question}
            style={{ marginBottom: 12, width: "100%" }}
            size="xs"
          >
            <Input
              placeholder="Losing weight will help me feel more attractive..."
              size="xs"
              style={{ width: "100%" }}
            />
          </Input.Wrapper>
        ))}
        <h3>Planning Strategy</h3>
        {questions.planning_strategy.map((question) => (
          <Input.Wrapper
            required
            label={question.question}
            style={{ marginBottom: 12, width: "100%" }}
            size="xs"
          >
            <Input
              placeholder="Losing weight will help me feel more attractive..."
              size="xs"
              style={{ width: "100%" }}
            />
          </Input.Wrapper>
        ))}
      </form>
    </div>
  );
}

export default OnboardingQuestions;
