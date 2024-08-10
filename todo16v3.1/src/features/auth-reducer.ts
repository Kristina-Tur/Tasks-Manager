import {authAPI, RequestType} from "../api/todolists-api";
import {Dispatch} from "redux";
import {setAppStatusAC} from "../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

const initialState = {
    isLoggedIn: false,
    isInitIn: false
}

export const authReducer = (state = initialState, action: ActionsType) => {
    switch (action.type) {
        case "SET-AUTH":
            return {...state, isLoggedIn: action.isLoggedIn}
        case "SET-ME": return {...state, isinitIn: action.isinitIn}
        default: return state
    }

}

export const authTC = (request: RequestType) => {
    return (dispatch: Dispatch) => {
        authAPI.login(request)
            .then(res => {
                    if (res.data.resultCode === 0) {
                        dispatch(authAC(true))
                        dispatch(setAppStatusAC('succeeded'))
                    } else {
                        handleServerAppError(res.data, dispatch)
                    }
                }
            )
            .catch(error => {
                handleServerNetworkError(error, dispatch)
            })
    }
}
export const logoutTC = () => {
    return (dispatch: Dispatch) => {
        authAPI.logout()
            .then(res => {
                    if (res.data.resultCode === 0) {
                        dispatch(authAC(false))
                        dispatch(setAppStatusAC('succeeded'))
                    } else {
                        handleServerAppError(res.data, dispatch)
                    }
                }
            )
            .catch(error => {
                handleServerNetworkError(error, dispatch)
            })
    }
}

export const meTC = () => {
    return (dispatch: Dispatch) => {
        authAPI.me()
            .then(res => {
                    if (res.data.resultCode === 0) {
                        dispatch(authAC(true))
                        dispatch(setAppStatusAC('succeeded'))
                    } else {
                        handleServerAppError(res.data, dispatch)
                    }
                }
            )
            .catch(error => {
                handleServerNetworkError(error, dispatch)
            })
            .finally(() => meAC(true))
    }
}

export const authAC = (isLoggedIn: boolean) => {
    return {type: 'SET-AUTH', isLoggedIn} as const
}
export const meAC = (isinitIn: boolean) => {
    return {type: 'SET-ME', isinitIn} as const
}

type ActionsType = ReturnType<typeof authAC> | ReturnType<typeof meAC>