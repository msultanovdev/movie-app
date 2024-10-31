import type { Meta, StoryObj } from "@storybook/react";

import Counter from "../components/Counter/Counter";

const meta = {
  title: "Component/Counter",
  component: Counter,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    initValue: {
      control: "number",
    },
  },
  args: { initValue: 0 },
} satisfies Meta<typeof Counter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const CounterStory: Story = {
  args: { initValue: 0 },
};
