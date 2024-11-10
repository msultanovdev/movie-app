import type { Meta, StoryObj } from "@storybook/react";
import Dialog from "../components/Dialog/Dialog";
import { useState } from "react";
import Button from "../components/UI/Button/Button";
import MovieForm from "../components/MovieForm/MovieForm";
import { movies } from "../db";

const meta: Meta<typeof Dialog> = {
  title: "Component/Dialog",
  component: Dialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
  args: {},
};

export default meta;

type Story = StoryObj<typeof Dialog>;

export const DialogStory: Story = {
  render: () => {
    const [isAddModal, setIsAddModal] = useState(false);
    const [isEditModal, setIsEditModal] = useState(false);
    const [isRemoveModal, setIsRemoveModal] = useState(false);
    return (
      <>
        <Button style={{ marginRight: 5 }} onClick={() => setIsAddModal(true)}>
          Add movie
        </Button>
        <Button style={{ marginRight: 5 }} onClick={() => setIsEditModal(true)}>
          Edit
        </Button>
        <Button onClick={() => setIsRemoveModal(true)}>Remove movie</Button>
        {isAddModal && (
          <Dialog title={"Dialog"} onClose={() => setIsAddModal(false)}>
            <MovieForm onSubmit={() => {}} />
          </Dialog>
        )}
        {isEditModal && (
          <Dialog title={"Dialog"} onClose={() => setIsEditModal(false)}>
            <MovieForm onSubmit={() => {}} initiaMovieState={movies[0]} />
          </Dialog>
        )}
        {isRemoveModal && (
          <Dialog title={"Dialog"} onClose={() => setIsRemoveModal(false)}>
            <div>
              <p>Are you sure you want to delete this movie?</p>
              <Button style={{ float: "right" }}>Confirm</Button>
            </div>
          </Dialog>
        )}
      </>
    );
  },
  args: {},
};
