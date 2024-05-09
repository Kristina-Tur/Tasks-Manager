import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from './Button';
import {filterType, TasksPropsType} from '../App';

type TodolistPropsType = {
    title: string
    tasks: Array<TasksPropsType>
    removeTask: (taskId: string) => void
    changeFilter: (value: filterType) => void
    addTask: (value: string) => void
    changeStatus: (isDone: boolean, taskId: string) => void
}

export const Todolist = (props: TodolistPropsType) => {
    const [value, setValue] = useState('')
    const [error, setError] = useState('')

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value)
    }

    const onClickButtonHandler = () => {
        setError('')
        if (value.length > 20 || value.length === 0) {
            setError('Character lengths must be greater than zero and less than 20')
        } else {
            props.addTask(value)
            setValue('')
        }

    }

    const onKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError('')
        if (value.length > 20 || value.length === 0) {
            setError('Character lengths must be greater than zero and less than 20')
        } else {
            if (event.key === 'Enter') {
                props.addTask(value)
                setValue('')
            }
        }
    }
    return (
        <div>
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
                            props.removeTask(task.id)
                        }
                        const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
                            props.changeStatus(event.currentTarget.checked, task.id)
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
                    props.changeFilter('all')
                }}/>
                <Button title={'Active'} callback={() => {
                    props.changeFilter('active')
                }}/>
                <Button title={'Completed'} callback={() => {
                    props.changeFilter('completed')
                }}/>
            </div>
        </div>
    );
};