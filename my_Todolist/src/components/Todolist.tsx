import React from 'react';

export type ListPropsType = {
    title: string
    tasks: Array<TaskPropsType>
    students: Array<string>
}

type TaskPropsType = {
    taskId: number
    title: string
    isDone: boolean
}


export const Todolist = (props: ListPropsType) => {
    return (
        <div>
            <div>
                <h3>{props.title}</h3>
                <ul>
                    {props.tasks.map((task) =>
                        <li>
                            <input type={'checkbox'} checked={task.isDone}/>
                            <span>{task.title}</span>
                        </li>
                    )}
                </ul>
                <ul>
                    {props.students.map((student) =>
                        <li>{student}</li>
                    )}
                </ul>
            </div>
        </div>
    )
}