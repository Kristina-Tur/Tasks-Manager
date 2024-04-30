import './App.css';
import {Todolist} from './Todolist';
import {useState} from 'react';

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

export type filterValuesType = 'all' | 'completed' | 'active'

function App() {
    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false},
        {id: 4, title: 'Redux', isDone: false},
        {id: 5, title: 'Typescript', isDone: false},
        {id: 6, title: 'RTK query', isDone: false},
    ])
    const [filter, setFilter] = useState<filterValuesType>('all')
    /*const tasks1: Array<TaskType> = */

    /*const tasks2: Array<TaskType> = [
        // { id: 1, title: 'Hello world', isDone: true },
        // { id: 2, title: 'I am Happy', isDone: false },
        // { id: 3, title: 'Yo', isDone: false },
    ]*/

    const removeTask = (id: number) => {
        const filteredTasks = tasks.filter((task) => task.id !== id)
        setTasks(filteredTasks)
    }

    const changeFilterStatus = (value: filterValuesType) => {
        setFilter(value)
    }

    let tasksForTodolist = tasks;
    if(filter === 'completed'){
        tasksForTodolist = tasks.filter(task => task.isDone === true)
    }
    if(filter === 'active'){
        tasksForTodolist = tasks.filter(task => task.isDone === false)
    }
    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilterStatus={changeFilterStatus}/>
            {/*<Todolist title="Songs" tasks={tasks2}/>*/}
        </div>
    );
}

export default App;
