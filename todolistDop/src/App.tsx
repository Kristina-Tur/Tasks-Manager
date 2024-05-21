import React, {useState} from 'react';
import './App.css';
import {v1} from 'uuid';
import {Todolist} from './components/Todolist';

export type TasksPropsType = {
    id: string
    isDone: boolean
    title: string
}

type TodolistType = {
    id: string
    title: string
    filter: filterType
}

type TasksType = {
    [key: string]: TasksPropsType[]
}

export type filterType = 'all' | 'active' | 'completed'

function App() {
    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<TodolistType[]>([
        { id: todolistID1, title: 'What to learn', filter: 'all' },
        { id: todolistID2, title: 'What to buy', filter: 'all' },
    ])

    let [tasks, setTasks] = useState<TasksType>({
        [todolistID1]: [
            { id: v1(), title: 'HTML&CSS', isDone: true },
            { id: v1(), title: 'JS', isDone: true },
            { id: v1(), title: 'ReactJS', isDone: false },
        ],
        [todolistID2]: [
            { id: v1(), title: 'Rest API', isDone: true },
            { id: v1(), title: 'GraphQL', isDone: false },
        ],
    })

    const removeTask = (todolistId: string, taskId: string) => {
        /*setTasks({})
        const filteredRemoveTasks = tasks.filter((task) => taskId !== task.id
        )
        setTasks(filteredRemoveTasks)*/
    }

    const addTask = (todolistId: string, value: string) => {
        const newTask = {
            id: v1(), isDone: false, title: value
        }
        setTasks({...tasks, [todolistId]: [{...newTask}]})
    }


    const changeFilter = (todolistId: string, value: filterType) => {
        setTodolists(todolists.map(todolist => todolist.id === todolistId ? {...todolist, filter: value} : todolist))
        /*const currentTodo = todolists.find(el => el.id === todolistId)
        if(currentTodo){
            currentTodo.filter = value
            setTodolists([...todolists])
        }*/
    }

    const changeStatus = (todolistId: string, isDone: boolean, taskId: string) => {
        /*setTasks({...})*/
        /*let task = tasks.find((task) => task.id === taskId)
        if (task) {
            task.isDone = isDone
        }
        setTasks([...tasks])*/
    }

    const removeTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(todolist => todolist.id !== todolistId))
        delete tasks[todolistId]
        console.log(tasks)
    }


    return (
        <div className="App">
            {todolists.map(todolist => {
                    let tasksForFilter = tasks[todolist.id]
                    if (todolist.filter === 'active') {
                        tasksForFilter = tasks[todolist.id].filter((task) => !task.isDone)
                    }
                    if (todolist.filter === 'completed') {
                        tasksForFilter = tasks[todolist.id].filter((task) => task.isDone)
                    }
                    return (
                        <Todolist
                            key={todolist.id}
                            todolistId={todolist.id}
                            title={todolist.title}
                            tasks={tasksForFilter}
                            removeTask={removeTask}
                            addTask={addTask}
                            changeFilter={changeFilter}
                            changeStatus={changeStatus}
                            removeTodolist={removeTodolist}
                        />
                    )
                }
            )
            }

        </div>
    );
}

export default App;
