import React, {FC} from 'react';

export enum CardVariant {
    outlined = 'outlined',
    primary = 'primary'
}

interface CardProps {
    width: string
    variants?: CardVariant
    cb: ()=> void
}

const Card: FC<CardProps> = ({width, children, cb}) => {
    return (
        <div style={{width}} onClick={()=> cb()}>
            {children}
        </div>
    );
};

export default Card;