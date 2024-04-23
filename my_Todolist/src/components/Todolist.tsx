import React from 'react';

type TodolistPropsType = {
    title: string
    tasks: Array<TasksPropsType>
    students: Array<string>
}

type TasksPropsType = {
    taskId: number
    title: string
    isDone: boolean
}


export const Todolist = ({title, tasks, students}: TodolistPropsType) => {
    return (
        <div>
            <div>
                <h3>{title}</h3>
                <ul>
                    {tasks.map((task) =>
                        <li>
                            <input type={'checkbox'} checked={task.isDone}/>
                            <span>{task.title}</span>
                        </li>
                    )}
                </ul>
                <ul>
                    {students.map((student) =>
                        <li>{student}</li>
                    )}
                </ul>
            </div>
        </div>
    )
}