import {TaskType} from "../App";
import {v1} from "uuid";

export const taskReducer = (state: TaskType[], action: TaskReducerType): TaskType[] => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            return state.filter(s => s.id !== action.payload.id)
        }
        case 'ADD-TASK': {
            const newTask = {
                id: v1(),
                title: action.payload.title,
                isDone: false
            }
            return [newTask, ...state]
        }

        default:
            return state
    }
}
type TaskReducerType = RemoveTaskActionType | AddTaskActionType

type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    payload: {
        id: string
    }
}
type AddTaskActionType = {
    type: 'ADD-TASK'
    payload: {
        title: string
    }
}

export const RemoveTaskAC = (id: string) => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            id: id
        }
    } as const
}

export const addTaskAC = (title: string) => {
    return {
        type: 'ADD-TASK',
        payload: {
            title: title
        }
    } as const
}

