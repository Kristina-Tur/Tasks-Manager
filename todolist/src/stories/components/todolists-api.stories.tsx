import axios from 'axios'
import React, {useEffect, useState} from 'react'
import {todolistsApi} from "../../api/todolists-api";

export default {
    title: 'API',
}

/*const settings = {
    withCredentials: true,
    headers:     {
        "API-KEY": "0d6fcc4b-d0b8-4c34-b068-91acef8dc727"
    }
}*/

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsApi.getTodolists()
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistsApi.createTodolist('newTodolist')
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
        todolistsApi.deleteTodolist(todolistId)
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
        todolistsApi.updateTodolistTitle(todolistId, 'React')
            .then(res => {
                console.log({res})
                setState(res.data)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)

    const todolistId = "f8cb1b40-f19d-4c1b-993b-cdb68d43d058"

    useEffect(() => {
        todolistsApi.getTasks(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState('')
    const [taskId, setTaskId] = useState('')

    useEffect(() => {
        todolistsApi.deleteTasks(todolistId, taskId)
            .then((res) => {
                setState(res.data)
            })
    }, [todolistId, taskId])

    const onClickHandler = () => {

    }

    return <div>
        {JSON.stringify(state)}
        <input placeholder={'todolistId'} value={todolistId} onChange={e => setTodolistId(e.currentTarget.value)}/>
        <input placeholder={'taskId'} value={taskId} onChange={e => setTaskId(e.currentTarget.value)}/>
        <button onClick={onClickHandler}>Delete Task</button>
    </div>
}
