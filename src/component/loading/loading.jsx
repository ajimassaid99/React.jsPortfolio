import React from 'react';
import './loading.css';

function Loading(props) {
  return (
    <div className="loading-container">
      <div className="loading">
        <div className="loading-dot" style={{ backgroundColor: props.color }}></div>
        <div className="loading-dot" style={{ backgroundColor: props.color }}></div>
        <div className="loading-dot" style={{ backgroundColor: props.color }}></div>
        <div className="loading-dot" style={{ backgroundColor: props.color }}></div>
      </div>
      {props.message && <div className="loading-message">
        <p className="message" style={{ color: props.color }}>{props.message}</p>
        <div className="loading-line" style={{ backgroundColor: props.color }}></div>
      </div>}
    </div>
  );
}

export default Loading;
