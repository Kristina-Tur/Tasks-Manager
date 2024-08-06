import {authAPI, RequestType} from "../api/todolists-api";
import {Dispatch} from "redux";
import {setAppStatusAC} from "../app/app-reducer";
import {handleServerAppError, handleServerNetworkError} from "../utils/error-utils";

const initialState = {
    isLoggedIn: false
}

export const authReducer = (state = initialState, action: ActionsType) => {
    switch (action.type) {
        case "SET-AUTH":
            return {...state, isLoggedIn: action.isLoggedIn}
        default: return state
    }

}

export const authTC = (request: RequestType) => {
    return (dispatch: Dispatch) => {
        authAPI.auth(request)
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

export const authAC = (isLoggedIn: boolean) => {
    return {type: 'SET-AUTH', isLoggedIn}
}

type ActionsType = ReturnType<typeof authAC>