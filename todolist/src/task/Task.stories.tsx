import type {Meta, StoryObj} from '@storybook/react';
import {Task} from "./Task";
import {ReduxStoreProviderDecorator} from "../state/ReduxStoreProviderDecorator";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {v1} from "uuid";
import {addTaskAC} from "../state/tasks-reducer/tasks-reducer";
import {TaskPriorities, TaskStatuses, TaskType} from "../api/api";

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
            addedDate: ''
        },
        todolistId: 'dddas'
    },
    decorators: [ReduxStoreProviderDecorator]
};

export default meta;
type Story = StoryObj<typeof Task>;


const TaskRender = () => {
    let task = useSelector<AppRootStateType, TaskType>(state => state.tasks['todolistId1'][0])
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
        dispatch(addTaskAC('todolistId1', 'Default task'))
    }

    return <Task task={task} todolistId={'todolistId1'}/>
}
export const TaskStory: Story = {
    render: () => <TaskRender/>
};