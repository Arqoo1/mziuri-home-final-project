import React from 'react';

function Button({ text = 'Button', className = 'btn1', ...rest }) {
  return (
    <button className={className} {...rest}>
      {text}
    </button>
  );
}

export default Button;
