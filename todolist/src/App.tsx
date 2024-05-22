import React, {ChangeEvent, useState} from 'react';
import './App.css';
import {Todolist} from './components/todolist/Todolist';
import {v1} from 'uuid';

export type FilterType = 'all' | 'active' | 'completed'
type TodolistsType = {
    id: string
    title: string
    filter: FilterType
}

export type TasksPropsType = {
    id: string
    isDone: boolean
    title: string
}

type TasksType = {
    [key: string]: TasksPropsType[]
}

const App = () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'}
    ])

    const [tasks, setTasks] = useState<TasksType>({
        [todolistId1]: [
            {id: v1(), isDone: true, title: 'HTML&CSS'},
            {id: v1(), isDone: true, title: 'JS'},
            {id: v1(), isDone: false, title: 'React'},
            {id: v1(), isDone: false, title: 'll'},
            {id: v1(), isDone: false, title: 'ts'},
            {id: v1(), isDone: false, title: 'styledComponent'},
        ],
        [todolistId2]: [
            {id: v1(), isDone: false, title: 'Milk'},
            {id: v1(), isDone: false, title: 'Bread'},
            {id: v1(), isDone: false, title: 'Tea'},
            {id: v1(), isDone: true, title: 'Coffee'},
        ],

    })

    const removeTask = (todolistId: string, id: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(task => task.id !== id)})
    }

    const addTask = (todolistId: string, value: string) => {
        const newTask = {id: v1(), isDone: false, title: value}
        setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }

    const changeStatus = (todolistId: string, taskId: string, isDone: boolean) => {
        setTasks({
            ...tasks,
            [todolistId]: tasks[todolistId].map(task => task.id === taskId ? {...task, isDone: isDone} : task)
        })
    }

    const changeTodolist = (todolistId: string, filter: FilterType) => {
        setTodolists(todolists.map(todolist => todolist.id === todolistId ? {...todolist, filter: filter} : todolist))
    }

    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(todolist => todolist.id !== todolistId))
        delete tasks[todolistId]
        setTasks({...tasks})
    }

    return (
        <div className="App">
            {todolists.map(todolist => {

                let tasksForTodolist = tasks[todolist.id]

                return <Todolist
                    key={todolist.id}
                    todolistId={todolist.id}
                    title={todolist.title}
                    tasks={tasksForTodolist}
                    removeTask={removeTask}
                    changeTodolist={changeTodolist}
                    addTask={addTask}
                    changeStatus={changeStatus}
                    filter={todolist.filter}
                    removeTodolist={removeTodolist}
                />
            })}

        </div>
    );
};

export default App;
