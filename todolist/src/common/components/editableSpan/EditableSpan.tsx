import React from "react"
import TextField from "@mui/material/TextField"
import EditIcon from "@mui/icons-material/Edit"
import { IconButton } from "@mui/material"

type EditableSpan = {
  title: string
  onChange: (title: string) => void
  disabled: boolean
}
export const EditableSpan = React.memo(({ title, onChange, disabled }: EditableSpan) => {
  console.log("EditableSpan")

  const [editMode, setEditMode] = React.useState<boolean>(false)
  const [value, setValue] = React.useState("")

  const activateEditMode = () => {
    setEditMode(true)
    setValue(title)
  }
  const activateViewMode = () => {
    setEditMode(false)
    onChange(value)
  }
  const onChangeValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value)

  return (
    <div style={{ width: "260px" }}>
      {editMode ? (
        <TextField
          disabled={disabled}
          value={value}
          onChange={onChangeValueHandler}
          onBlur={activateViewMode}
          autoFocus
          style={{ width: "170px" }}
        />
      ) : (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ height: "40px", lineHeight: "2.5" }} /*onDoubleClick={activateEditMode}*/>{title}</span>
          <IconButton aria-label="edit">
            <EditIcon onClick={activateEditMode} />
          </IconButton>
        </div>
      )}
    </div>
  )
})
