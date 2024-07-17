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
    isJournalOpen: { control: "boolean" },
  },
  args: {
    isJournalOpen: true,
    onCloseJournal: () => {},
    onJournalOpen: () => {},
    name: "Create Telegram App",
    id: "1",
    reason: "",
    createdAt: "",
  },
} satisfies Meta<typeof Goal>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {},
};
