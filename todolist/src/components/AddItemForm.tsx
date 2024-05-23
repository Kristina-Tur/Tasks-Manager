import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button} from "./todolist/buttons/Button";

type AddItemFormType = {
    todolistId: string
    addTask: (todolistId: string, value: string) => void
}

export const AddItemForm = ({
                                addTask,
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
                addTask(todolistId, newTaskTitle)
                setNewTaskTitle('')
            }
        } else {
            setError('Title is required')
        }
    }

    const addTaskHandler = () => {
        if (newTaskTitle.trim() !== '' && newTaskTitle.trim().length < 20) {
            addTask(todolistId, newTaskTitle.trim())
            setNewTaskTitle('')
        } else {
            setError('Title is required')
        }
    }

    return (
        <div>
            <input value={newTaskTitle}
                   onChange={onChangeInputHandler}
                   onKeyUp={onKeyUpInputHandler}
                   className={error ? 'error' : ''}
            />
            <Button onClick={() => {
                addTaskHandler()
            }}
                    title={'+'}/>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    )
}