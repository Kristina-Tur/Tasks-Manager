import {
    AddTodolistActionType,
    RemoveTodolistActionType,
    SetTodolistsActionType
} from "../todolist-reducer/todolists-reducer";
import {api, TaskPriorities, TaskStatuses, TaskType, UpdateTaskModelType} from "../../api/api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../../app/store";

export type TasksType = {
    [key: string]: TaskType[]
}

export type ActionType =
    ReturnType<typeof removeTaskAC> |
    ReturnType<typeof addTaskAC> |
    ReturnType<typeof updateTaskAC> |
    ReturnType<typeof setTasksAC>|
    AddTodolistActionType |
    RemoveTodolistActionType |
    SetTodolistsActionType


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
            return {...state, [action.payload.task.todoListId]: [action.payload.task, ...state[action.payload.task.todoListId]]}
        }
        case 'UPDATE-TASK': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(task => task.id === action.payload.taskId
                    ? {...task, ...action.payload.model} : task)
            }
        }
        case 'ADD-TODOLIST': {
            return {...state, [action.payload.todolist.id]: []}
        }
        case "REMOVE-TODOLIST": {
            delete state[action.payload.id]
            return {...state}
        }
        case "SET-TODOLISTS":
            return action.payload.todolists.reduce((acc, tl) => {
                acc[tl.id] = []
                return acc
            }, state)
        case "SET-TASKS":
            return {...state, [action.payload.todolistId]: action.payload.tasks}
        default:
            return state
    }
}

//actions
export const removeTaskAC = (todolistId: string, taskId: string) => {
    return { type: 'REMOVE-TASK', payload: { todolistId, taskId } } as const
}
export const addTaskAC = (task: TaskType) => {
    return { type: 'ADD-TASK', payload: { task } } as const
}
export const updateTaskAC = (todolistId: string, taskId: string, model: UpdateDomainTaskModelType) => {
    return { type: 'UPDATE-TASK', payload: { todolistId, taskId, model } } as const
}
export const setTasksAC = (todolistId: string, tasks: TaskType[]) => {
    return { type: 'SET-TASKS', payload: { todolistId, tasks } } as const
}
export const getTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        api.getTasks(todolistId).then(res => {
            dispatch(setTasksAC(todolistId, res.data.items))
        })
    }
}
export const addTasksTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch) => {
        api.addTask(todolistId, title).then(res => {
            dispatch(addTaskAC(res.data.data.item))
        })
    }
}
export const removeTaskTC = (todolistId: string, taskId: string) => {
    return (dispatch: Dispatch) => {
        api.removeTask(todolistId, taskId).then(res => {
            dispatch(removeTaskAC(todolistId, taskId))
        })
    }
}

type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    completed?: boolean
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

//thunks
export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType) => {
    return (dispatch: Dispatch, getState: AppRootStateType) => {
        const task = getState().tasks[todolistId].find((task: { id: string; }) => task.id === taskId)

        if(task) {
            const apiModel: UpdateTaskModelType= {
                title: task.title,
                description: task.description,
                completed: task.completed,
                priority: task.priority,
                startDate: task.startDate,
                deadline: task.deadline,
                status: task.status,
                ...domainModel
            }
            api.updateTask(todolistId, taskId, apiModel).then(() => {
                dispatch(updateTaskAC(todolistId, taskId, domainModel))
            })
        }

    }
}



