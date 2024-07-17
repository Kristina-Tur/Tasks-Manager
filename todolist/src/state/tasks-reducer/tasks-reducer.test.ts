import {v1} from "uuid";
import {TasksType} from "../../app/App";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./tasks-reducer";
import {addTodolistAC, removeTodolistAC} from "../todolist-reducer/todolists-reducer";
import {TaskPriorities, TaskStatuses} from "../../api/todolists-api";

let startState: TasksType

beforeEach(() => {
    startState = {
        'todolistId1': [
            {
                id: v1(),
                title: 'HTML&CSS',
                description: '',
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Middle,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId1',
                order: 0,
                addedDate: ''
            },
            {
                id: v1(),
                title: 'JS',
                description: '',
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Middle,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId1',
                order: 0,
                addedDate: ''
            },
            {
                id: v1(),
                title: 'React',
                description: '',
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId1',
                order: 0,
                addedDate: ''
            },
            {
                id: v1(),
                title: 'll',
                description: '',
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId1',
                order: 0,
                addedDate: ''
            },
            {
                id: v1(),
                title: 'ts',
                description: '',
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId1',
                order: 0,
                addedDate: ''
            },
            {
                id: v1(),
                title: 'styledComponent',
                description: '',
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId1',
                order: 0,
                addedDate: ''
            }
        ],
        'todolistId2': [
            {
                id: v1(),
                title: 'Milk',
                description: '',
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId2',
                order: 0,
                addedDate: ''
            },
            {
                id: v1(),
                title: 'Bread',
                description: '',
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId2',
                order: 0,
                addedDate: ''
            },
            {
                id: v1(),
                title: 'Tea',
                description: '',
                status: TaskStatuses.New,
                priority: TaskPriorities.Low,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId2',
                order: 0,
                addedDate: ''
            },
            {
                id: v1(),
                title: 'Coffee',
                description: '',
                status: TaskStatuses.Completed,
                priority: TaskPriorities.Middle,
                startDate: '',
                deadline: '',
                todoListId: 'todolistId1',
                order: 0,
                addedDate: ''
            }
        ]
    }
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
    expect(endState['todolistId1'][0].status).toBe(TaskStatuses.New)
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
    const action = changeTaskStatusAC('todolistId2', startState['todolistId2'][3].id, TaskStatuses.New)
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(6)
    expect(endState['todolistId2'].length).toBe(4)
    expect(endState['todolistId2'][3].status).toBe(TaskStatuses.New)
    expect(endState['todolistId1'][3].status).toBe(TaskStatuses.New)
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


