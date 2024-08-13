import {
  FilterType,
  TaskDomainType,
  todolistAPI,
  TodolistDomainType,
  TodolistType,
} from "features/TodolistsList/todolistApi"
import { AppThunk } from "app/store"
import { addTask, fetchTasks } from "features/TodolistsList/tasks-reducer/tasksSlice"
import { RequestStatusType, setAppStatus } from "app/appSlice"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { createAppAsyncThunk, handleServerNetworkError } from "common/utils"
import { BaseResponse } from "common/types/types"

const slice = createSlice({
  name: "todolists",
  initialState: [] as TodolistDomainType[],
  reducers: {
    changeTodolistFilter: (state, action: PayloadAction<{ todolistId: string; filter: FilterType }>) => {
      const todolist = state.find((todolist) => todolist.id === action.payload.todolistId)
      if (todolist) {
        todolist.filter = action.payload.filter
      }
    },
    changeTodolistEntityStatus: (
      state,
      action: PayloadAction<{
        todolistId: string
        status: RequestStatusType
      }>,
    ) => {
      const todolist = state.find((todolist) => todolist.id === action.payload.todolistId)
      if (todolist) {
        todolist.entityStatus = action.payload.status
      }
    },
    /*clearData: () => {
                          return []
                        },*/
    clearTodolists: () => {
      return []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.fulfilled, () => {})
      .addCase(fetchTodolists.fulfilled, (state, action) => {
        return action.payload.todolists.map((tl) => ({
          ...tl,
          filter: "all",
          entityStatus: "idle",
        }))
      })
      .addCase(removeTodolist.fulfilled, (state, action) => {
        const index = state.findIndex((t) => t.id === action.payload.todolistId)
        if (index !== -1) {
          state.splice(index, 1)
        }
      })
      .addCase(addTodolist.fulfilled, (state, action) => {
        const newTodolist: TodolistDomainType = {
          ...action.payload.todolist,
          filter: "all",
          entityStatus: "idle",
        }
        state.unshift(newTodolist)
      })
      .addCase(changeTodolistTitle.fulfilled, (state, action) => {
        const todolist = state.find((todolist) => todolist.id === action.payload.todolistId)
        if (todolist) {
          todolist.title = action.payload.title
        }
      })
  },
  selectors: {
    selectTodolists: (state) => state,
  },
})

//thunks
export const fetchTodolists = createAppAsyncThunk<{
  todolists: TodolistType[]
}>(`${slice.name}/fetchTodolists`, async (arg, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI
  try {
    dispatch(setAppStatus({ status: "loading" }))
    const res = await todolistAPI.getTodolists()
    dispatch(setAppStatus({ status: "succeeded" }))
    return { todolists: res.data }
  } catch (error) {
    handleServerNetworkError(error, dispatch)
    return rejectWithValue(null)
  }
})
/*export const fetchTodolistsTC = (): AppThunk => {
  return (dispatch) => {
    
      .catch(() => {
        
      })
      /!*.then((todolists) => {
        if (todolists) {
          todolists.forEach((todolist) => {
            dispatch(fetchTasks(todolist.id))
          })
        }
      })*!/
  }
}*/

export const removeTodolist = createAppAsyncThunk<{ todolistId: string }, string>(
  `${slice.name}/removeTodolist`,
  async (todolistId, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
      dispatch(setAppStatus({ status: "loading" }))
      dispatch(changeTodolistEntityStatus({ todolistId, status: "loading" }))
      const res = await todolistAPI.removeTodolist(todolistId)
      dispatch(setAppStatus({ status: "succeeded" }))
      return { todolistId }
    } catch (error) {
      handleServerNetworkError(error, dispatch)
      return rejectWithValue(null)
    }
  },
)

export const addTodolist = createAppAsyncThunk<{ todolist: TodolistType }, string>(
  `${slice.name}/addTodolist`,
  async (title, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    try {
      dispatch(setAppStatus({ status: "loading" }))
      const res: any = await todolistAPI.addTodolist(title)
      dispatch(setAppStatus({ status: "succeeded" }))
      return { todolist: res.data.data.item }
    } catch (error) {
      handleServerNetworkError(error, dispatch)
      return rejectWithValue(null)
    }
  },
)

export const changeTodolistTitle = createAppAsyncThunk<
  { todolistId: string; title: string },
  {
    todolistId: string
    title: string
  }
>(`${slice.name}/changeTodolistTitle`, async ({ todolistId, title }, thunkAPI) => {
  const { dispatch, rejectWithValue } = thunkAPI
  try {
    dispatch(setAppStatus({ status: "loading" }))
    const res = todolistAPI.updateTodolistTitle(todolistId, title)
    dispatch(setAppStatus({ status: "succeeded" }))
    return { todolistId, title }
  } catch (error) {
    handleServerNetworkError(error, dispatch)
    return rejectWithValue(null)
  }
})

export const todolistsReducer = slice.reducer
export const { changeTodolistEntityStatus, changeTodolistFilter, clearTodolists } = slice.actions
export const { selectTodolists } = slice.selectors
