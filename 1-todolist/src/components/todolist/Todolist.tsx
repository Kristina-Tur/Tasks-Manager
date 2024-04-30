import React from 'react';
import {Button} from './buttons/Button';
import {FilterType} from '../../App';

type TodolistPropsType = {
    title: string
    tasks: Array<TasksPropsType>
    removeTask: (id: number) => void
}

type TasksPropsType = {
    id: number
    isDone: boolean
    title: string
}

const buttons: Array<{ id: number, title: string, filter: FilterType }> = [
    {id: 1, title: 'All', filter: 'all'},
    {id: 1, title: 'Active', filter: 'active'},
    {id: 1, title: 'Completed', filter: 'completed'},
]


export const Todolist = ({title, tasks, removeTask}: TodolistPropsType) => {
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            {tasks.length === 0 ? (
                <p>No tasks</p>
            ) : (
                <ul>
                    {tasks.map((task) =>
                        <li>
                            <input key={task.id} type="checkbox" checked={task.isDone}/>
                            <span>{task.title}</span>
                            <Button onClick={() => removeTask(task.id)} title={'x'}/>
                        </li>
                    )}
                </ul>
            )}
            <div>
                {buttons.map((button) =>
                        <Button key={button.id} title={button.title} onClick={() => {}}/>
                )}
            </div>
        </div>
    );
};





