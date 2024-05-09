import React from 'react';
import './App.css';
import {v1} from 'uuid';
import {Todolist} from './components/Todolist';

export type TasksPropsType = {
    id: string
    isDone: boolean
    title: string
}

function App() {
    const tasks: Array<TasksPropsType> = [
        {id: v1(), isDone: true, title: 'HTML&CSS'},
        {id: v1(), isDone: true, title: 'JS'},
        {id: v1(), isDone: false, title: 'React'},
        {id: v1(), title: 'Redux', isDone: false},
        {id: v1(), title: 'Typescript', isDone: false},
        {id: v1(), title: 'RTK query', isDone: false}
    ]
    const tasks2: Array<any> = []
    return (
        <div className="App">
            <Todolist
                title={'What to learn'}
                tasks={tasks}
            />
            <Todolist
                title={'What to learn'}
                tasks={tasks2}
            />
        </div>
    );
}

export default App;
