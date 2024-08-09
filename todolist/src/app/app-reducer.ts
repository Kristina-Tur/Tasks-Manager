import {authAPI, LoginParamsType} from "../api/API";
import {Dispatch} from "redux";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";
import {setIsLoginInAC} from "../features/login/auth-reducer";

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'loading' as RequestStatusType,
    error: null,
    isInitialized: false
}

export type InitialStateType = {
    status: RequestStatusType
    error: null | string
    isInitialized: boolean
}

export const appReducer = (
    state: InitialStateType = initialState,
    action: ActionsType
): InitialStateType => {
    switch (action.type) {
        case 'APP/SET-STATUS':
            return { ...state, status: action.status }
        case "APP/SET-ERROR":
            return {...state, error: action.error}
        case "APP/IS-INITIALIZED":
            return {...state, isInitialized: action.isInitialized}
        default:
            return state
    }
}

export const setAppStatusAC = (status: RequestStatusType) => {
    return {type: 'APP/SET-STATUS', status} as const
}

export const setAppErrorAC = (error: string | null) => {
    return {type: 'APP/SET-ERROR', error} as const
}
export const setAppIsInitializedAC = (isInitialized: boolean) => {
    return {type: 'APP/IS-INITIALIZED', isInitialized} as const
}

export const initializedAppTC = () => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        authAPI.me()
            .then(res => {
                    if (res.data.resultCode === 0) {
                        dispatch(setIsLoginInAC(true))
                        dispatch(setAppStatusAC('succeeded'))
                    } else {
                        handleServerAppError(res.data, dispatch)
                    }
                dispatch(setAppIsInitializedAC(true))
                }
            )
            .catch(error => {
                handleServerNetworkError(error, dispatch)
            })
    }
}

type ActionsType =
    | SetAppStatusActionType
    | SetAppErrorActionType
    | setAppIsInitializedActionType

export type SetAppStatusActionType = ReturnType<typeof setAppStatusAC>
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type setAppIsInitializedActionType = ReturnType<typeof setAppIsInitializedAC>