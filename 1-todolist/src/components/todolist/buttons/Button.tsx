import React, {ReactNode} from 'react';

type ButtonsPropsType = {
    children: ReactNode
}
export const Button = ({children}: ButtonsPropsType) => {
    return (
        <button>{children}</button>
    );
};