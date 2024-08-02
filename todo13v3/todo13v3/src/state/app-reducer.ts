export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type appType = {
    loading: RequestStatusType,
    error: null | string
}

const initialState = {
    loading: 'loading' as RequestStatusType,
    error: null
}

export const appReducer = (state: appType = initialState, action: ActionsType) => {
    switch (action.type) {
        case "APP/SET-STATUS": return {...state, loading: action.loading}
        case "APP/SET-ERROR": return {...state, error: action.error}
        default:
            return state
    }
}

export const setAppLoadingAC = (loading: RequestStatusType) => {
    return {type: 'APP/SET-STATUS', loading} as const
}
export const setAppErrorAC = (error: null | string) => {
    return {type: 'APP/SET-ERROR', error} as const
}

type ActionsType = setAppLoadingActionType | setAppErrorActionType

type setAppLoadingActionType = ReturnType<typeof setAppLoadingAC>
type setAppErrorActionType = ReturnType<typeof setAppErrorAC>