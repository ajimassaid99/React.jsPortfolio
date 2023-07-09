import React from 'react';
import './error.css';
import errorImage from '../../assets/images/failed.png';

function Error(props) {
  const { message, onRetry } = props;
  
  return (
    <div className="error-container">
      <div className="error-image">
        <img src={errorImage} alt="Error" />
      </div>
      <p className="error-message">{message}</p>
      <button className="error-button" onClick={onRetry}>Retry</button>
    </div>
  );
}

export default Error;