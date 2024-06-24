import {combineReducers, createStore} from "redux";
import {todolistsReducer} from "./state/todolist-reducer/todolists-reducer";
import {tasksReducer} from "./state/tasks-reducer/tasks-reducer";

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

export const store = createStore(rootReducer)

export type AppRootStateType = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store