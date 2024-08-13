import { Dispatch } from "redux"
import { setAppError, setAppStatus } from "app/appSlice"
import { BaseResponse } from "common/types/types"

export const handleServerAppError = <T>(data: BaseResponse<T>, dispatch: Dispatch) => {
  if (data.messages.length) {
    dispatch(setAppError({ error: data.messages[0] }))
  } else {
    dispatch(setAppError({ error: "some error occurred" }))
  }
  dispatch(setAppStatus({ status: "failed" }))
}
