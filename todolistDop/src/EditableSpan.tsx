import React, {ChangeEvent} from 'react';

type Props = {
    oldTitle: string
    changeTaskTitle: (todolistId: string, taskId: string, newTitle: string) => void
}

export const EditableSpan = ({oldTitle}: Props) => {
    const [editMode, setEditMode] = React.useState<boolean>(false)
    const [title, setTitle] = React.useState<string>(oldTitle)

    const activateEditMode = () => {
        setEditMode(!editMode)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
        changeTaskTitle()
    }
    return (
        editMode
            ? <input value={title}
                     onChange={onChangeHandler}
                     onBlur={activateEditMode}
                     autoFocus
            />
            : <span onDoubleClick={activateEditMode}>{oldTitle}</span>
    );
};