import React from 'react';
import { motion } from 'framer-motion';

const GenreFilter = ({ genres, selectedGenre, onSelectGenre }) => {
  const containerStyle = {
    display: 'flex',
    gap: '0.75rem',
    flexWrap: 'nowrap',
    overflowX: 'auto',
    padding: '1rem 0',
    WebkitOverflowScrolling: 'touch',
    scrollbarWidth: 'none', // Firefox
  };

  const chipStyle = (isSelected) => ({
    padding: '0.5rem 1.25rem',
    borderRadius: 'var(--radius-full)',
    background: isSelected ? 'var(--accent-cyan)' : 'var(--bg-color-glass)',
    color: isSelected ? '#000' : '#fff',
    border: '1px solid',
    borderColor: isSelected ? 'var(--accent-cyan)' : 'rgba(255,255,255,0.1)',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '0.9rem',
    whiteSpace: 'nowrap',
    transition: 'all 0.3s ease',
  });

  return (
    <div>
      <style>{`
        .genre-container::-webkit-scrollbar { display: none; }
      `}</style>
      <div style={containerStyle} className="genre-container">
        <motion.button
          style={chipStyle(!selectedGenre)}
          onClick={() => onSelectGenre(null)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          All Anime
        </motion.button>
        {genres.map(genre => (
          <motion.button
            key={genre.mal_id}
            style={chipStyle(selectedGenre === genre.mal_id)}
            onClick={() => onSelectGenre(genre.mal_id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {genre.name}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default GenreFilter;
