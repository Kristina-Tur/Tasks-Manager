// @flow
import * as React from 'react';
import {ChangeEvent} from 'react';
import ListItem from "@mui/material/ListItem";
import {getListItemSx} from "../todolist/Todolist.styles";
import {Checkbox, IconButton} from "@mui/material";
import {EditableSpan} from "../editableSpan/EditableSpan";
import {Delete} from "@mui/icons-material";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../state/tasks-reducer/tasks-reducer";
import {TaskStatuses, TaskType} from "../api/api";

type TaskComponentType = {
    task: TaskType
    todolistId: string
};
export const Task = ({task,todolistId}: TaskComponentType) => {
    const dispatch = useDispatch()

    const onRemoveHandler = () => dispatch(removeTaskAC(todolistId, task.id))

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) =>
        dispatch(changeTaskStatusAC(
            todolistId,
            task.id,
            event.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New))

    const onChangeEditableSpanHandler = (title: string) =>
        dispatch(changeTaskTitleAC(todolistId, task.id, title))

    return (
        <ListItem sx={getListItemSx(task.status === TaskStatuses.Completed)}>
            <div>
                <Checkbox onChange={onChangeHandler}
                          checked={task.status === TaskStatuses.Completed}/>
                <EditableSpan title={task.title} onChange={onChangeEditableSpanHandler}/>
            </div>
            <IconButton aria-label="delete" onClick={onRemoveHandler}>
                <Delete/>
            </IconButton>
        </ListItem>
    )
}