import type {Meta, StoryObj} from '@storybook/react';
import {Task} from "./Task";
import {ReduxStoreProviderDecorator} from "../../../stories/decorators/ReduxStoreProviderDecorator";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../app/store";
import {v1} from "uuid";
import {addTaskAC} from "../tasks-reducer/tasks-reducer";
import {
    FilterType,
    TaskDomainType,
    TaskPriorities,
    TaskStatuses,
    TaskType,
    TodolistDomainType,
    TodolistType
} from "../../../api/API";
import {RequestStatusType} from '../../../app/app-reducer'

const meta: Meta<typeof Task> = {
    title: 'Todolist/Task',
    component: Task,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        task: {
            id: 'fffac',
            title:'JS',
            status: TaskStatuses.New,
            description: '',
            priority: TaskPriorities.Low,
            startDate: '',
            deadline: '',
            todoListId: 'dddas',
            order: 0,
            addedDate: '',
        },
        todolist:{
            filter: 'all',
            entityStatus: 'idle',
            id: 'todolistId1',
            title: '',
            addedDate: '',
            order: 0
        }
    },
    decorators: [ReduxStoreProviderDecorator]
};

export default meta;
type Story = StoryObj<typeof Task>;


const TaskRender = () => {
    let task = useSelector<AppRootStateType, TaskType>(state => state.tasks['todolistId1'][0])
    let todolist = useSelector<AppRootStateType, TodolistDomainType>(state => state.todolists[0])
    const dispatch = useDispatch()

    if(!task){
        task = {
           id: v1(),
            title: "HTML&CSS",
            status: TaskStatuses.Completed,
            description: '',
            priority: TaskPriorities.Low,
            startDate: '',
            deadline: '',
            todoListId: 'todolistId1',
            order: 0,
            addedDate: ''
        }
        dispatch(addTaskAC(task))
    }

    return <Task task={task} todolist={todolist}/>
}
export const TaskStory: Story = {
    render: () => <TaskRender/>
};