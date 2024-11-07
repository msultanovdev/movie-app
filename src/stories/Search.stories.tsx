import type { Meta, StoryObj } from "@storybook/react";

import Search from "../components/Search/Search";

const meta = {
  title: "Component/Search",
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    initSearchQuery: {
      control: "text",
      table: {
        defaultValue: { summary: "Search" },
      },
    },
  },
  args: { initSearchQuery: "Search" },
} satisfies Meta<typeof Search>;

export default meta;

type Story = StoryObj<typeof Search>;

export const SearchStory: Story = {
  render: (args) => {
    const handleSearch = () => {
      alert("Searching...");
    };
    return <Search {...args} onSearch={handleSearch} />;
  },
  args: {
    initSearchQuery: "Search",
  },
};
