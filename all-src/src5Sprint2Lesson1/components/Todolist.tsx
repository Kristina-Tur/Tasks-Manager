import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from './Button';
import {filterType, TasksPropsType} from '../App';
import { TodolistType } from '../App';

type TodolistPropsType = {
    todolistId: string
    todolistFilter: filterType
    title: string
    tasks: Array<TasksPropsType>
    removeTask: (todolistId: string, taskId: string) => void
    setChangeFilter: (todolistId: string, value: filterType) => void 
    addTask: (todolistId: string, value: string) => void
    changeStatus: (todolistId: string, isDone: boolean, taskId: string) => void
    removeTodolist: (todolistId: string) => void
}

export const Todolist = (props: TodolistPropsType) => {
    const [value, setValue] = useState('')
    const [error, setError] = useState('')

    let tasksForFilter = props.tasks
    if (props.todolistFilter === 'active') {
        tasksForFilter = props.tasks.filter((task) => !task.isDone)
    }
    if (props.todolistFilter === 'completed') {
        tasksForFilter = props.tasks.filter((task) => task.isDone)
    }

    const changeFilter = (value: filterType) => {
        props.setChangeFilter(props.todolistId, value)
            
    }

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value)
    }

    const onClickButtonHandler = () => {
        setError('')
        if (value.length > 20 || value.length === 0) {
            setError('Character lengths must be greater than zero and less than 20')
        } else {
            props.addTask(props.todolistId, value)
            setValue('')
        }

    }

    const onKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError('')
        if (value.length > 20 || value.length === 0) {
            setError('Character lengths must be greater than zero and less than 20')
        } else {
            if (event.key === 'Enter') {
                props.addTask(props.todolistId, value)
                setValue('')
            }
        }
    }
    return (
        <div>
            <Button title={'X'} callback={() => props.removeTodolist(props.todolistId)}/>
            <h3>{props.title}</h3>

            <div>
                <input value={value} onChange={onChangeInputHandler}
                       onKeyUp={onKeyUpHandler}
                />
                <Button
                    title={'+'}
                    callback={() => onClickButtonHandler()}
                />
                {error && <p>{error}</p>}
            </div>
            <ul>
                {props.tasks.length === 0 ? 'Theres no task' :
                    props.tasks.map((task) => {

                        const onClickButtonHandler = () => {
                            props.removeTask(props.todolistId, task.id)
                        }
                        const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
                            props.changeStatus(props.todolistId, event.currentTarget.checked, task.id)
                        }

                        return <li key={task.id}>
                            <input
                                type="checkbox"
                                onChange={onChangeHandler}
                                checked={task.isDone}/>
                            <span>
                        {task.title}
                            </span>
                            <Button title={'x'} callback={onClickButtonHandler}/>
                        </li>
                    })
                }

            </ul>
            <div>
                <Button title={'All'} callback={() => {
                    changeFilter('all')
                }}/>
                <Button title={'Active'} callback={() => {
                    changeFilter('active')
                }}/>
                <Button title={'Completed'} callback={() => {
                    changeFilter('completed')
                }}/>
            </div>
        </div>
    );
};