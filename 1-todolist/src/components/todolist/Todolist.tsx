import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from './buttons/Button';
import {FilterType} from '../../App';
import {v1} from 'uuid';

type TodolistPropsType = {
    title: string
    tasks: Array<TasksPropsType>
    removeTask: (id: string) => void
    changeTodolist: (filter: FilterType) => void
    addTask: (value: string) => void
    changeStatus: (taskId: string, isDone: boolean) => void
}

type TasksPropsType = {
    id: string
    isDone: boolean
    title: string
}

const buttons: Array<{ id: string, title: string, filter: FilterType, className: FilterType}> = [
    {id: v1(), title: 'All', filter: 'all', className: 'all'},
    {id: v1(), title: 'Active', filter: 'active', className: 'active'},
    {id: v1(), title: 'Completed', filter: 'completed', className: 'completed'},
]

export const Todolist = ({title, tasks, removeTask, changeTodolist, addTask, changeStatus}: TodolistPropsType) => {

    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(event.currentTarget.value)

    }
    const onKeyUpInputHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === 'Enter') {
            addTask(newTaskTitle)
            setNewTaskTitle('')
        }
    }
    const addTaskHandler = () => {
        if(newTaskTitle.trim() !== '' && newTaskTitle.trim().length < 20){
            addTask(newTaskTitle)
            setNewTaskTitle('')
        } else {
            setError('Title is required')
        }
    }

    return (
        <div>
            <h3>{title}</h3>
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
                        const onRemoveHandler = () => removeTask(task.id)
                        const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => changeStatus(task.id, event.currentTarget.checked)
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
                    <Button className={button.className === button.filter ? 'active-filter' : ''} key={button.id} title={button.title} onClick={() => {
                        changeTodolist(button.filter)
                    }}/>
                )}
            </div>
        </div>
    );
};





