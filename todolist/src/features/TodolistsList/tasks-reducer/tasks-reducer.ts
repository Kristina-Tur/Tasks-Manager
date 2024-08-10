import {
  AddTodolistActionType,
  ClearDataACActionType,
  RemoveTodolistActionType,
  SetTodolistsActionType,
} from "features/TodolistsList/todolist-reducer/todolistsSlice"
import { TaskDomainType, TaskPriorities, TaskStatuses, TaskType, todolistAPI, UpdateTaskModelType } from "api/API"
import { Dispatch } from "redux"
import { AppRootStateType, AppThunk } from "app/store"
import { handleServerAppError, handleServerNetworkError } from "utils/error-utils"
import { setAppStatus } from "app/appSlice"

enum RESULT_CODE {
  SUCCESS = 0,
  ERROR = 1,
  ERROR_RECAPTCHA = 10,
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

export type TasksType = {
  [key: string]: TaskDomainType[]
}

export type TasksActionsType =
  | ReturnType<typeof removeTaskAC>
  | ReturnType<typeof addTaskAC>
  | ReturnType<typeof updateTaskAC>
  | ReturnType<typeof setTasksAC>
  | AddTodolistActionType
  | RemoveTodolistActionType
  | SetTodolistsActionType
  | ClearDataACActionType

const initialState: TasksType = {}

export const tasksReducer = (state: TasksType = initialState, action: TasksActionsType) => {
  switch (action.type) {
    case "REMOVE-TASK": {
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].filter(
          (task) => task.id !== action.payload.taskId,
        ),
      }
    }
    case "ADD-TASK":
      return {
        ...state,
        [action.payload.task.todoListId]: [action.payload.task, ...state[action.payload.task.todoListId]],
      }
    case "UPDATE-TASK":
      return {
        ...state,
        [action.payload.todolistId]: state[action.payload.todolistId].map((task) =>
          task.id === action.payload.taskId ? { ...task, ...action.payload.model } : task,
        ),
      }
    case "ADD-TODOLIST": {
      return { ...state, [action.payload.todolist.id]: [] }
    }
    case "REMOVE-TODOLIST": {
      delete state[action.payload.id]
      return { ...state }
    }
    case "SET-TODOLISTS":
      return action.payload.todolists.reduce(
        (acc, tl) => {
          acc[tl.id] = []
          return acc
        },
        { ...state },
      )
    case "SET-TASKS":
      return { ...state, [action.payload.todolistId]: action.payload.tasks }
    case "CLEAR-DATA":
      return {}
    default:
      return state
  }
}

//actions
export const removeTaskAC = (todolistId: string, taskId: string) => {
  return { type: "REMOVE-TASK", payload: { todolistId, taskId } } as const
}
export const addTaskAC = (task: TaskType) => {
  return { type: "ADD-TASK", payload: { task } } as const
}
export const updateTaskAC = (todolistId: string, taskId: string, model: UpdateDomainTaskModelType) => {
  return { type: "UPDATE-TASK", payload: { todolistId, taskId, model } } as const
}
export const setTasksAC = (todolistId: string, tasks: TaskType[]) => {
  return { type: "SET-TASKS", payload: { todolistId, tasks } } as const
}

//thunks
export const getTasksTC = (todolistId: string): AppThunk => {
  return (dispatch) => {
    dispatch(setAppStatus({ status: "loading" }))
    todolistAPI
      .getTasks(todolistId)
      .then((res) => {
        dispatch(setTasksAC(todolistId, res.data.items))
        dispatch(setAppStatus({ status: "succeeded" }))
      })
      .catch((error) => {
        console.log(error)
        handleServerNetworkError(error, dispatch)
      })
  }
}
export const addTasksTC = (todolistId: string, title: string): AppThunk => {
  return (dispatch) => {
    dispatch(setAppStatus({ status: "loading" }))
    todolistAPI
      .addTask(todolistId, title)
      .then((res) => {
        if (res.data.resultCode === RESULT_CODE.SUCCESS) {
          dispatch(addTaskAC(res.data.data.item))
          dispatch(setAppStatus({ status: "succeeded" }))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch)
      })
  }
}
export const removeTaskTC = (todolistId: string, taskId: string): AppThunk => {
  return (dispatch) => {
    dispatch(setAppStatus({ status: "loading" }))
    todolistAPI
      .removeTask(todolistId, taskId)
      .then((res) => {
        dispatch(removeTaskAC(todolistId, taskId))
        dispatch(setAppStatus({ status: "succeeded" }))
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch)
      })
  }
}

export const updateTaskTC = (todolistId: string, taskId: string, domainModel: UpdateDomainTaskModelType): AppThunk => {
  return (dispatch, getState: () => AppRootStateType) => {
    const task = getState().tasks[todolistId].find((task) => task.id === taskId)
    dispatch(setAppStatus({ status: "loading" }))

    if (task) {
      const apiModel: UpdateTaskModelType = {
        title: task.title,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
        status: task.status,
        ...domainModel,
      }

      todolistAPI
        .updateTask(todolistId, taskId, apiModel)
        .then((res) => {
          if (res.data.resultCode === 0) {
            dispatch(updateTaskAC(todolistId, taskId, domainModel))
            dispatch(setAppStatus({ status: "succeeded" }))
          } else {
            handleServerAppError(res.data, dispatch)
          }
        })
        .catch((error) => {
          handleServerNetworkError(error, dispatch)
        })
    }
  }
}
