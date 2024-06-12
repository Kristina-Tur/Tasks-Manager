import {TasksType} from "../../App";
import {v1} from "uuid";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    payload: {
        todolistId: string
        taskId: string
    }
}
export type AddTaskActionType = {
    type: 'ADD-TASK'
    payload: {
        todolistId: string
        title: string
    }
}

export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    payload: {
        todolistId: string
        taskId: string
        title: string
    }
}
export type ChangeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    payload: {
        todolistId: string
        taskId: string
        isDone: boolean
    }
}


type actionType =
    RemoveTaskActionType |
    AddTaskActionType |
    ChangeTaskTitleActionType |
    ChangeTaskStatusActionType

export const taskReducer = (state: TasksType, action: actionType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return ({
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(task => task.id !== action.payload.taskId)
            })
        }
        case 'ADD-TASK': {
            const newTask = {id: v1(), isDone: false, title: action.payload.title}
            return {...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]}
        }
        case 'CHANGE-TASK-TITLE': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(task => task.id === action.payload.taskId
                    ? {...task, title: action.payload.title} : task)
            }
        }
        case 'CHANGE-TASK-STATUS': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(task => task.id === action.payload.taskId
                    ? {...task, isDone: action.payload.isDone} : task)
            }
        }

        default:
            return state
    }
}