import { RequestStatusType } from "app/appSlice"

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
