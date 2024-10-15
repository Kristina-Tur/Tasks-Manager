import {RequestStatusType} from "app/appSlice";
import {TaskPriorities, TaskStatuses} from "common/enums";

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

export type GetTaskType = {
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

export type UpdateTaskArgs = {
    todolistId: string
    taskId: string
    domainModel: Partial<UpdateTaskModelType>
}