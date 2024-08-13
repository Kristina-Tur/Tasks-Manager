import {
  TaskDomainType,
  TaskType,
  todolistAPI,
  UpdateTaskArgs,
  UpdateTaskModelType,
} from "features/TodolistsList/todolistApi"
import { AppThunk } from "app/store"
import { setAppStatus } from "app/appSlice"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { addTodolist, fetchTodolists, removeTodolist } from "features/TodolistsList/todolist-reducer/todolistsSlice"
import { createAppAsyncThunk, handleServerAppError, handleServerNetworkError } from "common/utils"
import { RESULT_CODE } from "common/enums"

export type TasksType = {
  [key: string]: TaskDomainType[]
}

const slice = createSlice({
  name: "tasks",
  initialState: {} as TasksType,
  reducers: {
    clearTasks: () => {
      return {}
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, (state, action) => {
        const domainTasks: TaskDomainType[] = action.payload.tasks.map((task) => ({
          ...task,
          entityStatus: "idle",
        }))
        state[action.payload.todolistId] = domainTasks
      })
      .addCase(addTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.task.todoListId]
        tasks.unshift({ ...action.payload.task, entityStatus: "idle" })
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.todolistId]
        const index = tasks.findIndex((task) => task.id === action.payload.taskId)
        if (index !== -1) {
          tasks[index] = { ...tasks[index], ...action.payload.domainModel }
        }
      })
      .addCase(removeTask.fulfilled, (state, action) => {
        const tasks = state[action.payload.todolistId]
        const index = tasks.findIndex((task) => task.id === action.payload.taskId)
        if (index !== -1) {
          tasks.splice(index, 1)
        }
      })
      .addCase(addTodolist.fulfilled, (state, action) => {
        state[action.payload.todolist.id] = []
      })
      .addCase(removeTodolist.fulfilled, (state, action) => {
        delete state[action.payload.todolistId]
      })
      .addCase(fetchTodolists.fulfilled, (state, action) => {
        return action.payload.todolists.forEach((tl) => {
          state[tl.id] = []
        })
      })
    /*.addCase(clearData, () => {
        return {}
      })*/
  },
})

//thunks
export const fetchTasks = createAppAsyncThunk<
  {
    tasks: TaskType[]
    todolistId: string
  },
  string
>(`${slice.name}/fetchTasks`, async (todolistId, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI

  dispatch(setAppStatus({ status: "loading" }))

  const res = await todolistAPI.getTasks(todolistId)

  try {
    const tasks: TaskType[] = res.data.items
    dispatch(setAppStatus({ status: "succeeded" }))
    return { tasks, todolistId }
  } catch (error) {
    handleServerNetworkError(error, dispatch)
    return rejectWithValue(null)
  }
})

export const addTask = createAppAsyncThunk<{ task: TaskType }, { todolistId: string; title: string }>(
  `${slice.name}/addTasks`,
  async ({ todolistId, title }, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI

    try {
      dispatch(setAppStatus({ status: "loading" }))
      const res = await todolistAPI.createTask(todolistId, title)
      if (res.data.resultCode === RESULT_CODE.SUCCESS) {
        dispatch(setAppStatus({ status: "succeeded" }))
        return { task: res.data.data.item }
      } else {
        handleServerAppError(res.data, dispatch)
        return rejectWithValue(null)
      }
    } catch (error) {
      handleServerNetworkError(error, dispatch)
      return rejectWithValue(null)
    }
  },
)

export const removeTask = createAppAsyncThunk<
  { todolistId: string; taskId: string },
  {
    todolistId: string
    taskId: string
  }
>(`${slice.name}/removeTask`, async ({ todolistId, taskId }, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI

  try {
    dispatch(setAppStatus({ status: "loading" }))
    const res = await todolistAPI.removeTask(todolistId, taskId)
    dispatch(setAppStatus({ status: "succeeded" }))
    return { todolistId, taskId }
  } catch (error) {
    handleServerNetworkError(error, dispatch)
    return rejectWithValue(null)
  }
})

export const updateTask = createAppAsyncThunk<UpdateTaskArgs, UpdateTaskArgs>(
  `${slice.name}/updateTask`,
  async ({ todolistId, taskId, domainModel }, thunkAPI) => {
    const { dispatch, getState, rejectWithValue } = thunkAPI
    try {
      const task = getState().tasks[todolistId].find((task) => task.id === taskId)
      dispatch(setAppStatus({ status: "loading" }))

      if (!task) {
        return rejectWithValue(null)
      }

      const apiModel: UpdateTaskModelType = {
        title: task.title,
        description: task.description,
        priority: task.priority,
        startDate: task.startDate,
        deadline: task.deadline,
        status: task.status,
        ...domainModel,
      }
      const res = await todolistAPI.updateTask(todolistId, taskId, apiModel)

      if (res.data.resultCode === 0) {
        dispatch(setAppStatus({ status: "succeeded" }))
        return { todolistId, taskId, domainModel }
      } else {
        handleServerAppError(res.data, dispatch)
        return rejectWithValue(null)
      }
    } catch (error) {
      handleServerNetworkError(error, dispatch)
      return rejectWithValue(null)
    }
  },
)

export const tasksReducer = slice.reducer
export const { clearTasks } = slice.actions
