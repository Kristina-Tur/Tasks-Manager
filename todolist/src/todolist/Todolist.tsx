import React, {useCallback, useEffect, useMemo} from 'react';
import {v1} from 'uuid';
import '../App.css';
import {AddItemForm} from "../addItemForm/AddItemForm";
import {EditableSpan} from "../editableSpan/EditableSpan";
import {IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import List from '@mui/material/List'
import Box from '@mui/material/Box'
import {filterButtonsContainerSx} from './Todolist.styles'
import {Task} from "../task/Task";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType, ThunkDispatchType} from "../state/store";
import {addTaskAC, addTasksTC, getTasksTC} from "../state/tasks-reducer/tasks-reducer";
import {ButtonWithMemo} from "../components/buttons/Button";
import {FilterType, TaskStatuses, TaskType} from "../api/api";
import {getTodolistsTC} from "../state/todolist-reducer/todolists-reducer";

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

export const Todolist = React.memo(({
                                        title,
                                        changeTodolist,
                                        filter,
                                        todolistId,
                                        removeTodolist,
                                        changeTodolistTitle
                                    }: TodolistPropsType) => {

    console.log('Todolist is called')

    const dispatch = useDispatch<ThunkDispatchType>()
    let tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[todolistId])

    const addTask = useCallback((todolistId: string, value: string) => {
        dispatch(addTasksTC(todolistId, value))
    }, [dispatch])

    const removeTodolistHandler = () => {
        removeTodolist(todolistId)
    }

    const changeFilterTodolistHandler = useCallback((filter: FilterType) => {
        console.log('Button')
        changeTodolist(todolistId, filter)
    }, [changeTodolist, todolistId])

    const addItem = useCallback((value: string) => {
        addTask(todolistId, value)
    }, [addTask, todolistId])

    const onChangeTitleHandler = useCallback((title: string) => {
        changeTodolistTitle(todolistId, title)
    }, [changeTodolistTitle, todolistId])

    tasks = useMemo(() => {
        console.log('filterMemo')

        if (filter === 'completed') {
            tasks = tasks.filter(task => task.status === TaskStatuses.Completed)
        }
        if (filter === 'active') {
            tasks = tasks.filter(task => task.status === TaskStatuses.New)
        }
        return tasks
    }, [tasks, filter])

    useEffect(() => {
        dispatch(getTasksTC(todolistId))
    }, [])

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
                        />)}
                </List>
            )}
            <Box sx={filterButtonsContainerSx}>
                {buttons.map((button) =>
                    <ButtonWithMemo
                        key={button.id}
                        color={"primary"} className={button.filter === filter ? 'active-filter' : ''}
                        variant={button.filter === filter ? 'contained' : 'outlined'}
                        onClick={() => changeFilterTodolistHandler(button.filter)}
                        title={button.title}
                    />
                )}
            </Box>
        </div>
    );
});






