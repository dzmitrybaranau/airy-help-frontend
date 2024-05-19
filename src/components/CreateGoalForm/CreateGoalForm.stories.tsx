import type { Meta, StoryObj } from "@storybook/react";
import CreateGoalForm from "./CreateGoalForm";
import { AppProviders } from "../../stories/StorybookProviders";

const meta = {
  decorators: [
    (Story) => (
      <AppProviders>
        <Story />
      </AppProviders>
    ),
  ],
  title: "Example/CreateGoalForm",
  component: CreateGoalForm,
  parameters: {},
  argTypes: {},
  args: {},
} satisfies Meta<typeof CreateGoalForm>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    userId: "1234",
  },
};
