import React from 'react';
import { string, object } from 'prop-types';

const styles = {
  inputWrapper: {},
  input: {
    borderRadius: '3rem'
  }
};

function CustomInput({
  type,
  className,
  style = {},
  label,
  description,
  ...restProps
}) {
  const combinedInputStyle = { ...styles.input, ...style };
  return (
    <input
      type={type || 'text'}
      className={`form-control ${className}`}
      style={combinedInputStyle}
      aria-label={label}
      aria-describedby={description}
      {...restProps}
    />
  );
}

CustomInput.propTypes = {
  type: string,
  className: string,
  style: object,
  label: string,
  description: string
};

export default CustomInput;
