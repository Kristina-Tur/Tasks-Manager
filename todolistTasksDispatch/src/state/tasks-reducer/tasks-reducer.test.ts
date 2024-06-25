import {v1} from "uuid";
import {TasksType} from "../../App";
import {
    addTaskAC, changeTaskStatusAC, changeTaskTitleAC,
    removeTaskAC,
    tasksReducer
} from "./tasks-reducer";
import {addTodolistAC, removeTodolistAC} from "../todolist-reducer/todolists-reducer";

let startState: TasksType

beforeEach(() => {
    startState = {
        'todolistId1': [
            {id: v1(), isDone: true, title: 'HTML&CSS'},
            {id: v1(), isDone: true, title: 'JS'},
            {id: v1(), isDone: false, title: 'React'},
            {id: v1(), isDone: false, title: 'll'},
            {id: v1(), isDone: false, title: 'ts'},
            {id: v1(), isDone: false, title: 'styledComponent'},
        ],
        'todolistId2': [
            {id: v1(), isDone: false, title: 'Milk'},
            {id: v1(), isDone: false, title: 'Bread'},
            {id: v1(), isDone: false, title: 'Tea'},
            {id: v1(), isDone: true, title: 'Coffee'},
        ]}
})

test('correct task should be removed', () => {
    const endState = tasksReducer(startState, removeTaskAC('todolistId1', startState['todolistId1'][0].id))

    expect(endState['todolistId1'].length).toBe(5)
    expect(endState['todolistId2'].length).toBe(4)
})

test('correct task should be add', () => {
       const endState = tasksReducer(startState, addTaskAC('todolistId1', 'MUI'))

    expect(endState['todolistId1'].length).toBe(7)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId1'][0].title).toBe('MUI')
    expect(endState['todolistId1'][0].isDone).toBe(false)
    expect(endState['todolistId1'][0].id).toBeDefined()
})

test('correct task should change its name', () => {
       const action = changeTaskTitleAC('todolistId2', startState['todolistId2'][0].id, 'Apple')

    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(6)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][0].title).toBe('Apple')
    expect(endState['todolistId1'][0].title).toBe('HTML&CSS')
})

test('correct change status of task should be changed', () => {
        const action =  changeTaskStatusAC('todolistId2', startState['todolistId2'][3].id, false)
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(6)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][3].isDone).toBe(false)
    expect(endState['todolistId1'][3].isDone).toBe(false)
})

test('new array should be added when new todolist is added', () => {
    const action = addTodolistAC('new todolist')

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)
    const newKey = keys.find(k => k != 'todolistId1' && k != 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})

test('property with todolistId should be deleted', () => {
    const action = removeTodolistAC('todolistId2')

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})


