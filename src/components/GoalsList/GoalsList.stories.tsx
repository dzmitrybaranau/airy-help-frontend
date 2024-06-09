import type { Meta, StoryObj } from "@storybook/react";
import GoalsList from "./GoalsList";
import { AppProviders } from "../../stories/StorybookProviders";

const meta = {
  decorators: [
    (Story) => (
      <AppProviders>
        <Story />
      </AppProviders>
    ),
  ],
  title: "Example/GoalList",
  component: GoalsList,
  parameters: {},
  argTypes: {},
  args: {},
} satisfies Meta<typeof GoalsList>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    description:
      "Make best AI bot that will help people achieve their dreams and goals",
    // recommendedActions: [
    //   "Define clear Objectives and Key Results (OKRs) to track progress and make necessary adjustments",
    //   "Identify and leverage your specific skills and expertise to enhance your app's potential.",
    //   "Reflect on past hackathon experiences to learn and improve your approach.",
    //   "Establish effective collaboration with team members and seek external support for enhancing your app's competitiveness.",
    //   "Develop a compelling strategy for presenting and pitching your app to the judges.",
    // ],
    // estimatedSuccessRate: "40"
  },
};
