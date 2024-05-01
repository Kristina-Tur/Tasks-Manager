import React, {ChangeEvent, useState} from 'react';
import './App.css';
import {Todolist} from './components/todolist/Todolist';
import {v1} from 'uuid';

export type FilterType = 'all' | 'active' | 'completed'

const dataTodolist2 = [
    {id: 1, isDone: true, title: 'HTML&CSS'},
    {id: 2, isDone: true, title: 'JS'},
    {id: 3, isDone: false, title: 'React'}
]


const App = () => {
    const [dataTodolist1, setDataTodolist1] = useState([
        {id: v1(), isDone: true, title: 'HTML&CSS'},
        {id: v1(), isDone: true, title: 'JS'},
        {id: v1(), isDone: false, title: 'React'},
        {id: v1(), isDone: false, title: 'll'},
        {id: v1(), isDone: false, title: 'ts'},
        {id: v1(), isDone: false, title: 'styledComponent'},
    ])
    /*console.log(dataTodolist1)*/
    const removeTask = (id: string) => {
        const filteredTasks = dataTodolist1.filter(task => task.id !== id)
        setDataTodolist1(filteredTasks)
    }

    const addTask = (value: string) => {
        const newTask = {id: v1(), isDone: false, title: value}
        const newArray = [newTask, ...dataTodolist1]
        setDataTodolist1(newArray)
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
                      addTask={addTask}
            />
        </div>
    );
};

export default App;
