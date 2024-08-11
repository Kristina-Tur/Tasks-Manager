import { Dispatch } from "redux"
import { setAppStatus } from "app/appSlice"
import { authAPI, LoginParamsType } from "api/API"
import { handleServerAppError, handleServerNetworkError } from "utils/error-utils"
import { clearData } from "features/TodolistsList/todolist-reducer/todolistsSlice"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const slice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    setIsLoginIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
      state.isLoggedIn = action.payload.isLoggedIn
    },
  },
})

//TC
export const loginTC = (value: LoginParamsType) => {
  return (dispatch: Dispatch) => {
    dispatch(setAppStatus({ status: "loading" }))
    authAPI
      .login(value)
      .then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(setIsLoginIn({ isLoggedIn: true }))
        } else {
          handleServerAppError(res.data, dispatch)
        }
        dispatch(setAppStatus({ status: "idle" }))
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch)
      })
  }
}
export const logoutTC = () => {
  return (dispatch: Dispatch) => {
    dispatch(setAppStatus({ status: "loading" }))
    authAPI
      .logout()
      .then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(setIsLoginIn({ isLoggedIn: false }))
          dispatch(clearData())
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

//type
/*export type AuthActionsType = ReturnType<typeof setIsLoginInAC>*/
export const authReducer = slice.reducer
export const { setIsLoginIn } = slice.actions
