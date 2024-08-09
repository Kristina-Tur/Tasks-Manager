// @flow
import * as React from 'react';
import {ChangeEvent} from 'react';
import ListItem from "@mui/material/ListItem";
import {getListItemSx} from "../todolist/Todolist.styles";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "../../../components/editableSpan/EditableSpan";
import {Delete} from "@mui/icons-material";
import {useDispatch} from "react-redux";
import {
    removeTaskTC, updateTaskTC
} from "../tasks-reducer/tasks-reducer";
import {TaskDomainType, TaskStatuses, TaskType, TodolistDomainType} from "../../../api/API";
import {AppDispatchType, useAppDispatch} from "../../../app/store";

type TaskComponentType = {
    task: TaskType
    todolist: TodolistDomainType
};
export const Task = ({task,todolist}: TaskComponentType) => {
    const dispatch = useAppDispatch()

    const onRemoveHandler = () => dispatch(removeTaskTC(todolist.id, task.id))

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const status = event.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
        return  dispatch(updateTaskTC(todolist.id, task.id, {status}))
    }

    const onChangeEditableSpanHandler = (title: string) =>
        dispatch(updateTaskTC(todolist.id, task.id, {title}))

    return (
        <ListItem sx={getListItemSx(task.status === TaskStatuses.Completed)}>
            <div>
                <Checkbox onChange={onChangeHandler}
                          checked={task.status === TaskStatuses.Completed}/>
                <EditableSpan title={task.title} onChange={onChangeEditableSpanHandler} disabled={todolist.entityStatus === 'loading'}/>
            </div>
            <IconButton aria-label="delete" onClick={onRemoveHandler}>
                <Delete/>
            </IconButton>
        </ListItem>
    )
}