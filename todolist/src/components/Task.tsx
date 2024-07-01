// @flow
import * as React from 'react';
import {ChangeEvent, useCallback} from "react";
import ListItem from "@mui/material/ListItem";
import {getListItemSx} from "./Todolist.styles";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@mui/icons-material";
import {TasksPropsType} from "../App";

type TaskType = {
    task: TasksPropsType
    todolistId: string
    removeTask: (todolistId: string, taskId: string) => void
    changeStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
};
export const Task = ({task, removeTask, changeTaskTitle, changeStatus, todolistId}: TaskType) => {
    const onRemoveHandler = () => removeTask(todolistId, task.id)
    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) =>
        changeStatus(todolistId, task.id, event.currentTarget.checked)
    const onChangeEditableSpanHandler = useCallback((title: string) =>
        changeTaskTitle(todolistId, task.id, title), [changeTaskTitle, todolistId, task.id])
    return (
        <ListItem key={task.id} sx={getListItemSx(task.isDone)}>
            <div>
                <Checkbox onChange={onChangeHandler}
                          checked={task.isDone}/>
                <EditableSpan title={task.title} onChange={onChangeEditableSpanHandler}/>
            </div>
            <IconButton aria-label="delete" onClick={onRemoveHandler}>
                <Delete/>
            </IconButton>
        </ListItem>
    )
};