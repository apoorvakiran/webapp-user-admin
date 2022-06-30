import React from 'react';

export const FormButton = (props) => (

    < div id="button" className={"row" + props.changeStyleClass} >
        <button>{props.title}</button>
    </div >
);
