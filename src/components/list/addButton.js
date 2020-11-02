import React from 'react'

function AddButton(props) {
    return(
            <button onClick={props.handleAddItemToList}>Додати</button>
    )
}
export default AddButton;