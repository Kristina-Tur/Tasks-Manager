import React, {useState} from 'react';
import './App.css';
import {Todolist} from './components/todolist/Todolist';

export type FilterType = 'all' | 'active' | 'completed'

const dataTodolist2 = [
    {id: 1, isDone: true, title: 'HTML&CSS'},
    {id: 2, isDone: true, title: 'JS'},
    {id: 3, isDone: false, title: 'React'}
]


const App = () => {
    const [dataTodolist1, setDataTodolist1] = useState([
        {id: 1, isDone: true, title: 'HTML&CSS'},
        {id: 2, isDone: true, title: 'JS'},
        {id: 3, isDone: false, title: 'React'},
        {id: 4, isDone: false, title: 'll'},
        {id: 5, isDone: false, title: 'ts'},
        {id: 6, isDone: false, title: 'styledComponent'},
    ])
    const removeTask = (id: number) => {
        const filteredTasks = dataTodolist1.filter(task => task.id !== id)
        setDataTodolist1(filteredTasks)
    }


    const [filter, setFilter] = useState<FilterType>('all');
    let tasksForTodolist = dataTodolist1

    if(filter === 'completed'){
        tasksForTodolist = dataTodolist1.filter(task => task.isDone)
    }
    if(filter === 'active'){
        tasksForTodolist = dataTodolist1.filter(task => !task.isDone)
    }

    const changeTodolist = (filter: FilterType) => {
        setFilter(filter)
    }

    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeTodolist={changeTodolist}
            />
        </div>
    );
};

export default App;
