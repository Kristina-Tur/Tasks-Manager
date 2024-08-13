import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "@storybook/test"
import { AddItemForm } from "common/components/addItemForm/AddItemForm"
import React, { ChangeEvent, KeyboardEvent, useState } from "react"
import TextField from "@mui/material/TextField"
import IconButton from "@mui/material/IconButton"
import AddBoxIcon from "@mui/icons-material/AddBox"

const meta: Meta<typeof AddItemForm> = {
  title: "Todolist/AddItemForm",
  component: AddItemForm,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: { addItem: fn() },
}

export default meta
type Story = StoryObj<typeof AddItemForm>

export const AddItemFormStory: Story = {}
export const AddItemFormStoryDisabled: Story = {
  args: {
    disabled: true,
  },
}

type AddItemFormType = {
  addItem: (value: string) => void
}

const AddItemFormWithError = React.memo(({ addItem }: AddItemFormType) => {
  console.log("AddItemForm is called")

  const [newTaskTitle, setNewTaskTitle] = useState("")
  const [error, setError] = useState<string | null>("Title is required")

  const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(event.currentTarget.value)
  }

  const onKeyUpInputHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) {
      setError(null)
    }

    if (newTaskTitle.trim() !== "" && newTaskTitle.trim().length < 20) {
      if (event.key === "Enter") {
        addItem(newTaskTitle)
        setNewTaskTitle("")
      }
    } else {
      setError("Title is required")
    }
  }

  const addItemHandler = () => {
    if (newTaskTitle.trim() !== "" && newTaskTitle.trim().length < 20) {
      addItem(newTaskTitle.trim())
      setNewTaskTitle("")
    } else {
      setError("Title is required")
    }
  }

  return (
    <div>
      <TextField
        label="Type value"
        value={newTaskTitle}
        onChange={onChangeInputHandler}
        onKeyUp={onKeyUpInputHandler}
        error={!!error}
        helperText={error}
      />
      <IconButton
        onClick={() => {
          addItemHandler()
        }}
        color={"primary"}
      >
        <AddBoxIcon />
      </IconButton>
    </div>
  )
})

export const AddItemFormWithErrorStory: Story = {
  render: (args) => <AddItemFormWithError addItem={args.addItem} />,
}
