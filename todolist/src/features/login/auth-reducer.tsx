import {Dispatch} from "redux";
import {setAppStatusAC} from "../../app/app-reducer";
import {authAPI, LoginParamsType} from "../../api/API";
import {handleServerAppError, handleServerNetworkError} from "../../utils/error-utils";

type LoginType = {
    isLoggedIn: boolean
}
const initialState = {
    isLoggedIn: false
}

export const authReducer = (state: LoginType = initialState, action: ActionsType): LoginType => {
    switch (action.type) {
        case "login/SET-IS-LOGGED-IN":
            return {...state, isLoggedIn: action.value}
        default:
            return state
    }
}

//AC
export const setIsLoginInAC = (value: boolean) => {
    return {type: 'login/SET-IS-LOGGED-IN', value}
}

//TC
export const loginTC = (value: LoginParamsType) => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        authAPI.login(value)
            .then(res => {
                    if (res.data.resultCode === 0) {
                        dispatch(setIsLoginInAC(true))
                    } else {
                        handleServerAppError(res.data, dispatch)
                    }
                    dispatch(setAppStatusAC('idle'))
                }
            )
            .catch(error => {
                handleServerNetworkError(error, dispatch)
            })
    }
}
export const logoutTC = () => {
    return (dispatch: Dispatch) => {
        dispatch(setAppStatusAC('loading'))
        authAPI.logout()
            .then(res => {
                    if (res.data.resultCode === 0) {
                        dispatch(setIsLoginInAC(false))
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

//type
type ActionsType = ReturnType<typeof setIsLoginInAC>