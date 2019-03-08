import * as React from 'react';

export const ErrorPopup: React.StatelessComponent = () => {
  return (
    <div className="error-wrapper">
      <div className="error-message">
        <i>X</i>
        <b>Something went wrong :(</b>
        <p>Hit "F5" to reload application</p>
      </div>
    </div>
  );
};
