import React from 'react';

function InputGroup({ label, name, error, children }) {
  return (
    <div className="inputGroup">
      <label className="label" htmlFor={name}>{label}</label>
      <div className="inputBox">
        {children}
      </div>
      {error && <span className="error">{error}</span>}
    </div>
  );
}

export default InputGroup;
