import React, {ChangeEvent} from 'react';
import {FilterType, TasksPropsType, TasksType} from '../../App';
import {v1} from 'uuid';
import './../../App.css';
import {AddItemForm} from "../AddItemForm";
import {EditableSpan} from "../EditableSpan";
import {Checkbox, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Box from '@mui/material/Box'
import {filterButtonsContainerSx, getListItemSx} from '../Todolist.styles'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../store";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../../state/tasks-reducer/tasks-reducer";

type TodolistPropsType = {
    todolistId: string
    title: string
    changeTodolist: (todolistId: string, filter: FilterType) => void

    /*tasks: Array<TasksPropsType>
    removeTask: (todolistId: string, id: string) => void
    addTask: (todolistId: string, value: string) => void
    changeStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void*/

    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
    filter: FilterType
}

const buttons: Array<{ id: string, title: string, filter: FilterType }> = [
    {id: v1(), title: 'All', filter: 'all'},
    {id: v1(), title: 'Active', filter: 'active'},
    {id: v1(), title: 'Completed', filter: 'completed'},
]

export const Todolist = ({
                             title,
                             changeTodolist,
                             filter,
                             todolistId,
                             removeTodolist,
                             changeTodolistTitle
                         }: TodolistPropsType) => {
    const dispatch = useDispatch()
    let tasks = useSelector<AppRootStateType, TasksPropsType[]>(state => state.tasks[todolistId])

    if (filter === 'completed') {
        tasks = tasks.filter(task => task.isDone)
    }
    if (filter === 'active') {
        tasks = tasks.filter(task => !task.isDone)
    }

    const removeTodolistHandler = () => {
        removeTodolist(todolistId)
    }

    const changeFilterTodolistHandler = (filter: FilterType) => {
        changeTodolist(todolistId, filter)
    }

    const addItem = (value: string) => {
        dispatch(addTaskAC(todolistId, value))
    }

    const onChangeTitleHandler = (title: string) => {
        changeTodolistTitle(todolistId, title)
    }
    return (
        <div>
            <div className={'todolist-title-container'}>
                <h3><EditableSpan title={title} onChange={onChangeTitleHandler}/></h3>
                <IconButton aria-label="delete" onClick={removeTodolistHandler}>
                    <Delete/>
                </IconButton>
            </div>
            <AddItemForm todolistId={todolistId} addItem={addItem}/>
            {tasks.length === 0 ? (
                <p>No tasks</p>
            ) : (
                <List>
                    {tasks.map((task) => {
                        const onRemoveHandler = () => dispatch(removeTaskAC(todolistId, task.id))
                        const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) =>
                            dispatch(changeTaskStatusAC(todolistId, task.id, event.currentTarget.checked))
                        const onChangeEditableSpanHandler = (title: string) =>
                            dispatch(changeTaskTitleAC(todolistId, task.id, title))
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
                    })
                    }
                </List>
            )}
            <Box sx={filterButtonsContainerSx}>
                {buttons.map((button) =>
                    <Button color={"primary"} className={button.filter === filter ? 'active-filter' : ''}
                            variant={button.filter === filter ? 'contained' : 'outlined'}
                            key={button.id}
                            onClick={() => changeFilterTodolistHandler(button.filter)}
                    >{button.title}</Button>
                )}
            </Box>
        </div>
    );
};





