import React from "react"
import TextField from "@mui/material/TextField"
import EditIcon from "@mui/icons-material/Edit"
import { IconButton } from "@mui/material"
import { styled } from "styled-components"
import { TaskStatuses } from "common/enums"
import { TaskDomainType } from "features/TodolistsList/ui/taskApi.types"

type EditableSpan = {
  title: string
  onChange: (title: string) => void
  disabled: boolean
  status?: TaskStatuses
}
type TitleProps = {
  status: TaskStatuses | undefined
}
export const EditableSpan = React.memo(({ title, onChange, disabled, status }: EditableSpan) => {
  const [editMode, setEditMode] = React.useState<boolean>(false)
  const [value, setValue] = React.useState("")

  const activateEditMode = () => {
    setEditMode(true)
    setValue(title)
  }
  const activateViewMode = () => {
    setEditMode(false)
    onChange(value)
  }
  const onChangeValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value)

  return (
    <Wrapper>
      {editMode ? (
        <TextField
          disabled={disabled}
          value={value}
          onChange={onChangeValueHandler}
          onBlur={activateViewMode}
          autoFocus
          sx={{ width: "170px" }}
        />
      ) : (
        <WrapperIcons>
          <Title status={status}>{title}</Title>
          <IconButton onClick={activateEditMode} aria-label="edit" disabled={disabled}>
            <EditIcon />
          </IconButton>
        </WrapperIcons>
      )}
    </Wrapper>
  )
})

const Wrapper = styled.div`
  width: 260px;
`
const WrapperIcons = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 8px 0;
`

const Title = styled.span<TitleProps>`
  height: 40px;
  line-height: 3;
  opacity: ${({ status }) => (status === TaskStatuses.Completed ? 0.5 : 1)};
`
