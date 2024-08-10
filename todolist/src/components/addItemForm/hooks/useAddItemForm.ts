import { ChangeEvent, KeyboardEvent, useState } from "react"

export const useAddItemForm = (addItem: (value: string) => void) => {
  const [newTaskTitle, setNewTaskTitle] = useState("")
  const [error, setError] = useState<string | null>(null)

  const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(event.currentTarget.value)
  }

  const onKeyUpInputHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) {
      setError(null)
    }

    if (newTaskTitle.trim() !== "" /* && newTaskTitle.trim().length < 20*/) {
      if (event.key === "Enter") {
        addItem(newTaskTitle)
        setNewTaskTitle("")
      }
    } else {
      setError("Title is required")
    }
  }

  const addItemHandler = () => {
    if (newTaskTitle.trim() !== "" /* && newTaskTitle.trim().length < 20*/) {
      addItem(newTaskTitle.trim())
      setNewTaskTitle("")
    } else {
      setError("Title is required")
    }
  }

  return {
    newTaskTitle,
    error,
    onChangeInputHandler,
    onKeyUpInputHandler,
    addItemHandler,
  }
}
