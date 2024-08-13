import axios from "axios"
import { RequestStatusType } from "app/appSlice"
import { instance } from "common/instance/instance"
import { BaseResponse } from "common/types/types"
import { TaskPriorities, TaskStatuses } from "common/enums"

//api
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
  /*updateTodolistTitle(todolistId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title})
    },
    */
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

//types
export type FilterType = "all" | "active" | "completed"

export type TodolistDomainType = TodolistType & {
  filter: FilterType
  entityStatus: RequestStatusType
}

export type TodolistType = {
  id: string
  title: string
  addedDate: string
  order: number
}

export type TaskDomainType = TaskType & {
  entityStatus: RequestStatusType
}

export type TaskType = {
  description: string
  title: string
  status: TaskStatuses
  priority: TaskPriorities
  startDate: string
  deadline: string
  id: string
  todoListId: string
  order: number
  addedDate: string
}

type GetTaskType = {
  items: TaskType[]
  totalCount: number
  error: null | string
}

export type UpdateTaskModelType = {
  title: string
  description: string
  status: TaskStatuses
  priority: TaskPriorities
  startDate: string
  deadline: string
}
type UpdateDomainTaskModelType = {
  title?: string
  description?: string
  completed?: boolean
  status?: TaskStatuses
  priority?: TaskPriorities
  startDate?: string
  deadline?: string
}
export type UpdateTaskArgs = {
  todolistId: string
  taskId: string
  domainModel: UpdateDomainTaskModelType
}
