import React from 'react';
import {Task} from './Task';
import {PropsType} from '../App';



export type TaskPropsType = {
    taskId: number
    title: string
    isDone: boolean
}
export const Tasks = (props: PropsType) => {
    return (
        <div>
            {props.tasks.map((task) => (
                <Task key={task.taskId} title={task.title} isDone={task.isDone}/>
            ))}
        </div>
    )
}