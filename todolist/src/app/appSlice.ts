import { Dispatch } from "redux"
import { handleServerAppError } from "common/utils/handleServerAppError"
import { asyncThunkCreator, buildCreateSlice, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RESULT_CODE } from "common/enums"
import { authAPI } from "features/auth/api/authApi"
import { handleServerNetworkError } from "common/utils"
import { LoginParamsType } from "features/auth/api/authApi.types"
import { AppDispatchType } from "app/store"

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed"

const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
})

const slice = createAppSlice({
  name: "app",
  initialState: {
    status: "loading" as RequestStatusType,
    error: null as string | null,
    isInitialized: false,
  },
  reducers: (creators) => {
    return {
      setAppStatus: creators.reducer((state, action: PayloadAction<{ status: RequestStatusType }>) => {
        state.status = action.payload.status
      }),
      setAppError: creators.reducer((state, action: PayloadAction<{ error: string | null }>) => {
        state.error = action.payload.error
      }),
      setAppIsInitialized: creators.reducer((state, action: PayloadAction<{ isInitialized: boolean }>) => {
        state.isInitialized = action.payload.isInitialized
      }),
    }
  },
  selectors: {
    selectStatus: (state) => state.status,
    selectIsInitialized: (state) => state.isInitialized,
    selectError: (state) => state.error,
  },
})

export const appReducer = slice.reducer
export const { setAppStatus, setAppError, setAppIsInitialized } = slice.actions
export const { selectStatus, selectIsInitialized, selectError } = slice.selectors
export type AppInitialState = ReturnType<typeof slice.getInitialState>
