import React from 'react';

function ResetButton (props) {
    return(
        <>
            <button onClick={props.handleResetList}>Очистити все</button>
        </>
    )
}
export default ResetButton;