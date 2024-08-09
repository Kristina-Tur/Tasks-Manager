import React, {useCallback, useEffect, useMemo} from 'react';
import {v1} from 'uuid';
import '../../../app/App.css';
import {AddItemForm} from "../../../components/addItemForm/AddItemForm";
import {EditableSpan} from "../../../components/editableSpan/EditableSpan";
import {IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import List from '@mui/material/List'
import Box from '@mui/material/Box'
import {filterButtonsContainerSx} from './Todolist.styles'
import {Task} from "../task/Task";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType, AppDispatchType, useAppDispatch, useAppSelector} from "../../../app/store";
import {addTasksTC, getTasksTC} from "../tasks-reducer/tasks-reducer";
import {ButtonWithMemo} from "../../../components/buttons/Button";
import {FilterType, TaskDomainType, TaskStatuses, TaskType, TodolistDomainType, TodolistType} from "../../../api/API";

type TodolistPropsType = {
    todolist: TodolistDomainType
    changeTodolist: (todolistId: string, filter: FilterType) => void
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
    demo?: boolean
}

const buttons: Array<{ id: string, title: string, filter: FilterType }> = [
    {id: v1(), title: 'All', filter: 'all'},
    {id: v1(), title: 'Active', filter: 'active'},
    {id: v1(), title: 'Completed', filter: 'completed'},
]

export const Todolist = React.memo(({
                                        todolist,
                                        changeTodolist,
                                        removeTodolist,
                                        changeTodolistTitle,
                                        demo = false
                                    }: TodolistPropsType) => {

    console.log('Todolist is called')

    const dispatch = useAppDispatch()

    let tasks = useAppSelector<TaskType[]>(state => state.tasks[todolist.id])

    useEffect(() => {
        if(!demo){
            dispatch(getTasksTC(todolist.id))
        }
    }, [])

    const addTask = useCallback((todolistId: string, value: string) => {
        dispatch(addTasksTC(todolistId, value))
    }, [dispatch])

    const removeTodolistHandler = () => {
        removeTodolist(todolist.id)
    }

    const changeFilterTodolistHandler = useCallback((filter: FilterType) => {
        console.log('Button')
        changeTodolist(todolist.id, filter)
    }, [changeTodolist, todolist.id])

    const addItem = useCallback((value: string) => {
        addTask(todolist.id, value)
    }, [addTask, todolist.id])

    const onChangeTitleHandler = useCallback((title: string) => {
        changeTodolistTitle(todolist.id, title)
    }, [changeTodolistTitle, todolist.id])

    tasks = useMemo(() => {
        console.log('filterMemo')

        if (todolist.filter === 'completed') {
            tasks = tasks.filter(task => task.status === TaskStatuses.Completed)
        }
        if (todolist.filter === 'active') {
            tasks = tasks.filter(task => task.status === TaskStatuses.New)
        }
        return tasks
    }, [tasks, todolist.filter])


    return (
        <div>
            <div className={'todolist-title-container'}>
                <h3><EditableSpan title={todolist.title} onChange={onChangeTitleHandler} disabled={todolist.entityStatus === 'loading'}/></h3>
                <IconButton aria-label="delete" onClick={removeTodolistHandler} disabled={todolist.entityStatus === 'loading'}>
                    <Delete/>
                </IconButton>
            </div>
            <AddItemForm addItem={addItem}  disabled={todolist.entityStatus === 'loading'}/>
            {tasks.length === 0 ? (
                <p>No tasks</p>
            ) : (
                <List>
                    {tasks.map(task =>
                        <Task
                            key={task.id}
                            task={task}
                            todolist={todolist}
                        />)}
                </List>
            )}
            <Box sx={filterButtonsContainerSx}>
                {buttons.map((button) =>
                    <ButtonWithMemo
                        key={button.id}
                        color={"primary"} className={button.filter === todolist.filter ? 'active-filter' : ''}
                        variant={button.filter === todolist.filter ? 'contained' : 'outlined'}
                        onClick={() => changeFilterTodolistHandler(button.filter)}
                        title={button.title}
                    />
                )}
            </Box>
        </div>
    );
});






