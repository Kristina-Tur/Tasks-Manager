import {TasksType, TodolistsType} from "../App";
import {addTodolistAC, todolistsReducer} from "./todolist-reducer/todolists-reducer";
import {taskReducer} from "./task-reducer/task-reducer";

test('ids should be equals', () => {
    const startTasksState: TasksType = {}
    const startTodolistsState: Array<TodolistsType> = []

    const action = addTodolistAC('new todolist')

    const endTasksState = taskReducer(startTasksState, action)
    const endTodolistsState = todolistsReducer(startTodolistsState, action)

    const keys = Object.keys(endTasksState)
    const idFromTasks = keys[0]
    const idFromTodolists = endTodolistsState[0].id

    expect(idFromTasks).toBe(action.payload.todolistId)
    expect(idFromTodolists).toBe(action.payload.todolistId)
})
