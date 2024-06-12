// @flow 
import * as React from 'react';
import {ChangeEvent, useState} from "react";

type Props = {
    title: string
    onChangeTitle: (newTitle: string) => void
};
export const EditableSpan = ({title, onChangeTitle}: Props) => {
    const [newTitle, setNewTitle] = useState(title)
    const [editMode, setEditMode] = useState(false)

    const activateInputHandler = () => {
        setEditMode(!editMode)
        onChangeTitle(newTitle)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    return (
        editMode
            ? <input value={newTitle} onChange={onChangeHandler} onBlur={activateInputHandler} autoFocus/>
            : <span onDoubleClick={activateInputHandler}>{title}</span>
    );
};