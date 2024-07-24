import React, {useEffect, useState} from 'react'
import {api, TaskPriorities, TaskStatuses} from "./api";

export default {
    title: 'API',
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        api.getTodolists()
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        api.addTodolist('newTodolist')
            .then(res => {
                console.log({res})
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)

    const todolistId = "3b95ef93-410b-458a-8f4b-484e4d30dc1c"

    useEffect(() => {
        api.removeTodolist(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)

    const todolistId = "f8cb1b40-f19d-4c1b-993b-cdb68d43d058"

    useEffect(() => {
        api.updateTodolistTitle(todolistId, 'React')
            .then(res => {
                console.log({res})
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)

    const todolistId = "8fa95495-5557-464a-a461-cf0bd1af90fe"

    useEffect(() => {
        api.getTasks(todolistId)
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
        api.addTask(todolistId, title)
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
        api.removeTask(todolistId, taskId)
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

    const model = {
        title,
        description: '',
        completed: false,
        priority: TaskPriorities.Low,
        startDate: '',
        deadline: '',
        status: TaskStatuses.New
    }
    const onClickHandler = () => {
        api.updateTask(todolistId, taskId, model)
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