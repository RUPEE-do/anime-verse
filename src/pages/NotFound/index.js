import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button';

const NotFound = () => {
  const style = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '60vh',
    textAlign: 'center'
  };

  return (
    <div className="container" style={style}>
      <h1 style={{ fontSize: '6rem', color: 'var(--accent-purple)', marginBottom: '1rem', lineHeight: 1 }}>404</h1>
      <h2 style={{ marginBottom: '1rem' }}>Page Not Found</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
        Oops! The page you are looking for does not exist or has been moved.
      </p>
      <Link to="/">
        <Button variant="primary">Return Home</Button>
      </Link>
    </div>
  );
};

export default NotFound;
