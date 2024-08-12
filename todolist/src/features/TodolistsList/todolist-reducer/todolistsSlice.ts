import { FilterType, todolistAPI, TodolistDomainType, TodolistType } from "api/API"
import { handleServerNetworkError } from "utils/error-utils"
import { AppThunk } from "app/store"
import { getTasksTC } from "features/TodolistsList/tasks-reducer/tasksSlice"
import { RequestStatusType, setAppStatus } from "app/appSlice"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const slice = createSlice({
  name: "todolists",
  initialState: [] as TodolistDomainType[],
  reducers: {
    removeTodolist: (state, action: PayloadAction<{ todolistId: string }>) => {
      const index = state.findIndex((t) => t.id === action.payload.todolistId)
      if (index !== -1) {
        state.splice(index, 1)
      }
    },
    addTodolist: (state, action: PayloadAction<{ todolist: TodolistType }>) => {
      const newTodolist: TodolistDomainType = {
        ...action.payload.todolist,
        filter: "all",
        entityStatus: "idle",
      }
      state.unshift(newTodolist)
    },
    changeTodolistTitle: (state, action: PayloadAction<{ todolistId: string; title: string }>) => {
      const todolist = state.find((todolist) => todolist.id === action.payload.todolistId)
      if (todolist) {
        todolist.title = action.payload.title
      }
    },
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
    setTodolists: (state, action: PayloadAction<{ todolists: TodolistType[] }>) => {
      return action.payload.todolists.map((tl) => ({
        ...tl,
        filter: "all",
        entityStatus: "idle",
      }))

      /*action.payload.todolists.forEach((t) => {
        state.push({ ...t, entityStatus: "idle", filter: "all" })
      })*/
    },
    clearData: (state, action: PayloadAction) => {
      return []
    },
  },
  selectors: {
    selectTodolists: (state) => state,
  },
})

//thunks
export const fetchTodolistsTC = (): AppThunk => {
  return (dispatch) => {
    dispatch(setAppStatus({ status: "loading" }))
    todolistAPI
      .getTodolists()
      .then((res) => {
        dispatch(setTodolists({ todolists: res.data }))
        dispatch(setAppStatus({ status: "succeeded" }))
        return res.data
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch)
      })
      .then((todolists) => {
        /*debugger*/
        if (todolists) {
          todolists.forEach((todolist) => {
            dispatch(getTasksTC(todolist.id))
          })
        }
      })
  }
}
/*export const fetchTodolistsTC = () => {
    return async (dispatch: ThunkDispatch) => {
        dispatch(setAppStatusAC('loading'))
        const res = await todolistAPI.getTodolists()
        debugger
            try{
                dispatch(setTodolistsAC(res.data))
                dispatch(setAppStatusAC('succeeded'))
            } catch(error) {
            handleServerNetworkError(error.message, dispatch)
        }
    }
}*/

export const removeTodolistTC = (todolistId: string): AppThunk => {
  return (dispatch) => {
    dispatch(setAppStatus({ status: "loading" }))
    dispatch(changeTodolistEntityStatus({ todolistId, status: "loading" }))
    todolistAPI
      .removeTodolist(todolistId)
      .then(() => {
        dispatch(setAppStatus({ status: "succeeded" }))
        dispatch(removeTodolist({ todolistId: todolistId }))
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch)
      })
  }
}
export const addTodolistTC = (title: string): AppThunk => {
  return (dispatch) => {
    dispatch(setAppStatus({ status: "loading" }))
    todolistAPI
      .addTodolist(title)
      .then((res) => {
        dispatch(addTodolist({ todolist: res.data.data.item }))
        dispatch(setAppStatus({ status: "succeeded" }))
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch)
      })
  }
}
export const changeTodolistTitleTC = (todolistId: string, title: string): AppThunk => {
  return (dispatch) => {
    dispatch(setAppStatus({ status: "loading" }))
    todolistAPI
      .updateTodolistTitle(todolistId, title)
      .then((res) => {
        dispatch(changeTodolistTitle({ todolistId, title }))
        dispatch(setAppStatus({ status: "succeeded" }))
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch)
      })
  }
}
/*export const updateTodolistTC = (todolistId: string, domainModel: TodolistDomainType) => {
    return (dispatch: Dispatch<ActionsType>, getState: () => AppRootStateType) => {
        const todolist: TodolistType = getState().todolists.find(t => t.id === domainModel.id)

        const model: TodolistDomainType = {

        }

        api.updateTodolist(todolistId, model).then(res => {
            dispatch(changeTodolistTitleAC(todolistId, title))
        })
    }
}*/
export const todolistsReducer = slice.reducer
export const {
  removeTodolist,
  changeTodolistEntityStatus,
  changeTodolistFilter,
  changeTodolistTitle,
  clearData,
  setTodolists,
  addTodolist,
} = slice.actions
export const { selectTodolists } = slice.selectors
