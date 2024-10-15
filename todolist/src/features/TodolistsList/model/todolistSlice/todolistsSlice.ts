import { AppDispatchType } from "app/store"
import { fetchTasks } from "features/TodolistsList/model/tasksSlice/tasksSlice"
import { RequestStatusType, setAppStatus } from "app/appSlice"
import { asyncThunkCreator, buildCreateSlice, PayloadAction } from "@reduxjs/toolkit"
import { handleServerNetworkError } from "common/utils"
import { FilterType, TodolistDomainType, TodolistType } from "features/TodolistsList/ui/todolistApi.types"
import { todolistAPI } from "features/TodolistsList/ui/todolistApi"

const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
})

const slice = createAppSlice({
  name: "todolists",
  initialState: [] as TodolistDomainType[],
  reducers: (creators) => {
    return {
      changeTodolistFilter: creators.reducer(
        (state, action: PayloadAction<{ todolistId: string; filter: FilterType }>) => {
          const todolist = state.find((todolist) => todolist.id === action.payload.todolistId)
          if (todolist) {
            todolist.filter = action.payload.filter
          }
        },
      ),
      changeTodolistEntityStatus: creators.reducer(
        (state, action: PayloadAction<{ todolistId: string; status: RequestStatusType }>) => {
          const todolist = state.find((todolist) => todolist.id === action.payload.todolistId)
          if (todolist) {
            todolist.entityStatus = action.payload.status
          }
        },
      ),
      clearTodolists: creators.reducer(() => {
        return []
      }),
      fetchTodolists: creators.asyncThunk<{ todolists: TodolistType[] }, undefined, { rejectValue: null }>(
        async (_, thunkAPI) => {
          const { dispatch, rejectWithValue } = thunkAPI
          const appDispatch = dispatch as AppDispatchType
          try {
            dispatch(setAppStatus({ status: "loading" }))
            const res = await todolistAPI.getTodolists()
            dispatch(setAppStatus({ status: "succeeded" }))
            return { todolists: res.data }
          } catch (error) {
            handleServerNetworkError(error, appDispatch)
            return rejectWithValue(null)
          }
        },
        {
          fulfilled: (state, action) => {
            return action.payload.todolists.map((tl) => ({
              ...tl,
              filter: "all",
              entityStatus: "idle",
            }))
          },
        },
      ),
      removeTodolist: creators.asyncThunk<{ todolistId: string }, string, { rejectValue: null }>(
        async (todolistId, thunkAPI) => {
          const { dispatch, rejectWithValue } = thunkAPI
          const appDispatch = dispatch as AppDispatchType
          try {
            dispatch(setAppStatus({ status: "loading" }))
            dispatch(changeTodolistEntityStatus({ todolistId, status: "loading" }))
            const res = await todolistAPI.removeTodolist(todolistId)
            dispatch(setAppStatus({ status: "succeeded" }))
            return { todolistId }
          } catch (error) {
            handleServerNetworkError(error, appDispatch)
            return rejectWithValue(null)
          }
        },
        {
          fulfilled: (state, action) => {
            const index = state.findIndex((t) => t.id === action.payload.todolistId)
            if (index !== -1) {
              state.splice(index, 1)
            }
          },
        },
      ),
      addTodolist: creators.asyncThunk<{ todolist: TodolistType }, string, { rejectValue: null }>(
        async (title, thunkAPI) => {
          const { dispatch, rejectWithValue } = thunkAPI
          const appDispatch = dispatch as AppDispatchType
          try {
            dispatch(setAppStatus({ status: "loading" }))
            const res: any = await todolistAPI.addTodolist(title)
            dispatch(setAppStatus({ status: "succeeded" }))
            return { todolist: res.data.data.item }
          } catch (error) {
            handleServerNetworkError(error, appDispatch)
            return rejectWithValue(null)
          }
        },
        {
          fulfilled: (state, action) => {
            const newTodolist: TodolistDomainType = {
              ...action.payload.todolist,
              filter: "all",
              entityStatus: "idle",
            }
            state.unshift(newTodolist)
          },
        },
      ),
      changeTodolistTitle: creators.asyncThunk<
        { todolistId: string; title: string },
        {
          todolistId: string
          title: string
        },
        { rejectValue: null }
      >(
        async ({ todolistId, title }, thunkAPI) => {
          const { dispatch, rejectWithValue } = thunkAPI
          const appDispatch = dispatch as AppDispatchType
          try {
            dispatch(setAppStatus({ status: "loading" }))
            const res = todolistAPI.updateTodolistTitle(todolistId, title)
            dispatch(setAppStatus({ status: "succeeded" }))
            return { todolistId, title }
          } catch (error) {
            handleServerNetworkError(error, appDispatch)
            return rejectWithValue(null)
          }
        },
        {
          fulfilled: (state, action) => {
            const todolist = state.find((todolist) => todolist.id === action.payload.todolistId)
            if (todolist) {
              todolist.title = action.payload.title
            }
          },
        },
      ),
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.fulfilled, () => {})
  },
  selectors: {
    selectTodolists: (state) => state,
  },
})

export const todolistsReducer = slice.reducer
export const {
  changeTodolistEntityStatus,
  changeTodolistFilter,
  clearTodolists,
  fetchTodolists,
  removeTodolist,
  changeTodolistTitle,
  addTodolist,
} = slice.actions
export const { selectTodolists } = slice.selectors
