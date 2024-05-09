import React, {ReactNode} from 'react';

type ButtonsPropsType = {
    /*children: ReactNode*/
    title: string
    onClick: () => void
    className?: string
}
export const Button = ({/*children*/title, onClick, className}: ButtonsPropsType) => {
    return (
        <button className={className} onClick={onClick}>{/*children*/title}</button>
    );
};