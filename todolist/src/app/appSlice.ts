import { authAPI } from "api/API"
import { Dispatch } from "redux"
import { handleServerAppError, handleServerNetworkError } from "utils/error-utils"
import { setIsLoginIn } from "features/login/authSlice"
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"

const slice = createSlice({
  name: "app",
  initialState: {
    status: "loading" as RequestStatusType,
    error: null as string | null,
    isInitialized: false,
  },
  reducers: {
    setAppStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
      state.status = action.payload.status
    },
    setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error
    },
    setAppIsInitialized: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
      state.isInitialized = action.payload.isInitialized
    },
  },
  selectors: {
    selectStatus: (state) => state.status,
    selectIsInitialized: (state) => state.isInitialized,
    selectError: (state) => state.error,
  },
})

export const initializedAppTC = () => {
  return (dispatch: Dispatch) => {
    dispatch(setAppStatus({ status: "loading" }))
    authAPI
      .me()
      .then((res) => {
        if (res.data.resultCode === 0) {
          dispatch(setIsLoginIn({ isLoggedIn: true }))
          dispatch(setAppStatus({ status: "succeeded" }))
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch((error) => {
        handleServerNetworkError(error, dispatch)
      })
      .finally(() => dispatch(setAppIsInitialized({ isInitialized: true })))
  }
}

export const appReducer = slice.reducer
export const { setAppStatus, setAppError, setAppIsInitialized } = slice.actions
export const { selectStatus, selectIsInitialized, selectError } = slice.selectors
export type AppInitialState = ReturnType<typeof slice.getInitialState>
