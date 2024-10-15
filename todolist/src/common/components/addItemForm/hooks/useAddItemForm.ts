import { ChangeEvent, KeyboardEvent, useState } from "react"
import { unwrapResult } from "@reduxjs/toolkit"

export const useAddItemForm = (addItem: (value: string) => Promise<any>) => {
  const [newTaskTitle, setNewTaskTitle] = useState("")
  const [error, setError] = useState<string | null>(null)

  const setNewTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(event.currentTarget.value)
  }
  const createItemHandler = () => {
    if (newTaskTitle.trim() !== "" && newTaskTitle.trim().length < 20) {
      addItem(newTaskTitle.trim())
        .then(unwrapResult)
        .then((res) => {
          setNewTaskTitle("")
        })
    } else {
      setError("The length of the header should be no more than 20 characters")
    }
  }
  const keyUpAddItemHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (error !== null) {
      setError(null)
    }
    if (event.key === "Enter") {
      createItemHandler()
    }
  }

  const addItemHandler = () => {
    createItemHandler()
  }

  return {
    newTaskTitle,
    error,
    setNewTaskTitleHandler,
    keyUpAddItemHandler,
    addItemHandler,
  }
}
