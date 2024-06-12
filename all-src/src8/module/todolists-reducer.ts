import {v1} from 'uuid'
import {FilterValuesType, TodolistType} from "../App";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    payload: { id: string }
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST'
    payload: { title: string }
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    payload: {
        id: string
        title: string
    }
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    payload: {
        id: string
        filter: FilterValuesType
    }
}
type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType

let todolistID1 = v1()
let todolistID2 = v1()

const initialState: TodolistType[] = [
    {id: todolistID1, title: 'What to learn', filter: 'all'},
    {id: todolistID2, title: 'What to buy', filter: 'all'},
]
export const todolistsReducer = (state: TodolistType[] = initialState, action: ActionsType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(s => s.id !== action.payload.id)
        }
        case 'ADD-TODOLIST': {
            const newTodolist: TodolistType = {id: v1(), title: action.payload.title, filter: 'all'}
            return [...state, newTodolist]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(s => s.id === action.payload.id
                ? {...s, title: action.payload.title}
                : s)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(s => s.id === action.payload.id
                ? {...s, filter: action.payload.filter}
                : s)
        }
        default:
            return state
    }
}

export const removeTodolistAC = (todolistId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            id: todolistId,
        },
    } as const
}

export const addTodolistAC = (title: string) => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            title: title,
        },
    } as const
}

export const changeTitleTodolistAC = (todolistId: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            id: todolistId,
            title: title,
        },
    } as const
}
export const changeFilterTodolistAC = (todolistId: string) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            id: todolistId,
            filter: 'completed',
        },
    } as const
}
