import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from "./Button";

type AddItemForm = {
    addTask: (title: string, todolistId: string) => void
    todolistId: string
}

export const AddItemForm = ({addTask, todolistId}: AddItemForm) => {
    const [taskTitle, setTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addTaskHandler = () => {
        if (taskTitle.trim() !== '') {
            addTask(taskTitle.trim(), todolistId)
            setTaskTitle('')
        } else {
            setError('Title is required')
        }
    }

    const changeTaskTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTaskTitle(event.currentTarget.value)
    }

    const addTaskOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === 'Enter') {
            addTaskHandler()
        }
    }
    return (
        <div>
            <input
                className={error ? 'error' : ''}
                value={taskTitle}
                onChange={changeTaskTitleHandler}
                onKeyUp={addTaskOnKeyUpHandler}
            />
            <Button title={'+'} onClick={addTaskHandler}/>
            {error && <div className={'error-message'}>{error}</div>}
        </div>
    );
};
