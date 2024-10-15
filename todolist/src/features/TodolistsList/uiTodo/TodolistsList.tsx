import * as React from "react"
import { useEffect } from "react"
import Grid from "@mui/material/Unstable_Grid2"
import { AddItemForm } from "common/components/addItemForm/AddItemForm"
import Paper from "@mui/material/Paper"
import { Todolist } from "features/TodolistsList/uiTodo/todolist/Todolist"
import { Navigate } from "react-router-dom"
import { styled } from "styled-components"
import { useAppDispatch, useAppSelector } from "app/store"
import { addTodolist, fetchTodolists, selectTodolists } from "features/TodolistsList/model/todolistSlice/todolistsSlice"
import { selectIsLoginIn } from "features/auth/model/authSlice"

type Props = {
  demo?: boolean
}

export const TodolistsList = ({ demo = false }: Props) => {
  const dispatch = useAppDispatch()
  const todolists = useAppSelector(selectTodolists)
  const isLoggedIn = useAppSelector(selectIsLoginIn)

  useEffect(() => {
    if (!demo || !isLoggedIn) {
      dispatch(fetchTodolists())
    }
  }, [])

  const addItem = (value: string) => {
    return dispatch(addTodolist(value))
  }

  if (!isLoggedIn) {
    return <Navigate to={"/auth"} />
  }
  return (
    <>
      <Grid container sx={{ mb: "30px" }}>
        <AddItemForm addItem={addItem} />
      </Grid>
      <Wrapper>
        {todolists.map((todolist) => {
          return (
            <Grid key={todolist.id}>
              <Paper elevation={3} sx={{ p: "0 20px 20px 20px" }}>
                <Todolist todolist={todolist} demo={demo} />
              </Paper>
            </Grid>
          )
        })}
      </Wrapper>
    </>
  )
}
const Wrapper = styled.div`
  display: flex;
  gap: 50px;
  flex-wrap: wrap;
`
