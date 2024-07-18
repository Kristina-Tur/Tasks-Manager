import React, { useEffect, useState } from 'react'
import {todolistApi} from "../api/api";

export default {
    title: 'API-Tasks',
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)

    const todolistId = "8fa95495-5557-464a-a461-cf0bd1af90fe"

    useEffect(() => {
        todolistApi.getTasks(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState('')
    const [title, setTitle] = useState('')

    const onClickHandler = () => {
        todolistApi.createTask(todolistId, title)
            .then(res => {
                setState(res.data.data)
            })
    }

    return <div>
        {JSON.stringify(state)}
        <input placeholder={'todolistId'} value={todolistId} onChange={e => setTodolistId(e.currentTarget.value)}/>
        <input placeholder={'title'} value={title} onChange={e => setTitle(e.currentTarget.value)}/>
        <button onClick={onClickHandler}>Create Task</button>
    </div>
}

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState('')
    const [taskId, setTaskId] = useState('')

    const onClickHandler = () => {
        todolistApi.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>
        {JSON.stringify(state)}
        <input placeholder={'todolistId'} value={todolistId} onChange={e => setTodolistId(e.currentTarget.value)}/>
        <input placeholder={'taskId'} value={taskId} onChange={e => setTaskId(e.currentTarget.value)}/>
        <button onClick={onClickHandler}>Delete Task</button>
    </div>
}

export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState('')
    const [taskId, setTaskId] = useState('')
    const [title, setTitle] = useState('')

    const onClickHandler = () => {
        todolistApi.updateTaskTitle(todolistId, taskId, title)
            .then(res => {
                setState(res.data)
            })
    }

    return <div>
        {JSON.stringify(state)}
        <input placeholder={'todolistId'} value={todolistId} onChange={e => setTodolistId(e.currentTarget.value)}/>
        <input placeholder={'taskId'} value={taskId} onChange={e => setTaskId(e.currentTarget.value)}/>
        <input placeholder={'title'} value={title} onChange={e => setTitle(e.currentTarget.value)}/>
        <button onClick={onClickHandler}>Update Task</button>
    </div>
}
