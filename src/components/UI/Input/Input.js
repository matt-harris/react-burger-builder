import React from 'react';
import classes from './Input.module.css';

const Input = (props) => {
  let InputElement = null;
  const inputClasses = [classes.InputElement];

  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(classes.Invalid);
  }

  switch (props.elementType) {
    case ('input'):
      InputElement = <input
        className={inputClasses.join(' ')}
        {...props.elementConfig}
        value={props.value} onChange={props.changed} />;
      break;
    case ('textarea'):
      InputElement = <textarea
        className={inputClasses.join(' ')}
        {...props.elementConfig}
        value={props.value} onChange={props.changed} />;
      break;
    case ('select'):
      InputElement = (
        <select className={inputClasses.join(' ')} value={props.value} onChange={props.changed}>
          {
            props.elementConfig.options.map(option => (
              <option key={option.value} value={option.value}>
                {option.displayName}
              </option>
            ))
          }
        </select>
      );
      break;
    default:
      InputElement = <input
        className={inputClasses.join(' ')}
        {...props.elementConfig}
        value={props.value} onChange={props.changed} />;
  }

  let validationError = null;
  if (props.invalid && props.touched) {
    validationError = <p className={classes.ValidationError}>{props.errorMessage}</p>;
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {InputElement}
      {validationError}
    </div>
  );
};

export default Input;