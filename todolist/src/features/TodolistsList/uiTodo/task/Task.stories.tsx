import type { Meta, StoryObj } from "@storybook/react"
import { Task } from "features/TodolistsList/uiTodo/task/Task"
import { ReduxStoreProviderDecorator } from "stories/decorators/ReduxStoreProviderDecorator"
import { useDispatch } from "react-redux"
import { useAppSelector } from "app/store"
import { v1 } from "uuid"
import { addTask } from "features/TodolistsList/model/tasksSlice/tasksSlice"
import { TaskPriorities, TaskStatuses } from "common/enums"
import { TaskType, TodolistDomainType } from "features/TodolistsList/services/todolistApi"

const meta: Meta<typeof Task> = {
  title: "Todolist/Task",
  component: Task,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    task: {
      id: "fffac",
      title: "JS",
      status: TaskStatuses.New,
      description: "",
      priority: TaskPriorities.Low,
      startDate: "",
      deadline: "",
      todoListId: "dddas",
      order: 0,
      addedDate: "",
    },
    todolist: {
      filter: "all",
      entityStatus: "idle",
      id: "todolistId1",
      title: "",
      addedDate: "",
      order: 0,
    },
  },
  decorators: [ReduxStoreProviderDecorator],
}

export default meta
type Story = StoryObj<typeof Task>

const TaskRender = () => {
  let task = useAppSelector<TaskType>((state) => state.tasks["todolistId1"][0])
  let todolist = useAppSelector<TodolistDomainType>((state) => state.todolists[0])
  const dispatch = useDispatch()

  type Action = Omit<ReturnType<typeof addTask.fulfilled>, "meta">
  const action: Action = {
    type: addTask.fulfilled.type,
    payload: {
      task: task,
    },
  }

  if (!task) {
    task = {
      id: v1(),
      title: "HTML&CSS",
      status: TaskStatuses.Completed,
      description: "",
      priority: TaskPriorities.Low,
      startDate: "",
      deadline: "",
      todoListId: "todolistId1",
      order: 0,
      addedDate: "",
    }
    dispatch(action)
  }

  return <Task task={task} todolist={todolist} />
}
export const TaskStory: Story = {
  render: () => <TaskRender />,
}
