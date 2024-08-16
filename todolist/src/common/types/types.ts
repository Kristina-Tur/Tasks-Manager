export type Action<T extends (...args: any) => any> = Omit<ReturnType<T>, "meta">

type FieldsErrors = {
  error: string
  field: string
}

export type BaseResponse<D = {}> = {
  resultCode: number
  messages: string[]
  fieldsErrors: FieldsErrors[]
  data: D
}
