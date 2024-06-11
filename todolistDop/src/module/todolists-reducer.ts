import {v1} from 'uuid'
import {TodolistType} from "../App";

type ActionsType = {
    type: string
    payload: any
}

let todolistID1 = v1()
let todolistID2 = v1()

const initialState: TodolistType[] = [
    {id: todolistID1, title: 'What to learn', filter: 'all'},
    {id: todolistID2, title: 'What to buy', filter: 'all'},
]
export const todolistsReducer = (state: TodolistType[] = initialState, action: ActionsType): TodolistType[] => {
    switch (action.type) {
        case 'REMOVE-TODOLIST': {
            return state
        }
        case 'ADD-TODOLIST': {
            return state
        }
        default:
            return state
    }
}