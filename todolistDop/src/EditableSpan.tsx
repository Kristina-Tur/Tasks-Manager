import React, {ChangeEvent} from 'react';

type Props = {
    oldTitle: string
    changeItemTitle: (newTitle: string) => void
}

export const EditableSpan = ({oldTitle, changeItemTitle}: Props) => {
    const [editMode, setEditMode] = React.useState<boolean>(false)
    const [newTitle, setNewTitle] = React.useState<string>(oldTitle)

    const activateEditMode = () => {
        setEditMode(!editMode)
        changeItemTitle(newTitle)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    return (
        editMode
            ? <input value={newTitle}
                     onChange={onChangeHandler}
                     onBlur={activateEditMode}
                     autoFocus
            />
            : <span onDoubleClick={activateEditMode}>{oldTitle}</span>
    );
};