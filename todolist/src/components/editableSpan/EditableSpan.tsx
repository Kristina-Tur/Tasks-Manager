import React from "react";
import TextField from "@mui/material/TextField";

type EditableSpan = {
    title: string
    onChange: (title: string) => void
    disabled: boolean
}
export const EditableSpan = React.memo(({title, onChange, disabled}: EditableSpan) => {

    console.log('EditableSpan')

    const [editMode, setEditMode] = React.useState<boolean>(false)
    const [value, setValue] = React.useState('')

    const activateEditMode = () => {
        setEditMode(true)
        setValue(title)
    }
    const activateViewMode = () => {
        setEditMode(false)
        onChange(value)
    }
    const onChangeValueHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
        setValue(e.currentTarget.value)

    return editMode
        ? <TextField disabled={disabled} value={value} onChange={onChangeValueHandler} onBlur={activateViewMode} autoFocus/>
        : <span onDoubleClick={activateEditMode}>{title}</span>
})