import {
    AddTodolistActionType,
    RemoveTodolistActionType,
    SetTodolistsActionType
} from "../todolist-reducer/todolists-reducer";
import {api, TaskPriorities, TaskStatuses, TaskType, UpdateTaskModelType} from "../../api/api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../../app/store";
import {setAppErrorAC, SetAppErrorActionType, setAppStatusAC, SetAppStatusActionType} from "../../app/app-reducer";

type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    completed?: boolean
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}

export type TasksType = {
    [key: string]: TaskType[]
}

export type ActionsType =
    ReturnType<typeof removeTaskAC> |
    ReturnType<typeof addTaskAC> |
    ReturnType<typeof updateTaskAC> |
    ReturnType<typeof setTasksAC>|
    AddTodolistActionType |
    RemoveTodolistActionType |
    SetTodolistsActionType


const initialState: TasksType = {}

export const tasksReducer = (state: TasksType = initialState, action: ActionsType) => {
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
            }, {...state})
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

//thunks
export const getTasksTC = (todolistId: string) => {
    return (dispatch: ThunkDispatch) => {
        dispatch(setAppStatusAC('loading'))
        api.getTasks(todolistId).then(res => {
            dispatch(setTasksAC(todolistId, res.data.items))
            dispatch(setAppStatusAC('succeeded'))
        }).catch((error) => {
            console.log(error)
        })
    }
}
export const addTasksTC = (todolistId: string, title: string) => {
    return (dispatch: Dispatch<ActionsType | SetAppErrorActionType | SetAppStatusActionType>) => {
        dispatch(setAppStatusAC('loading'))
        api.addTask(todolistId, title).then(res => {
            if(res.data.resultCode === 0){
                dispatch(addTaskAC(res.data.data.item))
                dispatch(setAppStatusAC('succeeded'))
            }else if(res.data.messages.length){
                dispatch(setAppErrorAC(res.data.messages[0]))
            }else{
                dispatch(setAppErrorAC('some error occurred'))
            }
            dispatch(setAppStatusAC('failed'))
        })
    }
}
export const removeTaskTC = (todolistId: string, taskId: string) => {
    return (dispatch: Dispatch<ActionsType>) => {
        api.removeTask(todolistId, taskId).then(res => {
            dispatch(removeTaskAC(todolistId, taskId))
        })
    }
}

export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType) => {
    return (dispatch: Dispatch<ActionsType>, getState: () => AppRootStateType) => {
        const task = getState().tasks[todolistId].find((task) => task.id === taskId)

        if(task) {
            const apiModel: UpdateTaskModelType= {
                title: task.title,
                description: task.description,
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

export type ThunkDispatch = Dispatch<ActionsType | SetAppStatusActionType>

