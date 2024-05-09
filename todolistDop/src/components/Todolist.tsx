import React from 'react';
import {Button} from './Button';
import {TasksPropsType} from '../App';

type TodolistPropsType = {
    title: string
    tasks: Array<TasksPropsType>
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
                {props.tasks.length === 0 ? "There's no task" :
                    props.tasks.map((task) =>
                        <li>
                            <input type="checkbox" checked={task.isDone}/>
                            <span>
                        {task.title}
                    </span>
                        </li>)
                }

            </ul>
            <div>
                <Button title={'All'} callback={() => {
                }}/>
                <Button title={'Active'} callback={() => {
                }}/>
                <Button title={'Completed'} callback={() => {
                }}/>
            </div>
        </div>
    );
};