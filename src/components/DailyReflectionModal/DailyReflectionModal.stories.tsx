import type { Meta, StoryObj } from "@storybook/react";
import DailyReflectionModal from "./DailyReflectionModal";
import { AppProviders } from "../../stories/StorybookProviders";

const meta = {
  decorators: [
    (Story) => (
      <AppProviders>
        <Story />
      </AppProviders>
    ),
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
  args: {
    isOpen: true,
    onClose: () => {},
  },
};
