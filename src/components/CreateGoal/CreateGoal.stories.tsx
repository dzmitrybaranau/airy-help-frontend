import type { Meta, StoryObj } from "@storybook/react";
import CreateGoal from "./CreateGoal";
import { AppProviders } from "../../stories/StorybookProviders";

const meta = {
  decorators: [
    (Story) => (
      <AppProviders>
        <Story />
      </AppProviders>
    ),
  ],
  title: "Example/CreateGoal",
  component: CreateGoal,
  parameters: {},
  argTypes: {},
  args: {},
} satisfies Meta<typeof CreateGoal>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {},
};
