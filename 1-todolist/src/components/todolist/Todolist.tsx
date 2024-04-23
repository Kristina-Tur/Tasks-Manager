import React from 'react';
import {Tasks, TasksPropsType} from './tasks/Tasks';
import {Button} from './buttons/Button';
import {FilterType} from '../Container';

type TodolistPropsType = {
    id: number
    title: string
    tasks: Array<TasksPropsType>
}
const buttons: Array<{ id: number, title: string, filter: FilterType }> = [
    {id: 1, title: 'All', filter: 'all'},
    {id: 1, title: 'Active', filter: 'active'},
    {id: 1, title: 'Completed', filter: 'completed'},
]

export const Todolist = ({title, tasks}: TodolistPropsType) => {
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
                        <Tasks id={task.id}
                               isDone={task.isDone}
                               title={task.title}
                        />
                    )}
                </ul>
            )}
            <div>
                {buttons.map((button) =>
                        <Button key={button.id}>{button.title}</Button>
                )}
            </div>
        </div>
    );
};





