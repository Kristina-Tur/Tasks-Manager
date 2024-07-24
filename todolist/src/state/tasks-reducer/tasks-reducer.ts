import {TasksType} from "../../app/App";
import {v1} from "uuid";
import {
    AddTodolistActionType,
    RemoveTodolistActionType, setTodolistsAC, SetTodolistsActionType,
    todolistId1,
    todolistId2
} from "../todolist-reducer/todolists-reducer";
import {api, TaskPriorities, TaskStatuses, TaskType, UpdateTaskModel} from "../../api/api";
import {Dispatch} from "redux";
import {AppRootStateType} from "../store";

export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type ChangeTaskTitleActionType = ReturnType<typeof changeTaskTitleAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type SetTasksActionType = ReturnType<typeof setTasksAC>

export type ActionType =
    RemoveTaskActionType |
    AddTaskActionType |
    ChangeTaskTitleActionType |
    ChangeTaskStatusActionType |
    AddTodolistActionType |
    RemoveTodolistActionType |
    SetTodolistsActionType |
    SetTasksActionType

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

export const removeTaskAC = (todolistId: string, taskId: string) => {
    return { type: 'REMOVE-TASK', payload: { todolistId, taskId } } as const
}
export const addTaskAC = (task: TaskType) => {
    return { type: 'ADD-TASK', payload: { task } } as const
}
export const changeTaskTitleAC = (todolistId: string, taskId: string, title: string) => {
    return { type: 'CHANGE-TASK-TITLE', payload: { todolistId, taskId, title } } as const
}
export const changeTaskStatusAC = (todolistId: string, taskId: string, status: TaskStatuses) => {
    return { type: 'CHANGE-TASK-STATUS', payload: { todolistId, taskId, status } } as const
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
        api.createTask(todolistId, title).then(res => {
            dispatch(addTaskAC(res.data.data.item))
        })
    }
}

export const deleteTaskTC = (todolistId: string, taskId: string) => {
    return (dispatch: Dispatch) => {
        api.deleteTask(todolistId, taskId).then(res => {
            dispatch(removeTaskAC(todolistId, taskId))
        })
    }
}

export const updateTaskStatusTC = (todolistId: string, taskId: string, status: TaskStatuses) => {
    return (dispatch: Dispatch, getState: AppRootStateType) => {
        const task = getState().tasks[todolistId].find((task: { id: string; }) => task.id === taskId)

        if(task) {
            const model: UpdateTaskModel= {
                title: task.title,
                description: task.description,
                completed: task.completed,
                priority: task.priority,
                startDate: task.startDate,
                deadline: task.deadline,
                status: status
            }
            api.updateTask(todolistId, taskId, model).then(() => {
                dispatch(changeTaskStatusAC(todolistId, taskId, status))
            })
        }

    }
}

export const updateTaskTitleTC = (todolistId: string, taskId: string, title: string) => {
    return (dispatch: Dispatch, getState: AppRootStateType) => {
        const task = getState().tasks[todolistId].find((task: { id: string; }) => task.id === taskId)

        if(task) {
            const model: UpdateTaskModel= {
                title,
                description: task.description,
                completed: task.completed,
                priority: task.priority,
                startDate: task.startDate,
                deadline: task.deadline,
                status: task.status
            }
            api.updateTask(todolistId, taskId, model).then(() => {
                dispatch(changeTaskTitleAC(todolistId, taskId, title))
            })
        }

    }
}


