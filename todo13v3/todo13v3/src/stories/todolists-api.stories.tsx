import React, { useEffect, useState } from 'react'
import axios, {AxiosRequestConfig} from "axios";
import {config, todolistApi} from "../api/api";

export default {
    title: 'API',
}



export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistApi.getTodolists()
            .then(res => {
                console.log(res)
                return setState(res)
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
        const todolistId = '955768f4-ef8f-4c20-8d85-c5d033958e66'
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
        todolistApi.updateTodolist(todolistId)
            .then(res => {
                console.log(res)
                return setState(res)
            })
    }, [])

    return <div>{JSON.stringify(state)}</div>
}