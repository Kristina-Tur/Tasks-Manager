import React, { useEffect, useState } from 'react'
import {todolistApi} from "../api/api";

export default {
    title: 'API',
}



export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistApi.getTodolists()
            .then(res => {
                console.log(res)
                return setState(res.data)
            })

    }, [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistApi.createTodolist('Milk')
            .then(res => {
                console.log(res)
                return setState(res)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'c365b919-6776-4d7e-9d10-552310536561'
        todolistApi.deleteTodolist(todolistId)
            .then(res => {
                console.log(res)
                return setState(res)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '955768f4-ef8f-4c20-8d85-c5d033958e66'
        todolistApi.updateTodolist(todolistId, 'DDDDDd')
            .then(res => {
                console.log(res)
                return setState(res)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}