import {data1} from '../data/Data';
import React from 'react';
import {TaskPropsType} from './Tasks';

export const Task = (props: TaskPropsType) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <ul>
                <li>
                    <input type={'checkbox'} checked={props.isDone}/>
                    <span>{data1.tasks[0].title}</span>
                </li>
                <li>
                    <input type={'checkbox'} checked={data1.tasks[1].isDone}/>
                    <span>{data1.tasks[1].title}</span>
                </li>
            </ul>
            <ul>
                {data1.students.map((s) => {

                    return <li>{s}</li>
                })}
            </ul>
        </div>
    )
}