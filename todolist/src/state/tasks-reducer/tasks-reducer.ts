import {TasksType} from "../../app/App";
import {v1} from "uuid";
import {
    AddTodolistActionType,
    RemoveTodolistActionType,
    todolistId1,
    todolistId2
} from "../todolist-reducer/todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../../api/todolists-api";

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>

export type ActionType =
    RemoveTaskActionType |
    AddTaskActionType |
    ChangeTaskTitleActionType |
    ChangeTaskStatusActionType |
    AddTodolistActionType |
    RemoveTodolistActionType

const initialState: TasksType = {}

export const tasksReducer = (state: TasksType = initialState, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return ({
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(task => task.id !== action.payload.taskId)
            })
        }
        case 'ADD-TASK': {
            const newTask = {
                id: v1(),
                title: action.payload.title,
                description: '',
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: action.payload.todolistId,
                order: 0,
                addedDate: ''
            }
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
                    ? {...task, status: action.payload.status} : task)
            }
        }
        case 'ADD-TODOLIST': {
            return {...state, [action.payload.todolistId]: []}
        }
        case "REMOVE-TODOLIST": {
            delete state[action.payload.id]
            return {...state}
        }
        default:
            return state
    }
}

export const removeTaskAC = (todolistId: string, taskId: string) => {
    return { type: 'REMOVE-TASK', payload: { todolistId, taskId } } as const
}
export const addTaskAC = (todolistId: string, title: string) => {
    return { type: 'ADD-TASK', payload: { todolistId, title } } as const
}
export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string) => {
    return { type: 'CHANGE-TASK-TITLE', payload: { todolistId, taskId, title } } as const
}
export const changeTaskStatusAC = (todolistId: string, taskId: string, status: TaskStatuses) => {
    return { type: 'CHANGE-TASK-STATUS', payload: { todolistId, taskId, status } } as const
}
