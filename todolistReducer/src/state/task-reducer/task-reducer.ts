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
export type RefreshTasksACActionType = {
    type: 'REFRESH-TASKS',
    payload: {
        todolistId: string
    }

}

export type AddNewTodolistAndTasksActionType = {
    type: 'ADD-IN-NEW-TODOLIST-TASKS'
    payload: {
        todolistId: string
    }
}


type actionType =
    RemoveTaskActionType |
    AddTaskActionType |
    ChangeTaskTitleActionType |
    ChangeTaskStatusActionType |
    RefreshTasksACActionType |
    AddNewTodolistAndTasksActionType

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
        case 'REFRESH-TASKS': {
            delete state[action.payload.todolistId]
            return {...state}
        }
        case 'ADD-IN-NEW-TODOLIST-TASKS': {
            return {...state, [action.payload.todolistId]: []}
        }

        default:
            return state
    }
}

export const removeTaskAC = (todolistId: string, taskId: string): RemoveTaskActionType => {
    return { type: 'REMOVE-TASK', payload: { todolistId, taskId } } as const
}
export const addTaskAC = (todolistId: string, title: string): AddTaskActionType => {
    return { type: 'ADD-TASK', payload: { todolistId, title } } as const
}
export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string): ChangeTaskTitleActionType => {
    return { type: 'CHANGE-TASK-TITLE', payload: { todolistId, taskId, title } } as const
}
export const changeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean): ChangeTaskStatusActionType => {
    return { type: 'CHANGE-TASK-STATUS', payload: { todolistId, taskId, isDone } } as const
}
export const refreshTasksAC = (todolistId: string): RefreshTasksACActionType => {
    return { type: 'REFRESH-TASKS', payload: {todolistId}} as const
}
export const AddInNewTodolistTasksAC = (todolistId: string): AddNewTodolistAndTasksActionType => {
    return { type: 'ADD-IN-NEW-TODOLIST-TASKS', payload: {todolistId}} as const
}