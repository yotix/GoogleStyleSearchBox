import React from 'react';
import './input.css';

const Input = props => {
    return(
        <React.Fragment>
        <button 
        onClick={props.reset}
        className="close-icon" type="reset">{props.value?("x"):""}</button>
       <input className={props.class}
        name={props.name}
        type={props.type}
        onChange={props.onChange}
        placeholder={props.placeholder}
        onFocus={props.onFocus}
        onBlur={props.onBlur}
        onKeyDown={props.onKeyPress}
        value={props.value}
        />
        </React.Fragment>
    
    )
}

export default Input;