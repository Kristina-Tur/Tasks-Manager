import React, {memo, ReactNode} from 'react';
import Button from '@mui/material/Button'
import {FilterType} from "../../../App";
import {ButtonProps} from "@mui/material";

type ButtonWithMemoType = {
} & ButtonProps


export const ButtonWithMemo = memo(({variant, color, onClick, className, title, ...rest}: ButtonWithMemoType) => {
    return <Button
        variant={variant}
        color={color}
        onClick={onClick}
        {...rest}
    >{title}
    </Button>
})
