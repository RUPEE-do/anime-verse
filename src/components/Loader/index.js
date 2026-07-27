import React from 'react';

const Loader = ({ fullScreen = false }) => {
  const style = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: fullScreen ? '100vh' : '100%',
    width: '100%',
    minHeight: '200px'
  };

  const spinnerStyle = {
    width: '50px',
    height: '50px',
    border: '4px solid rgba(255, 255, 255, 0.1)',
    borderTopColor: 'var(--accent-cyan)',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  };

  return (
    <div style={style}>
      <div style={spinnerStyle}></div>
    </div>
  );
};

export const Skeleton = ({ width = '100%', height = '20px', borderRadius = 'var(--radius-md)', style = {} }) => {
  return (
    <div className="skeleton" style={{ width, height, borderRadius, ...style }}></div>
  );
};

export default Loader;
