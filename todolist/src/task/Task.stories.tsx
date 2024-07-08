import type { Meta, StoryObj } from '@storybook/react';
import {Task} from "./Task";
import {useState} from "react";
import {ReduxStoreProviderDecorator} from "../state/ReduxStoreProviderDecorator";
import {useDispatch, useSelector} from "react-redux";
import AppStories from "../app/App.stories";
import {AppRootStateType} from "../store";
import {TaskStateType, TasksType} from "../app/App";
import {v1} from "uuid";
import {addTaskAC} from "../state/tasks-reducer/tasks-reducer";

const meta: Meta<typeof Task> = {
    title: 'Todolist/Task',
    component: Task,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        task: {id: 'fffac', title:'JS', isDone: false},
        todolistId: 'dddas'
    },
    decorators: [ReduxStoreProviderDecorator]
};

export default meta;
type Story = StoryObj<typeof Task>;


const TaskRender = () => {
    let task = useSelector<AppRootStateType, TaskStateType>(state => state.tasks['todolistId1'][0])
    const dispatch = useDispatch()

    if(!task){
        task = {id: v1(), title: "HTML&CSS", isDone: true}
        dispatch(addTaskAC('todolistId1', 'Default task'))
    }

    return <Task task={task} todolistId={'todolistId1'}/>
}
export const TaskStory: Story = {
    render: () => <TaskRender/>
};