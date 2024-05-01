import React from 'react';
import {Button} from './buttons/Button';
import {FilterType} from '../../App';
import {v1} from 'uuid';

type TodolistPropsType = {
    title: string
    tasks: Array<TasksPropsType>
    removeTask: (id: string) => void
    changeTodolist: (filter: FilterType) => void
    addTask: () => void
}

type TasksPropsType = {
    id: string
    isDone: boolean
    title: string
}

const buttons: Array<{ id: string, title: string, filter: FilterType }> = [
    {id: v1(), title: 'All', filter: 'all'},
    {id: v1(), title: 'Active', filter: 'active'},
    {id: v1(), title: 'Completed', filter: 'completed'},
]

export const Todolist = ({title, tasks, removeTask, changeTodolist, addTask}: TodolistPropsType) => {
    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input/>
                <Button onClick={() => {addTask()}} title={'+'}/>
            </div>
            {tasks.length === 0 ? (
                <p>No tasks</p>
            ) : (
                <ul>
                    {tasks.map((task) =>
                        <li key={task.id}>
                            <input type="checkbox" checked={task.isDone}/>
                            <span>{task.title}</span>
                            <Button onClick={() => removeTask(task.id)} title={'x'}/>
                        </li>
                    )}
                </ul>
            )}
            <div>
                {buttons.map((button) =>
                        <Button key={button.id} title={button.title} onClick={() => {changeTodolist(button.filter)}}/>
                )}
            </div>
        </div>
    );
};





