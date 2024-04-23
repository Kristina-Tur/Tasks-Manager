import React from 'react';
import {Todolist} from './todolist/Todolist';

export type FilterType = 'all' | 'active' | 'completed'

const dataTodolist = [
    {
        id: 1,
        title: 'What to learn',
        tasks: [
            {
                id: 1,
                isDone: true,
                title: 'HTML&CSS'
            },
            {
                id: 2,
                isDone: true,
                title: 'JS'
            },
            {
                id: 3,
                isDone: false,
                title: 'React'
            },
        ],

    },
    {
        id: 2,
        title: 'What to listen for',
        tasks: [
            /*{
                id: 1,
                isDone: true,
                title: 'H'
            },
            {
                id: 2,
                isDone: true,
                title: 'S'
            },
            {
                id: 3,
                isDone: false,
                title: 'act'
            },
            {
                id: 4,
                isDone: true,
                title: 'act'
            },*/
        ],

    }
]

export const Container = () => {



    return (
        <div className="App">
            {dataTodolist.map((data) => {
                return (


                    <Todolist id={data.id}
                              title={data.title}
                              tasks={data.tasks}
                    />
                )
            })}

        </div>
    );
};
