import type { Meta, StoryObj } from "@storybook/react";
import Achievement from "./Achievement";
import { AppProviders } from "../../stories/StorybookProviders";
import { ACHIEVEMENTS } from "./achivements";

const meta = {
  decorators: [
    (Story) => (
      <AppProviders>
        <Story />
      </AppProviders>
    ),
  ],
  title: "Example/Achievement",
  component: Achievement,
  parameters: {},
  argTypes: {},
  args: {},
} satisfies Meta<typeof Achievement>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    isOpen: true,
    cardToRender: { id: ACHIEVEMENTS.FIRST_STEPS.id, isTaken: false },
    takeAchievement: () => {},
  },
};
