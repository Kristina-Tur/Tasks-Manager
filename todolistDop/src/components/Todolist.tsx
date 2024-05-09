import React, {ChangeEvent, useState} from 'react';
import {Button} from './Button';
import {filterType, TasksPropsType} from '../App';

type TodolistPropsType = {
    title: string
    tasks: Array<TasksPropsType>
    removeTask: (taskId: string) => void
    changeFilter: (value: filterType) => void
    addTask: (value: string) => void
}

export const Todolist = (props: TodolistPropsType) => {
    const [value, setValue] = useState('')

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setValue(event.currentTarget.value)
    }

    const onClickButtonHandler = () => {
        props.addTask(value)
        setValue('')
    }
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={value} onChange={onChangeInputHandler}/>
                <Button title={'+'} callback={() => onClickButtonHandler()}/>
            </div>
            <ul>
                {props.tasks.length === 0 ? 'Theres no task' :
                    props.tasks.map((task) =>
                        <li key={task.id}>
                            <input type="checkbox" checked={task.isDone}/>
                            <span>
                        {task.title}
                            </span>
                            <button onClick={() => props.removeTask(task.id)}>x</button>
                            {/*<Button title={'x'} callback={() => props.removeTask(task.id)}/>*/}
                        </li>)
                }

            </ul>
            <div>
                <Button title={'All'} callback={() => {props.changeFilter('all')
                }}/>
                <Button title={'Active'} callback={() => {props.changeFilter('active')
                }}/>
                <Button title={'Completed'} callback={() => {props.changeFilter('completed')
                }}/>
            </div>
        </div>
    );
};