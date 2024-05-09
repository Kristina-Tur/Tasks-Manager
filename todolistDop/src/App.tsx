import React, {useState} from 'react';
import './App.css';
import {v1} from 'uuid';
import {Todolist} from './components/Todolist';

export type TasksPropsType = {
    id: string
    isDone: boolean
    title: string
}

export type filterType = 'all' | 'active' | 'completed'

function App() {
    const dataTasks: Array<TasksPropsType> = [
        {id: v1(), isDone: true, title: 'HTML&CSS'},
        {id: v1(), isDone: true, title: 'JS'},
        {id: v1(), isDone: false, title: 'React'},
        {id: v1(), title: 'Redux', isDone: false},
        {id: v1(), title: 'Typescript', isDone: false},
        {id: v1(), title: 'RTK query', isDone: false}
    ]
    /*const tasks2: Array<any> = []*/

    const [tasks, setTasks] = useState<Array<TasksPropsType>>(dataTasks);

    const removeTask = (taskId: string) => {
        const filteredRemoveTasks = tasks.filter((task) => taskId !== task.id
        )
        setTasks(filteredRemoveTasks)
    }

    const addTask = (value: string) => {
        const newTask = {
            id: v1(), isDone: false, title: value
        }
        const newArray = [newTask,...tasks]
        setTasks(newArray)
    }

    const [filter, setFilter] = useState<filterType>('all')

        let tasksForFilter = tasks
        if (filter === 'active') {
            tasksForFilter = tasks.filter((task) => !task.isDone)
        }
        if (filter === 'completed') {
            tasksForFilter = tasks.filter((task) => task.isDone)
        }

    const changeFilter = (value: filterType) => {
        setFilter(value)
    }


    return (
        <div className="App">
            <Todolist
                title={'What to learn'}
                tasks={tasksForFilter}
                removeTask={removeTask}
                addTask={addTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
