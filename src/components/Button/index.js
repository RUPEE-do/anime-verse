import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ children, variant = 'primary', onClick, className = '', type = 'button', disabled = false }) => {
  const baseStyle = {
    padding: '0.75rem 1.5rem',
    borderRadius: 'var(--radius-full)',
    fontWeight: '600',
    fontSize: '0.95rem',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
    transition: 'all 0.3s ease',
    opacity: disabled ? 0.5 : 1,
    cursor: disabled ? 'not-allowed' : 'pointer',
  };

  const variants = {
    primary: {
      background: 'linear-gradient(90deg, var(--accent-purple), var(--accent-cyan))',
      color: '#fff',
      boxShadow: 'var(--shadow-glow-purple)',
    },
    secondary: {
      background: 'var(--bg-color-glass)',
      border: '1px solid rgba(255,255,255,0.1)',
      color: 'var(--text-primary)',
      backdropFilter: 'blur(10px)',
    },
    outline: {
      background: 'transparent',
      border: '1px solid var(--accent-cyan)',
      color: 'var(--accent-cyan)',
    }
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={className}
      style={{ ...baseStyle, ...variants[variant] }}
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
    >
      {children}
    </motion.button>
  );
};

export default Button;
