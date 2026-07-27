import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';

const TrailerModal = ({ isOpen, onClose, trailerUrl }) => {
  const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.8)',
    backdropFilter: 'blur(10px)',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem'
  };

  const modalStyle = {
    position: 'relative',
    width: '100%',
    maxWidth: '900px',
    aspectRatio: '16/9',
    background: '#000',
    borderRadius: 'var(--radius-lg)',
    overflow: 'hidden',
    boxShadow: 'var(--shadow-glow-cyan)'
  };

  const closeBtnStyle = {
    position: 'absolute',
    top: '-40px',
    right: 0,
    background: 'transparent',
    color: '#fff',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer'
  };

  // Extract youtube ID for better embed
  let embedUrl = trailerUrl;
  if (trailerUrl && !trailerUrl.includes('embed')) {
    const videoId = trailerUrl.split('v=')[1]?.split('&')[0];
    if (videoId) {
      embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          style={overlayStyle}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div 
            style={modalStyle}
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button style={closeBtnStyle} onClick={onClose}><FaTimes /></button>
            {embedUrl ? (
              <iframe
                src={embedUrl}
                title="Anime Trailer"
                width="100%"
                height="100%"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#fff' }}>
                <h2>No Trailer Available</h2>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TrailerModal;
