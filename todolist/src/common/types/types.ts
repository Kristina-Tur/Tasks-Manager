export type Action<T extends (...args: any) => any> = Omit<ReturnType<T>, "meta">

export type BaseResponse<D = {}> = {
  resultCode: number
  messages: string[]
  fieldsErrors: string[]
  data: D
}
