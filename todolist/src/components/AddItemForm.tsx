import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import Button from '@mui/material/Button'
import TextField from "@mui/material/TextField";
import {Icon, IconButton} from "@mui/material";
import {Add, AddOutlined, ControlPoint} from "@mui/icons-material";

type AddItemFormType = {
    todolistId?: string
    addItem: (value: string) => void
}

export const AddItemForm = ({
                                addItem,
                                todolistId
                            }: AddItemFormType) => {

    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(event.currentTarget.value)
    }

    const onKeyUpInputHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (newTaskTitle.trim() !== '' && newTaskTitle.trim().length < 20) {
            if (event.key === 'Enter') {
                addItem(newTaskTitle)
                setNewTaskTitle('')
            }
        } else {
            setError('Title is required')
        }
    }

    const addItemHandler = () => {
        if (newTaskTitle.trim() !== '' && newTaskTitle.trim().length < 20) {
            addItem(newTaskTitle.trim())
            setNewTaskTitle('')
        } else {
            setError('Title is required')
        }
    }

    return (
        <div>
            <TextField label="Type value"
                       value={newTaskTitle}
                       onChange={onChangeInputHandler}
                       onKeyUp={onKeyUpInputHandler}
                       error={!!error}
                       helperText={error}
            />
            <IconButton onClick={() => {
                addItemHandler()
            }} color={"primary"}>
                <ControlPoint/>
            </IconButton>
        </div>
    )
}