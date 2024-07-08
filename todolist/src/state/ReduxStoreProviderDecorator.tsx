import React, {Reducer} from 'react'
import {Provider} from "react-redux";
import {combineReducers, legacy_createStore} from "redux";
import {v1} from "uuid";
import {ActionType, tasksReducer} from "./tasks-reducer/tasks-reducer";
import {ActionsType, todolistsReducer} from "./todolist-reducer/todolists-reducer";
import {AppRootStateType} from "../store";
import {TasksType, TodolistsType} from "../App";

type RootStateType = {
    tasks: TasksType
    todolists: TodolistsType[]
} | undefined

const rootReducer: Reducer<RootStateType, ActionsType & ActionType>  = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all"},
        {id: "todolistId2", title: "What to buy", filter: "all"}
    ] ,
    tasks: {
        ["todolistId1"]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: false}
        ],
        ["todolistId2"]: [
            {id: v1(), title: "Milk", isDone: false},
            {id: v1(), title: "React Book", isDone: true}
        ]
    }
};

export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType);


export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}