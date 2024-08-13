import { Dispatch } from "redux"
import { ResponseType } from "features/TodolistsList/todolistApi"
import { setAppError, setAppStatus } from "app/appSlice"

export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: Dispatch) => {
  if (data.messages.length) {
    dispatch(setAppError({ error: data.messages[0] }))
  } else {
    dispatch(setAppError({ error: "some error occurred" }))
  }
  dispatch(setAppStatus({ status: "failed" }))
}
