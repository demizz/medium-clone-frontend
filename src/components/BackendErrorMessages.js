import React from 'react';

const BackendErrorMessages = ({ backendErrors }) => {
  const errorMessages = Object.keys(backendErrors).map((name) => {
    const message = backendErrors[name].join(' ');
    return `${name} ${message}`;
  });
  // console.log('errorMessages ', errorMessages);
  return (
    <ul className="error-messages">
      {errorMessages.map((item) => {
        return <li key={item}>{item}</li>;
      })}
    </ul>
  );
};

export default BackendErrorMessages;
