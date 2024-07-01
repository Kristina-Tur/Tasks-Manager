import React, {ChangeEvent, useCallback} from 'react';
import {FilterType, TasksPropsType} from '../../App';
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
import {Task} from "../Task";

type TodolistPropsType = {
    todolistId: string
    title: string
    tasks: Array<TasksPropsType>
    removeTask: (todolistId: string, id: string) => void
    changeTodolist: (todolistId: string, filter: FilterType) => void
    addTask: (todolistId: string, value: string) => void
    changeStatus: (todolistId: string, taskId: string, isDone: boolean) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
    filter: FilterType
}

const buttons: Array<{ id: string, title: string, filter: FilterType }> = [
    {id: v1(), title: 'All', filter: 'all'},
    {id: v1(), title: 'Active', filter: 'active'},
    {id: v1(), title: 'Completed', filter: 'completed'},
]

export const Todolist = React.memo(({
                                        title,
                                        tasks,
                                        removeTask,
                                        changeTodolist,
                                        addTask,
                                        changeStatus,
                                        filter,
                                        todolistId,
                                        removeTodolist,
                                        changeTaskTitle,
                                        changeTodolistTitle
                                    }: TodolistPropsType) => {

    console.log('Todolist is called')

    if (filter === 'completed') {
        tasks = tasks.filter(task => task.isDone)
    }
    if (filter === 'active') {
        tasks = tasks.filter(task => !task.isDone)
    }

    const removeTodolistHandler = () => {
        removeTodolist(todolistId)
    }

    const changeFilterTodolistHandler = useCallback((filter: FilterType) => {
        console.log('Button')
        changeTodolist(todolistId, filter)
    }, [])

    const addItem = useCallback((value: string) => {
        addTask(todolistId, value)
    }, [addTask, todolistId])

    const onChangeTitleHandler = useCallback((title: string) => {
        changeTodolistTitle(todolistId, title)
    }, [changeTodolistTitle, todolistId])

    return (
        <div>
            <div className={'todolist-title-container'}>
                <h3><EditableSpan title={title} onChange={onChangeTitleHandler}/></h3>
                <IconButton aria-label="delete" onClick={removeTodolistHandler}>
                    <Delete/>
                </IconButton>
            </div>
            <AddItemForm addItem={addItem}/>
            {tasks.length === 0 ? (
                <p>No tasks</p>
            ) : (
                <List>
                    {tasks.map(task =>
                        <Task
                        key={task.id}
                        task={task}
                        todolistId={todolistId}
                        removeTask={removeTask}
                        changeStatus={changeStatus}
                        changeTaskTitle={changeTaskTitle}
                    />)}
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
            });





