// @flow
import * as React from 'react';
import Grid from "@mui/material/Unstable_Grid2";
import {AddItemForm} from "../../components/addItemForm/AddItemForm";
import Paper from "@mui/material/Paper";
import {Todolist} from "./todolist/Todolist";
import {useTodolists} from "./hooks/useTodolists";


type TodolistsListPropsType = {
    demo?: boolean
}

export const TodolistsList = ({demo = false}: TodolistsListPropsType) => {
    const {
        todolists,
        addTodolist,
        changeTodolist,
        removeTodolist,
        changeTodolistTitle
    } = useTodolists(demo)

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
                                    todolist={todolist}
                                    changeTodolist={changeTodolist}
                                    removeTodolist={removeTodolist}
                                    changeTodolistTitle={changeTodolistTitle}
                                    demo={demo}
                                />
                            </Paper>
                        </Grid>
                    )
                })}
            </Grid>
        </>
    );
};