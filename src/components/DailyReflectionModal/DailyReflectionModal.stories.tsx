import type { Meta, StoryObj } from "@storybook/react";
import DailyReflectionModal from "./DailyReflectionModal";
import { AppProviders } from "../../stories/StorybookProviders";
import { useDailyReflection } from "../../hooks/useDailyReflection";

const meta = {
  decorators: [
    (Story) => {
      const { form, handleSubmit } = useDailyReflection();
      return (
        <AppProviders>
          <Story
            args={{
              form: form,
              isOpen: true,
              onClose: () => {},
              onSubmit: handleSubmit,
              dailyReflection: [
                {
                  reflection: "I did a small step, that’s it",
                  timestamp: "2024-06-29T14:45:59.554Z",
                },
                {
                  timestamp: "2024-07-29T14:46:14.146Z",
                  reflection: "Second Update",
                },
              ],
            }}
          />
        </AppProviders>
      );
    },
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
  // @ts-ignore
  args: {},
};
