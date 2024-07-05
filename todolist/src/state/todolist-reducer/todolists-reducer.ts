import {FilterType, TodolistsType} from "../../App";
import {v1} from "uuid";


export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof ChangeTodolistTitleAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof ChangeTodolistFilterAC>

export type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType

export const todolistId1 = v1()
export const todolistId2 = v1()

const initialState: TodolistsType[] = []

export const todolistsReducer = (state: TodolistsType[] = initialState, action: ActionsType): TodolistsType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(s => s.id !== action.payload.id)
        }
        case 'ADD-TODOLIST': {
            const newState: TodolistsType = {id: action.payload.todolistId, title: action.payload.title, filter: 'all'}
            return [newState, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(s => s.id === action.payload.id ? {...s, title: action.payload.title} : s)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(s => s.id === action.payload.id ? {...s, filter: action.payload.filter} : s)
        }
        default:
            return state
    }
}


export const removeTodolistAC = (todolistId: string) => {
    return { type: 'REMOVE-TODOLIST', payload: { id: todolistId } } as const
}
export const addTodolistAC = (title: string) => {
    return { type: 'ADD-TODOLIST', payload: { title: title, todolistId: v1() } } as const
}
export const ChangeTodolistTitleAC = (todolistId: string, title: string) => {
    return { type: 'CHANGE-TODOLIST-TITLE', payload: { id: todolistId, title: title } } as const
}
export const ChangeTodolistFilterAC = (todolistId: string, filter: FilterType) => {
    return { type: 'CHANGE-TODOLIST-FILTER', payload: { id: todolistId, filter: filter } } as const
}


