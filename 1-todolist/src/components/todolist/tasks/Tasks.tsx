import React from 'react';

export type TasksPropsType = {
    id: number
    isDone: boolean
    title: string
}
export const Tasks = ({
                             id,
                             isDone,
                             title
                         }: TasksPropsType) => {
    return (
        <li>
            <input key={id} type="checkbox" checked={isDone}/>
            <span>{title}</span>
        </li>
    );
};