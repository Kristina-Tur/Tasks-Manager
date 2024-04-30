import React, {ReactNode} from 'react';

type ButtonsPropsType = {
    /*children: ReactNode*/
    title: string
    onClick: () => void
}
export const Button = ({/*children*/title, onClick}: ButtonsPropsType) => {
    return (
        <button onClick={onClick}>{/*children*/title}</button>
    );
};