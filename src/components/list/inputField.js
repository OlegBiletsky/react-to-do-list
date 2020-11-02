import React from 'react'

function InputField(props) {
    return(
            <input 
                type='text'
                value={props.value}
                onChange={props.onChange}
            />
    )
}
export default InputField;