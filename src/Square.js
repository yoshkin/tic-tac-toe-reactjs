import React from 'react';

const Square = (props) => {
    return (
        <button className={`${props.winnerClass}square`} onClick={props.onClick}>
            {props.value}
        </button>
    );
};

export default Square;
