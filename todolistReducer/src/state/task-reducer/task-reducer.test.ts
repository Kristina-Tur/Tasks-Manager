import {v1} from "uuid";
import {TasksType} from "../../App";
import {
    addTaskAC,
    AddTaskActionType, changeTaskStatusAC, ChangeTaskStatusActionType, changeTaskTitleAC,
    ChangeTaskTitleActionType, RefreshTasksACActionType, removeTaskAC,
    RemoveTaskActionType,
    taskReducer
} from "./task-reducer";

test('correct task should be removed', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const startState: TasksType = {
        [todolistId1]: [
            {id: v1(), isDone: true, title: 'HTML&CSS'},
            {id: v1(), isDone: true, title: 'JS'},
            {id: v1(), isDone: false, title: 'React'},
            {id: v1(), isDone: false, title: 'll'},
            {id: v1(), isDone: false, title: 'ts'},
            {id: v1(), isDone: false, title: 'styledComponent'},
        ],
        [todolistId2]: [
            {id: v1(), isDone: false, title: 'Milk'},
            {id: v1(), isDone: false, title: 'Bread'},
            {id: v1(), isDone: false, title: 'Tea'},
            {id: v1(), isDone: true, title: 'Coffee'},
        ]}

    const endState = taskReducer(startState, removeTaskAC(todolistId1, startState[todolistId1][0].id))

    expect(endState[todolistId1].length).toBe(5)
    expect(endState[todolistId2].length).toBe(4)
})

test('correct task should be add', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const startState: TasksType = {
        [todolistId1]: [
            {id: v1(), isDone: true, title: 'HTML&CSS'},
            {id: v1(), isDone: true, title: 'JS'},
            {id: v1(), isDone: false, title: 'React'},
            {id: v1(), isDone: false, title: 'll'},
            {id: v1(), isDone: false, title: 'ts'},
            {id: v1(), isDone: false, title: 'styledComponent'},
        ],
        [todolistId2]: [
            {id: v1(), isDone: false, title: 'Milk'},
            {id: v1(), isDone: false, title: 'Bread'},
            {id: v1(), isDone: false, title: 'Tea'},
            {id: v1(), isDone: true, title: 'Coffee'},
        ]}

    const endState = taskReducer(startState, addTaskAC(todolistId1, 'MUI'))

    expect(endState[todolistId1].length).toBe(7)
    expect(endState[todolistId2].length).toBe(4)
    expect(endState[todolistId1][0].title).toBe('MUI')
})

test('correct task should change its name', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const startState: TasksType = {
        [todolistId1]: [
            {id: v1(), isDone: true, title: 'HTML&CSS'},
            {id: v1(), isDone: true, title: 'JS'},
            {id: v1(), isDone: false, title: 'React'},
            {id: v1(), isDone: false, title: 'll'},
            {id: v1(), isDone: false, title: 'ts'},
            {id: v1(), isDone: false, title: 'styledComponent'},
        ],
        [todolistId2]: [
            {id: v1(), isDone: false, title: 'Milk'},
            {id: v1(), isDone: false, title: 'Bread'},
            {id: v1(), isDone: false, title: 'Tea'},
            {id: v1(), isDone: true, title: 'Coffee'},
        ]}

    const endState = taskReducer(startState, changeTaskTitleAC(todolistId2, startState[todolistId2][0].id, 'MUI'))

    expect(endState[todolistId1].length).toBe(6)
    expect(endState[todolistId2].length).toBe(4)
    expect(endState[todolistId2][0].title).toBe('MUI')
})

test('correct change status of task should be changed', () => {
    const todolistId1 = v1()
    const todolistId2 = v1()

    const startState: TasksType = {
        [todolistId1]: [
            {id: v1(), isDone: true, title: 'HTML&CSS'},
            {id: v1(), isDone: true, title: 'JS'},
            {id: v1(), isDone: false, title: 'React'},
            {id: v1(), isDone: false, title: 'll'},
            {id: v1(), isDone: false, title: 'ts'},
            {id: v1(), isDone: false, title: 'styledComponent'},
        ],
        [todolistId2]: [
            {id: v1(), isDone: false, title: 'Milk'},
            {id: v1(), isDone: false, title: 'Bread'},
            {id: v1(), isDone: false, title: 'Tea'},
            {id: v1(), isDone: true, title: 'Coffee'},
        ]}

    const endState = taskReducer(startState, changeTaskStatusAC(todolistId2, startState[todolistId2][3].id, false))

    expect(endState[todolistId1].length).toBe(6)
    expect(endState[todolistId2].length).toBe(4)
    expect(endState[todolistId2][3].isDone).toBe(false)
    expect(endState[todolistId2][2].isDone).toBe(false)
})



/*export const AddNewTodolistAndTasksAC = (todolistId: string): AddNewTodolistAndTasksActionType => {
   /!* return { type: 'REFRESH-TASKS', payload: {todolistId}} as const*!/
}*/
