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

    const todolistId = "a9df9273-c357-4b28-b421-81b15a7b9dc4"

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

    const todolistId = "f8cb1b40-f19d-4c1b-993b-cdb68d43d058"
    const taskId = "f8cb1b40-f19d-4c1b-993b-cdb68d43d058"

    useEffect(() => {
        todolistsApi.deleteTasks(todolistId, taskId)
            .then((res) => {
                setState(res.data)
            })
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
