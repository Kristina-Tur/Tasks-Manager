import { setAppIsInitialized, setAppStatus } from "app/appSlice"
import { handleServerAppError } from "common/utils/handleServerAppError"
import { clearTodolists } from "features/TodolistsList/model/todolistSlice/todolistsSlice"
import { asyncThunkCreator, buildCreateSlice, isFulfilled, PayloadAction } from "@reduxjs/toolkit"
import { LoginParamsType } from "features/auth/api/authApi.types"
import { authAPI } from "features/auth/api/authApi"
import { handleServerNetworkError } from "common/utils/handleServerNetworkError"
import { clearTasks } from "features/TodolistsList/model/tasksSlice/tasksSlice"
import { AppDispatchType } from "app/store"
import { RESULT_CODE } from "common/enums"
import { BaseResponse } from "common/types/types"

const createAppSlice = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
})

const slice = createAppSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
  },
  reducers: (creators) => {
    return {
      setIsLoginIn: creators.reducer((state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
        state.isLoggedIn = action.payload.isLoggedIn
      }),
      login: creators.asyncThunk<
        { isLoggedIn: boolean },
        { values: LoginParamsType },
        { rejectValue: BaseResponse | null }
      >(
        async ({ values }, thunkAPI) => {
          const { dispatch, rejectWithValue } = thunkAPI
          const appDispatch = dispatch as AppDispatchType
          try {
            dispatch(setAppStatus({ status: "loading" }))
            const res = await authAPI.login(values)
            if (res.data.resultCode === RESULT_CODE.SUCCESS) {
              return { isLoggedIn: true }
            } else {
              const isShowAppError = !res.data.fieldsErrors.length
              handleServerAppError(res.data, dispatch, isShowAppError)
              return rejectWithValue(res.data)
            }
          } catch (error) {
            handleServerNetworkError(error, appDispatch)
            return rejectWithValue(null)
          } finally {
            dispatch(setAppStatus({ status: "idle" }))
          }
        },
        {
          fulfilled: (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn
          },
        },
      ),
      logout: creators.asyncThunk<{ isLoggedIn: boolean }, undefined, { rejectValue: null }>(
        async (_, thunkAPI) => {
          const { dispatch, rejectWithValue } = thunkAPI
          const appDispatch = dispatch as AppDispatchType
          try {
            dispatch(setAppStatus({ status: "loading" }))
            const res = await authAPI.logout()
            if (res.data.resultCode === 0) {
              /*dispatch(clearData())*/
              dispatch(clearTodolists())
              dispatch(clearTasks())
              dispatch(setAppStatus({ status: "succeeded" }))
              return { isLoggedIn: false }
            } else {
              handleServerAppError(res.data, dispatch)
              return rejectWithValue(null)
            }
          } catch (error) {
            handleServerNetworkError(error, appDispatch)
            return rejectWithValue(null)
          } finally {
            dispatch(setAppStatus({ status: "idle" }))
          }
        },
        {
          fulfilled: (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn
          },
        },
      ),
      initializedApp: creators.asyncThunk<{ isLoggedIn: boolean }, undefined, { rejectValue: null }>(
        async (_, thunkAPI) => {
          const { dispatch, rejectWithValue } = thunkAPI
          const appDispatch = dispatch as AppDispatchType
          try {
            dispatch(setAppStatus({ status: "loading" }))
            const res = await authAPI.me()
            if (res.data.resultCode === RESULT_CODE.SUCCESS) {
              dispatch(setAppStatus({ status: "succeeded" }))
              return { isLoggedIn: true }
            } else {
              handleServerAppError(res.data, dispatch, false)
              return rejectWithValue(null)
            }
          } catch (error) {
            handleServerNetworkError(error, appDispatch)
            return rejectWithValue(null)
          } finally {
            dispatch(setAppIsInitialized({ isInitialized: true }))
          }
        },
        {
          fulfilled: (state, action) => {
            state.isLoggedIn = action.payload.isLoggedIn
          },
        },
      ),
    }
  },
  /*extraReducers: (builder) => {
    builder.addMatcher(
      isFulfilled(login, logout, initializedApp),
      (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
        state.isLoggedIn = action.payload.isLoggedIn
      },
    )
  },*/
  selectors: {
    selectIsLoginIn: (state) => state.isLoggedIn,
  },
})

/*export type AuthActionsType = ReturnType<typeof setIsLoginInAC>*/
export const authReducer = slice.reducer
export const { setIsLoginIn, login, initializedApp, logout } = slice.actions
export const { selectIsLoginIn } = slice.selectors
