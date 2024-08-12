import { TaskDomainType, TaskPriorities, TaskStatuses, TaskType, todolistAPI, UpdateTaskModelType } from "api/API"
import { Dispatch } from "redux"
import { AppRootStateType, AppThunk } from "app/store"
import { handleServerAppError, handleServerNetworkError } from "utils/error-utils"
import { setAppStatus } from "app/appSlice"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import {
  addTodolist,
  clearData,
  removeTodolist,
  setTodolists,
} from "features/TodolistsList/todolist-reducer/todolistsSlice"

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

const slice = createSlice({
  name: "tasks",
  initialState: {} as TasksType,
  reducers: {
    removeTask: (state, action: PayloadAction<{ todolistId: string; taskId: string }>) => {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex((task) => task.id === action.payload.taskId)
      if (index !== -1) {
        tasks.splice(index, 1)
      }
    },
    addTask: (state, action: PayloadAction<{ task: TaskType }>) => {
      const tasks = state[action.payload.task.todoListId]
      tasks.unshift({ ...action.payload.task, entityStatus: "idle" })
    },
    updateTask: (
      state,
      action: PayloadAction<{ todolistId: string; taskId: string; model: UpdateDomainTaskModelType }>,
    ) => {
      const tasks = state[action.payload.todolistId]
      const index = tasks.findIndex((task) => task.id === action.payload.taskId)
      if (index !== -1) {
        tasks[index] = { ...tasks[index], ...action.payload.model }
      }
    },
    setTasks: (state, action: PayloadAction<{ todolistId: string; tasks: TaskType[] }>) => {
      const domainTasks: TaskDomainType[] = action.payload.tasks.map((task) => ({ ...task, entityStatus: "idle" }))
      state[action.payload.todolistId] = domainTasks
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTodolist, (state, action) => {
        state[action.payload.todolist.id] = []
      })
      .addCase(removeTodolist, (state, action) => {
        delete state[action.payload.todolistId]
      })
      .addCase(setTodolists, (state, action) => {
        return action.payload.todolists.forEach((tl) => {
          state[tl.id] = []
        })
      })
      .addCase(clearData, (state, action) => {
        return {}
      })
  },
})

//thunks
export const getTasksTC = (todolistId: string): AppThunk => {
  return (dispatch) => {
    dispatch(setAppStatus({ status: "loading" }))
    todolistAPI
      .getTasks(todolistId)
      .then((res) => {
        dispatch(setTasks({ todolistId, tasks: res.data.items }))
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
          dispatch(addTask({ task: res.data.data.item }))
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
        dispatch(removeTask({ todolistId, taskId }))
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
            dispatch(updateTask({ todolistId, taskId, model: domainModel }))
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

export const tasksReducer = slice.reducer
export const { setTasks, addTask, updateTask, removeTask } = slice.actions
