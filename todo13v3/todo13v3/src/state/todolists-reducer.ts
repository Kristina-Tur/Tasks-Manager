import {v1} from 'uuid';
import {FilterValuesType, TodolistDomainType} from '../App';
import {todolistApi, TodolistType} from "../api/api";
import {Dispatch} from "redux";
import {setAppErrorAC, setAppLoadingAC} from "./app-reducer";

export type RemoveTodolistActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}
export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    todolist: TodolistType
}
export type ChangeTodolistTitleActionType = {
    type: 'CHANGE-TODOLIST-TITLE',
    id: string
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string
    filter: FilterValuesType
}
export type setTodolistActionType = {
    type: 'SET-TODOLISTS'
    todolists: TodolistType[]
}

type ActionsType = RemoveTodolistActionType | AddTodolistActionType
    | ChangeTodolistTitleActionType
    | ChangeTodolistFilterActionType | setTodolistActionType

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: Array<TodolistDomainType> = initialState, action: ActionsType): Array<TodolistDomainType> => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(tl => tl.id !== action.id)
        }
        case 'ADD-TODOLIST': {
            return [{
                id: action.todolist.id,
                title: action.todolist.title,
                filter: 'all',
                addedDate: '',
                order: 0,
                entityStatus: "idle"
            }, ...state]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.title = action.title;
            }
            return [...state]
        }
        case 'CHANGE-TODOLIST-FILTER': {
            const todolist = state.find(tl => tl.id === action.id);
            if (todolist) {
                // если нашёлся - изменим ему заголовок
                todolist.filter = action.filter;
            }
            return [...state]
        }
        case "SET-TODOLISTS":
            return action.todolists.map(tl => ({...tl, filter: 'all', entityStatus: "idle"}))
        default:
            return state;
    }
}

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return {type: 'REMOVE-TODOLIST', id: todolistId}
}
export const addTodolistAC = (todolist: TodolistType): AddTodolistActionType => {
    return {type: 'ADD-TODOLIST', todolist}
}
export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return {type: 'CHANGE-TODOLIST-TITLE', id: id, title: title}
}
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return {type: 'CHANGE-TODOLIST-FILTER', id: id, filter: filter}
}
export const setTodolistAC = (todolists: TodolistType[]): setTodolistActionType => {
    return {type: 'SET-TODOLISTS', todolists}
}

export const setTodolistTC = () => {
    return (dispatch: Dispatch) => {
        dispatch(setAppLoadingAC('loading'))
        todolistApi.getTodolists()
            .then((res) => {
            dispatch(setTodolistAC(res.data))
            dispatch(setAppLoadingAC('succeeded'))
        })
            .catch(rej => {
                dispatch(setAppErrorAC('some error occurred'))
                dispatch(setAppLoadingAC('failed'))
            })
    }

}

export const addTodolistTC = (title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppLoadingAC('loading'))
        todolistApi.createTodolist(title)
            .then((res) => {
            dispatch(addTodolistAC(res.data.data.item))
            dispatch(setAppLoadingAC('succeeded'))
        })
            .catch(rej => {
                dispatch(setAppErrorAC('some error occurred'))
                dispatch(setAppLoadingAC('failed'))
            })
    }

}
export const removeTodolistTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppLoadingAC('loading'))
        todolistApi.deleteTodolist(todolistId)
            .then((res) => {
            dispatch(removeTodolistAC(todolistId))
            dispatch(setAppLoadingAC('succeeded'))
        })
            .catch(rej => {
                dispatch(setAppErrorAC('some error occurred'))
                dispatch(setAppLoadingAC('failed'))
            })
    }

}
export const updateTodolistTitleTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppLoadingAC('loading'))
        todolistApi.updateTodolist(todolistId, title)
            .then((res) => {
            dispatch(changeTodolistTitleAC(todolistId, title))
            dispatch(setAppLoadingAC('succeeded'))
        })
            .catch(rej => {
                dispatch(setAppErrorAC('some error occurred'))
                dispatch(setAppLoadingAC('failed'))
            })
    }

}

