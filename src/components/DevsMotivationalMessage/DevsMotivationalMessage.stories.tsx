import type { Meta, StoryObj } from "@storybook/react";
import DevsMotivationalMessage from "./DevsMotivationalMessage";
import { AppProviders } from "../../stories/StorybookProviders";

const meta = {
  decorators: [
    (Story) => (
      <AppProviders>
        <Story />
      </AppProviders>
    ),
  ],
  title: "Example/DevsMotivationalMessage",
  component: DevsMotivationalMessage,
  parameters: {},
  argTypes: {
    message: {
      type: "string",
    },
  },
  args: {},
} satisfies Meta<typeof DevsMotivationalMessage>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    message: "Hello, World!",
  },
};
