import { instance } from "common/instance/instance"
import { BaseResponse } from "common/types/types"
import { GetTaskType, TaskType, UpdateTaskModelType } from "features/TodolistsList/ui/taskApi.types"

//ui
export const taskAPI = {
  getTasks(todolistId: string) {
    return instance.get<GetTaskType>(`todo-lists/${todolistId}/tasks`)
  },
  createTask(todolistId: string, title: string) {
    return instance.post<BaseResponse<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, { title })
  },

  removeTask(todolistId: string, taskId: string) {
    return instance.delete<BaseResponse>(`todo-lists/${todolistId}/tasks/${taskId}`)
  },
  updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
    return instance.put<BaseResponse>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
  },
}
