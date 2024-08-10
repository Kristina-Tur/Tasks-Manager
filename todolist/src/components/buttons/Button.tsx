import React, { memo } from "react"
import Button from "@mui/material/Button"
import { ButtonProps } from "@mui/material"

type ButtonWithMemoType = {} & ButtonProps

export const ButtonWithMemo = memo(({ variant, color, onClick, className, title, ...rest }: ButtonWithMemoType) => {
  return (
    <Button variant={variant} color={color} onClick={onClick} {...rest}>
      {title}
    </Button>
  )
})
