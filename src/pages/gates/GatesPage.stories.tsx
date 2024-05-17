import type { Meta, StoryObj } from "@storybook/react";
import GatesPage from "./GatesPage";
import { AppProviders } from "../../stories/StorybookProviders";

const meta = {
  decorators: [
    (Story) => (
      <AppProviders>
        <Story />
      </AppProviders>
    ),
  ],
  title: "Example/GatesPage",
  component: GatesPage,
  parameters: {},
  argTypes: {
    isOpen: { control: "boolean" },
  },
  args: {},
} satisfies Meta<typeof GatesPage>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    isOpen: true,
  },
};
