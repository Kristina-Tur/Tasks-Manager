import {FilterValuesType, TaskType} from "../App";
import {v1} from "uuid";

export const filterReducer = (state: FilterValuesType, action: any): FilterValuesType => {
    switch (action.type) {
        case 'changeFilter': {
            return action.payload.filter
        }
        default:
            return state
    }
}

type changeFilterType = {
    type: 'CHANGE-FILTER'
    payload: {
        filter: FilterValuesType
    }
}

export const changeFilterAC = (filter: FilterValuesType) => {
    return {
        type: 'CHANGE-FILTER',
        payload: {
            filter
        }
    } as const
}