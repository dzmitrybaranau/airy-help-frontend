import type { Meta, StoryObj } from "@storybook/react";
import CreateAccountModal from "./CreateAccountModal";
import { AppProviders } from "../../stories/StorybookProviders";

const meta = {
  decorators: [
    (Story) => (
      <AppProviders>
        <Story />
      </AppProviders>
    ),
  ],
  title: "Example/CreateAccountModal",
  component: CreateAccountModal,
  parameters: {},
  argTypes: {
    isOpen: { control: "boolean" },
  },
  args: {},
} satisfies Meta<typeof CreateAccountModal>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    isOpen: true,
  },
};
