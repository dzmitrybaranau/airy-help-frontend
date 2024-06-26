import type { Meta, StoryObj } from "@storybook/react";
import DailyReflectionModal from "./DailyReflectionModal";
import { AppProviders } from "../../stories/StorybookProviders";
import { useDailyReflection } from "../../hooks/useDailyReflection";

const meta = {
  decorators: [
    (Story) => {
      const { form, handleSubmit } = useDailyReflection();
      return (
        <AppProviders>
          <Story
            args={{
              form: form,
              isOpen: true,
              onClose: () => {},
              onSubmit: handleSubmit,
              userAccount: {
                firstName: "Dzmitry",
                chatId: "1313",
                lastName: "Baranau",
                goals: [],
                dailyReflection: [],
                onboarded: true,
                goalSuccessPrediction: {
                  moreQuestionsToAsk: [],
                  recommendedActions: [],
                  realityVsGoalAnalysis: "",
                  estimatedSuccessRate: "",
                  estimationRationale: "",
                },
                achievementsId: [],
              },
            }}
          />
        </AppProviders>
      );
    },
  ],
  title: "Example/DailyReflectionModal",
  component: DailyReflectionModal,
  parameters: {},
  argTypes: {},
  args: {},
} satisfies Meta<typeof DailyReflectionModal>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  // @ts-ignore
  args: {},
};
