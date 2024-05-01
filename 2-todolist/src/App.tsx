import './App.css';
import {Todolist} from './Todolist';
import {useState} from 'react';
import {v1} from 'uuid';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type filterValuesType = 'all' | 'completed' | 'active'

function App() {
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
        {id: v1(), title: 'Typescript', isDone: false},
        {id: v1(), title: 'RTK query', isDone: false},
    ])
    const [filter, setFilter] = useState<filterValuesType>('all')
    /*const tasks1: Array<TaskType> = */

    /*const tasks2: Array<TaskType> = [
        // { id: 1, title: 'Hello world', isDone: true },
        // { id: 2, title: 'I am Happy', isDone: false },
        // { id: 3, title: 'Yo', isDone: false },
    ]*/

    const removeTask = (id: string) => {
        const filteredTasks = tasks.filter((task) => task.id !== id)
        setTasks(filteredTasks)
    }

    const addTask = (value: string) => {
        const newTask = {
            id: v1(),
            title: value,
            isDone: false
        }
        const newArrayTasks = [newTask, ...tasks]
        setTasks(newArrayTasks)
    }

    const changeFilterStatus = (value: filterValuesType) => {
        setFilter(value)
    }

    let tasksForTodolist = tasks;
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(task => task.isDone)
    }
    if (filter === 'active') {
        tasksForTodolist = tasks.filter(task => !task.isDone)
    }
    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilterStatus={changeFilterStatus}
                      addTask={addTask}/>

            {/*<Todolist title="Songs" tasks={tasks2}/>*/}
        </div>
    );
}

export default App;
