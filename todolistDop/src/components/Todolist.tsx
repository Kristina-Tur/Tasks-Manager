import React from 'react';
import {Button} from './Button';
import {filterType, TasksPropsType} from '../App';

type TodolistPropsType = {
    title: string
    tasks: Array<TasksPropsType>
    removeTask: (taskId: string) => void
    changeFilter: (value: filterType) => void
}

export const Todolist = (props: TodolistPropsType) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <Button title={'+'} callback={() => {
                }}/>
            </div>
            <ul>
                {props.tasks.length === 0 ? 'Theres no task' :
                    props.tasks.map((task) =>
                        <li key={task.id}>
                            <input type="checkbox" checked={task.isDone}/>
                            <span>
                        {task.title}
                            </span>
                            <Button title={'x'} callback={() => {props.removeTask(task.id)}}/>
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