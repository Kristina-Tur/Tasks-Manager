import { Dispatch } from "redux"
import { ResponseType } from "api/API"
import { setAppError, setAppStatus } from "app/appSlice"

export const handleServerAppError = <T>(data: ResponseType<T>, dispatch: Dispatch) => {
  if (data.messages.length) {
    dispatch(setAppError({ error: data.messages[0] }))
  } else {
    dispatch(setAppError({ error: "some error occurred" }))
  }
  dispatch(setAppStatus({ status: "failed" }))
}
export const handleServerNetworkError = (error: { message: string }, dispatch: Dispatch) => {
  dispatch(setAppError({ error: error.message ? error.message : "Some error" }))
  dispatch(setAppStatus({ status: "failed" }))
}
