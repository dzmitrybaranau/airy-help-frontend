import type { Meta, StoryObj } from "@storybook/react";
import AccountPage from "./AccountPage";
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
  component: AccountPage,
  parameters: {},
  argTypes: {
    isOpen: { control: "boolean" },
  },
  args: {},
} satisfies Meta<typeof AccountPage>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    isOpen: true,
  },
};
