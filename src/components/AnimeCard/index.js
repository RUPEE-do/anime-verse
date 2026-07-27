import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';

const AnimeCard = ({ anime }) => {
  const { mal_id, title, images, score, year, genres } = anime;

  const cardStyle = {
    position: 'relative',
    borderRadius: 'var(--radius-lg)',
    overflow: 'hidden',
    background: 'var(--bg-color-light)',
    boxShadow: 'var(--shadow-md)',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    textDecoration: 'none'
  };

  const imgContainerStyle = {
    position: 'relative',
    paddingTop: '140%', // Aspect ratio
    overflow: 'hidden'
  };

  const imgStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'transform 0.5s ease'
  };

  const contentStyle = {
    padding: '1rem',
    display: 'flex',
    flexDirection: 'column',
    flex: 1
  };

  const titleStyle = {
    fontSize: '1rem',
    fontWeight: '600',
    color: '#fff',
    marginBottom: '0.5rem',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden'
  };

  const metaStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 'auto',
    fontSize: '0.85rem',
    color: 'var(--text-secondary)'
  };

  const scoreStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
    color: '#facc15'
  };

  const genreStyle = {
    position: 'absolute',
    top: '0.5rem',
    left: '0.5rem',
    background: 'rgba(0,0,0,0.7)',
    backdropFilter: 'blur(4px)',
    padding: '0.25rem 0.5rem',
    borderRadius: 'var(--radius-sm)',
    fontSize: '0.75rem',
    color: '#fff',
    zIndex: 2
  };

  return (
    <Link to={`/anime/${mal_id}`} style={{ textDecoration: 'none' }}>
      <motion.div 
        style={cardStyle}
        whileHover={{ y: -5, boxShadow: 'var(--shadow-lg)' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="anime-card"
      >
        <div style={imgContainerStyle} className="img-container">
          {genres && genres.length > 0 && (
            <div style={genreStyle}>{genres[0].name}</div>
          )}
          <motion.img 
            src={images?.webp?.large_image_url || images?.jpg?.image_url} 
            alt={title} 
            style={imgStyle} 
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.5 }}
          />
          <div style={{
            position: 'absolute', 
            bottom: 0, 
            left: 0, 
            right: 0, 
            height: '50%', 
            background: 'linear-gradient(to top, var(--bg-color-light) 0%, transparent 100%)',
            zIndex: 1
          }}></div>
        </div>
        <div style={contentStyle}>
          <h3 style={titleStyle}>{title}</h3>
          <div style={metaStyle}>
            <div style={scoreStyle}>
              <FaStar /> {score || 'N/A'}
            </div>
            <div>{year || 'TBA'}</div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default AnimeCard;
