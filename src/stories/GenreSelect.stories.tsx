import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import GenreSelect from "../components/GenreSelect/GenreSelect";

const meta: Meta<typeof GenreSelect> = {
  title: "Component/GenreSelect",
  component: GenreSelect,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    genres: {
      control: "object",
    },
    selectedGenre: {
      control: "text",
    },
  },
  args: {
    genres: ["Rock", "Pop", "Jazz", "Classical", "Hip Hop"],
    selectedGenre: "Pop",
  },
};

export default meta;

type Story = StoryObj<typeof GenreSelect>;

export const GenreSelectStory: Story = {
    render: (args) => {
        const [selectedGenre, setSelectedGenre] = useState(args.selectedGenre);
        const handleSelect = (genre: string) => {
            setSelectedGenre(genre);
         };
     
        return <GenreSelect {...args} selectedGenre={selectedGenre} onSelect={handleSelect} />;
      },
  args: {
    genres: ["Rock", "Pop", "Jazz", "Classical", "Hip Hop"],
    selectedGenre: "Rock",
  },
};
