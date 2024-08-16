import { Dispatch } from "redux"
import { setAppError, setAppStatus } from "app/appSlice"
import { BaseResponse } from "common/types/types"

/**
 * Обрабатывает ошибки серверного приложения, отправляя соответствующие действия для обновления состояния приложения.
 *
 * @template T Тип данных, содержащихся в ответе.
 * @param {BaseResponse<T>} data Ответ от сервера, который включает сообщения об ошибках.
 * @param {Dispatch} dispatch Функция Redux dispatch, используемая для отправки действий.
 * @param {boolean} [isShowGlobalError=true] Флаг, указывающий, следует ли показывать глобальное сообщение об ошибке.
 * @returns фунция ничего не возвращает
 */

export const handleServerAppError = <T>(
  data: BaseResponse<T>,
  dispatch: Dispatch,
  isShowGlobalError: boolean = true,
) => {
  if (isShowGlobalError) {
    if (data.messages.length) {
      dispatch(setAppError({ error: data.messages[0] }))
    } else {
      dispatch(setAppError({ error: "some error occurred" }))
    }
  }
  dispatch(setAppStatus({ status: "failed" }))
}
