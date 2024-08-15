import {
  TaskDomainType,
  TaskType,
  todolistAPI,
  TodolistType,
  UpdateTaskArgs,
  UpdateTaskModelType,
} from "features/TodolistsList/services/todolistApi"
import { AppDispatchType, AppRootStateType, AppThunk } from "app/store"
import { setAppStatus } from "app/appSlice"
import { asyncThunkCreator, buildCreateSlice, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { addTodolist, fetchTodolists, removeTodolist } from "features/TodolistsList/model/todolistSlice/todolistsSlice"
import { createAppAsyncThunk, handleServerAppError, handleServerNetworkError } from "common/utils"
import { RESULT_CODE } from "common/enums"

export type TasksType = {
  [key: string]: TaskDomainType[]
}

const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
})

const slice = createAppSlice({
  name: "tasks",
  initialState: {} as TasksType,
  reducers: (creators) => {
    return {
      clearTasks: creators.reducer(() => {
        return {}
      }),
      fetchTasks: creators.asyncThunk<
        {
          tasks: TaskType[]
          todolistId: string
        },
        string,
        { rejectValue: null }
      >(
        async (todolistId, thunkAPI) => {
          const { dispatch, rejectWithValue } = thunkAPI
          const appDispatch = dispatch as AppDispatchType
          dispatch(setAppStatus({ status: "loading" }))

          const res = await todolistAPI.getTasks(todolistId)

          try {
            const tasks: TaskType[] = res.data.items
            dispatch(setAppStatus({ status: "succeeded" }))
            return { tasks, todolistId }
          } catch (error) {
            handleServerNetworkError(error, appDispatch)
            return rejectWithValue(null)
          }
        },
        {
          fulfilled: (state, action) => {
            const domainTasks: TaskDomainType[] = action.payload.tasks.map((task) => ({
              ...task,
              entityStatus: "idle",
            }))
            state[action.payload.todolistId] = domainTasks
          },
        },
      ),
      addTask: creators.asyncThunk<{ task: TaskType }, { todolistId: string; title: string }, { rejectValue: null }>(
        async ({ todolistId, title }, thunkAPI) => {
          const { dispatch, rejectWithValue } = thunkAPI
          const appDispatch = dispatch as AppDispatchType
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
            handleServerNetworkError(error, appDispatch)
            return rejectWithValue(null)
          }
        },
        {
          fulfilled: (state, action) => {
            const tasks = state[action.payload.task.todoListId]
            tasks.unshift({ ...action.payload.task, entityStatus: "idle" })
          },
        },
      ),
      updateTask: creators.asyncThunk<UpdateTaskArgs, UpdateTaskArgs, { rejectValue: null }>(
        async ({ todolistId, taskId, domainModel }, thunkAPI) => {
          const { dispatch, getState, rejectWithValue } = thunkAPI
          const appDispatch = dispatch as AppDispatchType
          const tasks = (getState() as AppRootStateType).tasks
          try {
            const task = tasks[todolistId].find((task) => task.id === taskId)
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
            handleServerNetworkError(error, appDispatch)
            return rejectWithValue(null)
          }
        },
        {
          fulfilled: (state, action) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex((task) => task.id === action.payload.taskId)
            if (index !== -1) {
              tasks[index] = { ...tasks[index], ...action.payload.domainModel }
            }
          },
        },
      ),
      removeTask: creators.asyncThunk<
        { todolistId: string; taskId: string },
        {
          todolistId: string
          taskId: string
        },
        { rejectValue: null }
      >(
        async ({ todolistId, taskId }, thunkAPI) => {
          const { dispatch, rejectWithValue } = thunkAPI
          const appDispatch = dispatch as AppDispatchType
          try {
            dispatch(setAppStatus({ status: "loading" }))
            const res = await todolistAPI.removeTask(todolistId, taskId)
            dispatch(setAppStatus({ status: "succeeded" }))
            return { todolistId, taskId }
          } catch (error) {
            handleServerNetworkError(error, appDispatch)
            return rejectWithValue(null)
          }
        },
        {
          fulfilled: (state, action) => {
            const tasks = state[action.payload.todolistId]
            const index = tasks.findIndex((task) => task.id === action.payload.taskId)
            if (index !== -1) {
              tasks.splice(index, 1)
            }
          },
        },
      ),
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(addTodolist.fulfilled, (state, action) => {
        state[action.payload.todolist.id] = []
      })
      .addCase(removeTodolist.fulfilled, (state, action) => {
        delete state[action.payload.todolistId]
      })
      .addCase(fetchTodolists.fulfilled, (state, action) => {
        return action.payload.todolists.forEach((tl: any) => {
          state[tl.id] = []
        })
      })
    /*.addCase(clearData, () => {
                return {}
              })*/
  },
})

export const tasksReducer = slice.reducer
export const { clearTasks, fetchTasks, removeTask, updateTask, addTask } = slice.actions
