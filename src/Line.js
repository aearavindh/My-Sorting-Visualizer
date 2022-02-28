import React from 'react';
import './Line.css';

function Line(props) {
    return (
        <div style={{height: props.height + 'px', backgroundColor: props.color}} className="line">
            <p>{props.number}</p>
        </div>
    )
}

export default Line;
