import type { Meta, StoryObj } from "@storybook/react";
import Goal from "./Goal";
import { AppProviders } from "../../stories/StorybookProviders";

const meta = {
  decorators: [
    (Story) => (
      <AppProviders>
        <Story />
      </AppProviders>
    ),
  ],
  title: "Example/Goal",
  component: Goal,
  parameters: {},
  argTypes: {
    description: {
      control: {
        type: "text",
      },
    },
    timeEstimates: {
      control: {
        type: "text",
      },
    },
    successPrediction: {
      control: {
        type: "text",
      },
    },
    progressEstimation: {
      control: {
        type: "number",
      },
    },
  },
  args: {
    description: "Learn React",
    timeEstimates: "1 month",
    successPrediction: "High",
    progressEstimation: 40,
  },
} satisfies Meta<typeof Goal>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    description: "Learn React",
    timeEstimates: "1 month",
    successPrediction: "High",
    progressEstimation: 40,
  },
};
