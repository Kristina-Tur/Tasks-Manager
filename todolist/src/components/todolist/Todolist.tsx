import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from './buttons/Button';
import {FilterType} from '../../App';
import {v1} from 'uuid';

type TodolistPropsType = {
    todolistId: string
    title: string
    tasks: Array<TasksPropsType>
    removeTask: (todolistId: string, id: string) => void
    changeTodolist: (todolistId: string, filter: FilterType) => void
    addTask: (todolistId: string, value: string) => void
    changeStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    removeTodolist: (todolistId: string) => void
    filter: FilterType
}

export type TasksPropsType = {
    id: string
    isDone: boolean
    title: string
}

const buttons: Array<{ id: string, title: string, filter: FilterType }> = [
    {id: v1(), title: 'All', filter: 'all'},
    {id: v1(), title: 'Active', filter: 'active'},
    {id: v1(), title: 'Completed', filter: 'completed'},
]

export const Todolist = ({
                             title,
                             tasks,
                             removeTask,
                             changeTodolist,
                             addTask,
                             changeStatus,
                             filter,
                             todolistId,
                             removeTodolist
                         }: TodolistPropsType) => {

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

    const removeTodolistHandler = () => {
        removeTodolist(todolistId)
    }

    return (
        <div>
            <h3>
                {title}
                <button onClick={removeTodolistHandler}>{'X'}</button>
            </h3>
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
            {tasks.length === 0 ? (
                <p>No tasks</p>
            ) : (
                <ul>
                    {tasks.map((task) => {
                        const onRemoveHandler = () => removeTask(todolistId,task.id)
                        const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => changeStatus(todolistId, task.id, event.currentTarget.checked)
                        return (
                            <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                                <input type="checkbox"
                                       onChange={onChangeHandler}
                                       checked={task.isDone}/>
                                <span>{task.title}</span>
                                <Button onClick={onRemoveHandler} title={'x'}/>
                            </li>
                        )
                    })
                    }
                </ul>
            )}
            <div>
                {buttons.map((button) =>
                    <Button className={button.filter === filter ? 'active-filter' : ''} key={button.id}
                            title={button.title} onClick={() => {
                        changeTodolist( todolistId, button.filter)
                    }}/>
                )}
            </div>
        </div>
    );
};





