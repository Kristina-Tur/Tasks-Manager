import React, {ChangeEvent} from 'react';
import {Button} from './buttons/Button';
import {FilterType, TasksPropsType} from '../../App';
import {v1} from 'uuid';
import './../../App.css';
import {AddItemForm} from "../AddItemForm";
import {EditableSpan} from "./EditableSpan";

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

export const Todolist = ({
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
        addTask(todolistId, value)
    }

    const onChangeTitleHandler = (title: string) => {
        changeTodolistTitle(todolistId, title)
    }

    return (
        <div>
            <div className={'todolist-title-container'}>
                <h3><EditableSpan title={title} onChange={onChangeTitleHandler}/></h3>
                <Button title={'X'} onClick={removeTodolistHandler}/>
            </div>
            <AddItemForm todolistId={todolistId} addItem={addItem}/>
            {tasks.length === 0 ? (
                <p>No tasks</p>
            ) : (
                <ul>
                    {tasks.map((task) => {
                        const onRemoveHandler = () => removeTask(todolistId, task.id)
                        const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) =>
                            changeStatus(todolistId, task.id, event.currentTarget.checked)
                        const onChangeEditableSpanHandler = (title: string) =>
                            changeTaskTitle(todolistId, task.id, title)
                        return (
                            <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                                <input type="checkbox"
                                       onChange={onChangeHandler}
                                       checked={task.isDone}/>
                                <EditableSpan title={task.title} onChange={onChangeEditableSpanHandler}/>
                                <Button onClick={onRemoveHandler} title={'x'}/>
                            </li>
                        )
                    })
                    }
                </ul>
            )}
            <div>
                {buttons.map((button) =>
                    <Button className={button.filter === filter ? 'active-filter' : ''} key={button.id}
                            title={button.title} onClick={() => changeFilterTodolistHandler(button.filter)}
                    />
                )}
            </div>
        </div>
    );
};





