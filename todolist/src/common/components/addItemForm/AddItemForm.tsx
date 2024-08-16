import React, { ChangeEvent, KeyboardEvent, useState } from "react"
import TextField from "@mui/material/TextField"
import IconButton from "@mui/material/IconButton"
import AddBoxIcon from "@mui/icons-material/AddBox"
import { useAddItemForm } from "common/components/addItemForm/hooks/useAddItemForm"
import EditIcon from "@mui/icons-material/Edit"

type AddItemFormType = {
  addItem: (value: string) => void
  disabled?: boolean
}

export const AddItemForm = React.memo(({ addItem, disabled = false }: AddItemFormType) => {
  console.log("AddItemForm is called")

  const { newTaskTitle, error, onChangeInputHandler, onKeyUpInputHandler, addItemHandler } = useAddItemForm(addItem)

  return (
    <div>
      <TextField
        label="Type value"
        disabled={disabled}
        value={newTaskTitle}
        onChange={onChangeInputHandler}
        onKeyUp={onKeyUpInputHandler}
        error={!!error}
        helperText={error}
      />
      <IconButton
        disabled={disabled}
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
