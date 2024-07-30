// @flow
import * as React from 'react';
import Grid from "@mui/material/Unstable_Grid2";
import {AddItemForm} from "../../components/addItemForm/AddItemForm";
import Paper from "@mui/material/Paper";
import {Todolist} from "./todolist/Todolist";
import {useTodolists} from "./hooks/useTodolists";
import {FilterType, TodolistType} from "../../api/api";
import {RequestStatusType} from "../../app/app-reducer";

export type TodolistDomainType = TodolistType & {
    filter: FilterType
    entityStatus: RequestStatusType
}

export const TodolistsList = () => {
    const {
        todolists,
        addTodolist,
        changeTodolist,
        removeTodolist,
        changeTodolistTitle
    } = useTodolists()

    return (
        <>
            <Grid container sx={{mb: '30px'}}>
                <AddItemForm addItem={addTodolist}/>
            </Grid>
            <Grid container spacing={4}>
                {todolists.map(todolist => {
                    return (
                        <Grid  key={todolist.id}>
                            <Paper elevation={3} sx={{p: '0 20px 20px 20px'}}>
                                <Todolist

                                    todolistId={todolist.id}
                                    title={todolist.title}
                                    changeTodolist={changeTodolist}
                                    filter={todolist.filter}
                                    removeTodolist={removeTodolist}
                                    changeTodolistTitle={changeTodolistTitle}
                                />
                            </Paper>
                        </Grid>
                    )
                })}
            </Grid>
        </>
    );
};