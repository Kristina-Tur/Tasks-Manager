import { instance } from "common/instance/instance"
import { BaseResponse } from "common/types/types"
import { TodolistType } from "features/TodolistsList/ui/todolistApi.types"

export const todolistAPI = {
  getTodolists() {
    return instance.get<TodolistType[]>("todo-lists")
  },
  addTodolist(title: string) {
    return instance.post<BaseResponse<{ item: TodolistType }>>("todo-lists", { title })
  },
  removeTodolist(todolistId: string) {
    return instance.delete<BaseResponse>(`todo-lists/${todolistId}`)
  },
  updateTodolistTitle(todolistId: string, title: string) {
    return instance.put<BaseResponse>(`todo-lists/${todolistId}`, { title })
  },
}
