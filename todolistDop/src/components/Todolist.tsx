import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from './Button';
import {filterType, TasksPropsType} from '../App';

type TodolistPropsType = {
    todolistId: string
    title: string
    tasks: Array<TasksPropsType>
    removeTask: (todolistId: string, taskId: string) => void
    changeFilter: (todolistId: string, value: filterType) => void
    addTask: (todolistId: string, value: string) => void
    changeStatus: (todolistId: string, isDone: boolean, taskId: string) => void
    removeTodolist: (todolistId: string) => void
}

export const Todolist = (props: TodolistPropsType) => {
    const [value, setValue] = useState('')
    const [error, setError] = useState('')

    /*let tasksForFilter = tasks
    if (todolist.filter === 'active') {
        tasksForFilter = tasks.filter((task) => !task.isDone)
    }
    if (todolist.filter === 'completed') {
        tasksForFilter = tasks.filter((task) => task.isDone)
    }*/

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
                    props.changeFilter(props.todolistId, 'all')
                }}/>
                <Button title={'Active'} callback={() => {
                    props.changeFilter(props.todolistId, 'active')
                }}/>
                <Button title={'Completed'} callback={() => {
                    props.changeFilter(props.todolistId, 'completed')
                }}/>
            </div>
        </div>
    );
};