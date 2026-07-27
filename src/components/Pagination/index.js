import React from 'react';
import Button from '../Button';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Pagination = ({ currentPage, hasNextPage, onPageChange }) => {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1rem',
    padding: 'var(--spacing-xl) 0'
  };

  const textStyle = {
    fontWeight: '600',
    color: 'var(--text-secondary)'
  };

  return (
    <div style={containerStyle}>
      <Button 
        variant="secondary" 
        onClick={() => onPageChange(currentPage - 1)} 
        disabled={currentPage <= 1}
      >
        <FaChevronLeft /> Prev
      </Button>
      <span style={textStyle}>Page {currentPage}</span>
      <Button 
        variant="secondary" 
        onClick={() => onPageChange(currentPage + 1)} 
        disabled={!hasNextPage}
      >
        Next <FaChevronRight />
      </Button>
    </div>
  );
};

export default Pagination;
