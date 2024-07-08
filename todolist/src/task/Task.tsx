// @flow
import * as React from 'react';
import {ChangeEvent, memo, useCallback} from "react";
import ListItem from "@mui/material/ListItem";
import {getListItemSx} from "../todolist/Todolist.styles";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "../editableSpan/EditableSpan";
import {Delete} from "@mui/icons-material";
import {TaskStateType} from "../app/App";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../state/tasks-reducer/tasks-reducer";

type TaskType = {
    task: TaskStateType
    todolistId: string
};
export const Task = ({task,todolistId}: TaskType) => {
    const dispatch = useDispatch()

    const onRemoveHandler = () => dispatch(removeTaskAC(todolistId, task.id))

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) =>
        dispatch(changeTaskStatusAC(todolistId, task.id, event.currentTarget.checked))

    const onChangeEditableSpanHandler = (title: string) =>
        dispatch(changeTaskTitleAC(todolistId, task.id, title))

    return (
        <ListItem sx={getListItemSx(task.isDone)}>
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
}