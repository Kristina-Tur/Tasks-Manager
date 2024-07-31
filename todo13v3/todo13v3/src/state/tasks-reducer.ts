import {v1} from 'uuid';
import {AddTodolistActionType, RemoveTodolistActionType, setTodolistActionType} from './todolists-reducer';
import {TasksStateType} from '../App';
import {TaskPriorities, TaskStatuses, TaskType, todolistApi, TodolistType, UpdateTaskModelType} from "../api/api";
import {Dispatch} from "redux";
import {AppRootStateType} from "./store";

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    todolistId: string
    taskId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK',
    task: TaskType
}

export type ChangeTaskActionType = {
    type: 'UPDATE-TASK',
    todolistId: string
    taskId: string
   model: UpdateDomainTaskModelType
}

/*export type ChangeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE',
    todolistId: string
    taskId: string
    title: string
}*/
export type SetTaskActionType = {
    type: 'SET-TASKS',
    tasks: Array<TaskType>
    todolistId: string
}

type ActionsType = RemoveTaskActionType | AddTaskActionType
    | ChangeTaskActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
| SetTaskActionType
| setTodolistActionType

const initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state}
            const tasks = stateCopy[action.todolistId];
            const newTasks = tasks.filter(t => t.id != action.taskId);
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }
        case 'ADD-TASK': {
            const stateCopy = {...state}
            const newTask: TaskType = {
                id: action.task.id,
                title: action.task.title,
                status: TaskStatuses.New,
                description: '',
                startDate: '',
                priority: TaskPriorities.Low,
                deadline: '',
                addedDate: '',
                order: 0,
                todoListId: action.task.todoListId
            }
            const tasks = stateCopy[action.task.todoListId];
            const newTasks = [newTask, ...tasks];
            stateCopy[action.task.todoListId] = newTasks;
            return stateCopy;
        }
        case 'UPDATE-TASK': {
            return {
                ...state,
                [action.todolistId]: state[action.todolistId].map(task => task.id === action.taskId
                    ? {...task, ...action.model} : task)
            }
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todolist.id]: []
            }
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }
        case "SET-TODOLISTS": {
            const copy = {...state}
            action.todolists.forEach(tl => {
                copy[tl.id] = []
            })
            return copy
        }
        case "SET-TASKS":
            return {...state, [action.todolistId]: action.tasks}
        default:
            return state;
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}
export const addTaskAC = (task: TaskType): AddTaskActionType => {
    return {type: 'ADD-TASK', task}
}
export const updateTaskAC = (taskId: string, todolistId: string, model: UpdateDomainTaskModelType): ChangeTaskActionType => {
    return {type: 'UPDATE-TASK', taskId, todolistId, model}
}
/*export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleActionType => {
    return {type: 'CHANGE-TASK-TITLE', title, todolistId, taskId}
}*/

export const setTasksAC = (todolistId: string, tasks: TaskType[]) : SetTaskActionType=> {
    return { type: 'SET-TASKS',  todolistId, tasks  }
}

export const setTasksTC = (todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistApi.getTasks(todolistId).then((res) => {
            dispatch(setTasksAC(todolistId, res.data.items))
        })
    }
}

export const addTaskTC = (title: string, todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistApi.createTask(todolistId, title).then((res) => {
            dispatch(addTaskAC(res.data.data.item))
        })
    }
}
export const removeTaskTC = (taskId: string, todolistId: string) => {
    return (dispatch: Dispatch) => {
        todolistApi.deleteTask(todolistId, taskId).then((res) => {
            dispatch(removeTaskAC(taskId, todolistId))
        })
    }
}
export const updateTaskTC = (taskId: string, todolistId: string, model: UpdateDomainTaskModelType) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {
        const task = getState().tasks[todolistId].find(t => t.id === taskId)

        if(task){
            const apiModel: UpdateTaskModelType = {
                status: task.status,
                deadline: task.deadline,
                description: task.description,
                title: task.title,
                priority: task.priority,
                startDate: task.startDate,
                ...model
            }
            todolistApi.updateTask(todolistId, taskId, apiModel).then((res) => {
                dispatch(updateTaskAC(taskId, todolistId, model))
            })
        }
    }
}

type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    completed?: boolean
    status?: TaskStatuses
    priority?: TaskPriorities
    startDate?: string
    deadline?: string
}