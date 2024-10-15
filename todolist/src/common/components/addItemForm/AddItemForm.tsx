import React from "react"
import TextField from "@mui/material/TextField"
import IconButton from "@mui/material/IconButton"
import AddBoxIcon from "@mui/icons-material/AddBox"
import { useAddItemForm } from "common/components/addItemForm/hooks/useAddItemForm"

type Props = {
  addItem: (value: string) => Promise<any>
  disabled?: boolean
}

export const AddItemForm = React.memo(({ addItem, disabled = false }: Props) => {
  const { newTaskTitle, error, setNewTaskTitleHandler, keyUpAddItemHandler, addItemHandler } = useAddItemForm(addItem)

  return (
    <div>
      <TextField
        label="Type value"
        disabled={disabled}
        value={newTaskTitle}
        onChange={setNewTaskTitleHandler}
        onKeyUp={keyUpAddItemHandler}
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
