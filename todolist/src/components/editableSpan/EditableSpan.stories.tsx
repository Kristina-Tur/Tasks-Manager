import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "@storybook/test"
import { EditableSpan } from "./EditableSpan"

const meta: Meta<typeof EditableSpan> = {
  title: "Todolist/EditableSpan",
  component: EditableSpan,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    onChange: fn(),
    title: "HTML",
  },
}

export default meta
type Story = StoryObj<typeof EditableSpan>

export const EditableSpanStory: Story = {}
