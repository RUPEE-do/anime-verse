import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaInfoCircle, FaStar } from 'react-icons/fa';
import Button from '../Button';
import TrailerModal from '../TrailerModal';
import { Link } from 'react-router-dom';
import { truncateText } from '../../utils/helpers';

const Hero = ({ anime }) => {
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  if (!anime) return null;

  const { mal_id, title, synopsis, images, trailer, score, genres } = anime;
  const bgImage = images?.webp?.large_image_url || images?.jpg?.large_image_url;

  const containerStyle = {
    position: 'relative',
    height: '100vh',
    minHeight: '700px',
    display: 'flex',
    alignItems: 'center',
    marginTop: '0', // Pull up behind navbar
    paddingTop: 'var(--navbar-height)',
    overflow: 'hidden',
  };

  const bgStyle = {
    position: "absolute",
    inset: 0,          // replaces top/left/right/bottom
    overflow: "hidden",
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    zIndex: -1,
  };
  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background:
      'linear-gradient(90deg, rgba(5,5,16,0.95) 0%, rgba(5,5,16,0.45) 50%, rgba(5,5,16,0.1) 100%), linear-gradient(0deg, rgba(5,5,16,1) 0%, rgba(5,5,16,0) 35%)',
    backdropFilter: 'blur(3px)',
    zIndex: -1,
  };

  const contentStyle = {
    maxWidth: '600px',
    color: '#fff',
  };

  const tagStyle = {
    display: 'inline-block',
    background: 'var(--accent-purple)',
    padding: '0.25rem 0.75rem',
    borderRadius: 'var(--radius-full)',
    fontSize: '0.8rem',
    fontWeight: '600',
    marginBottom: '1rem',
  };

  const titleStyle = {
    fontSize: 'clamp(3rem, 7vw, 5.5rem)',
    fontWeight: 800,
    letterSpacing: '-2px',
    lineHeight: 1.1,
    marginBottom: '1rem',
  };

  const btnContainerStyle = {
    display: 'flex',
    gap: '1rem',
    marginTop: '2rem',
    flexWrap: 'wrap'
  };

  return (
    <div style={containerStyle}>
      <motion.div
        style={bgStyle}
        initial={{ scale: 1 }}
        animate={{ scale: 1.08 }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear",
        }}
      />
      <div style={overlayStyle}></div>

      <div className="container">
        <motion.div
          style={contentStyle}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 1,
            ease: "easeOut",
          }}
        >
          {genres && genres.length > 0 && (
            <div
              style={{
                display: "flex",
                gap: "10px",
                marginBottom: "20px",
                flexWrap: "wrap",
              }}
            >
              {genres.slice(0, 3).map((genre) => (
                <span
                  key={genre.mal_id}
                  style={tagStyle}
                >
                  {genre.name}
                </span>
              ))}
            </div>
          )}
          <h1 style={titleStyle}>{title}</h1>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
            <FaStar style={{ color: '#facc15', marginRight: '0.25rem' }} />
            <span style={{ fontWeight: '600', color: '#fff' }}>{score || 'N/A'}</span>
          </p>
          <p style={{ fontSize: '1.05rem', lineHeight: 1.6, opacity: 0.9 }}>
            {truncateText(synopsis, 250)}
          </p>

          <div style={btnContainerStyle}>
            <Button variant="primary" onClick={() => setIsTrailerOpen(true)}>
              <FaPlay /> Watch Trailer
            </Button>
            <Link to={`/anime/${mal_id}`}>
              <Button variant="secondary">
                <FaInfoCircle /> More Info
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>

      <TrailerModal
        isOpen={isTrailerOpen}
        onClose={() => setIsTrailerOpen(false)}
        trailerUrl={trailer?.embed_url || trailer?.url}
      />
    </div>
  );
};



export default Hero;
