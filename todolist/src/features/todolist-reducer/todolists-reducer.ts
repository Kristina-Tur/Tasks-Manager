import {v1} from "uuid";
import {api, FilterType, TodolistType} from "../../api/api";
import {Dispatch} from "redux";
import {TodolistDomainType} from "../TodolistsList/TodolistsList";


export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>

export type ActionsType =
    | RemoveTodolistActionType
    | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType
    | SetTodolistsActionType

export const todolistId1 = v1()
export const todolistId2 = v1()

const initialState: TodolistDomainType[] = []

export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: ActionsType): TodolistDomainType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return state.filter(s => s.id !== action.payload.id)
        case 'ADD-TODOLIST': {
            const newTodolist: TodolistDomainType = {
                id: action.payload.todolist.id,
                title: action.payload.todolist.title,
                filter: 'all',
                addedDate: '',
                order: 0
            }
            return [newTodolist, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(s => s.id === action.payload.id ? {...s, title: action.payload.title} : s)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(s => s.id === action.payload.id ? {...s, filter: action.payload.filter} : s)
        }
        case "SET-TODOLISTS": {
            return action.payload.todolists.map(tl => ({...tl, filter: 'all'}))
        }
        default:
            return state
    }
}

//actions
export const removeTodolistAC = (todolistId: string) => {
    return {type: 'REMOVE-TODOLIST', payload: {id: todolistId}} as const
}
export const addTodolistAC = (todolist: TodolistType) => {
    return {type: 'ADD-TODOLIST', payload: {todolist/*title: title, todolistId: v1()*/}} as const
}
export const changeTodolistTitleAC = (todolistId: string, title: string) => {
    return {type: 'CHANGE-TODOLIST-TITLE', payload: {id: todolistId, title: title}} as const
}
export const changeTodolistFilterAC = (todolistId: string, filter: FilterType) => {
    return {type: 'CHANGE-TODOLIST-FILTER', payload: {id: todolistId, filter: filter}} as const
}
export const setTodolistsAC = (todolists: TodolistType[]) => {
    return {type: 'SET-TODOLISTS', payload: {todolists}} as const
}

//thunks
export const getTodolistsTC = () => {
    return (dispatch: Dispatch) => {
        api.getTodolists().then(res => {
            dispatch(setTodolistsAC(res.data))
        })
    }
}
export const removeTodolistTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        api.removeTodolist(todolistId).then(() => {
            dispatch(removeTodolistAC(todolistId))
        })
    }
}
export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch) => {
        api.addTodolist(title).then(res => {
            dispatch(addTodolistAC(res.data.data.item))
        })
    }
}
export const changeTodolistTitleTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        api.updateTodolistTitle(todolistId, title).then(res => {
            dispatch(changeTodolistTitleAC(todolistId, title))
        })
    }
}



