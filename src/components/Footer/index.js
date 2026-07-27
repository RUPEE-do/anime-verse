import React from 'react';
import { FaTwitter, FaDiscord, FaGithub } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  const footerStyle = {
    background: 'var(--bg-color-light)',
    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
    padding: 'var(--spacing-2xl) 0 var(--spacing-xl)',
    marginTop: 'auto'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
    marginBottom: '2rem'
  };

  const logoStyle = {
    fontFamily: 'var(--font-secondary)',
    fontSize: '1.5rem',
    fontWeight: '800',
    color: '#fff',
    marginBottom: '1rem',
    display: 'block'
  };

  const textStyle = {
    color: 'var(--text-secondary)',
    fontSize: '0.9rem',
    lineHeight: 1.6
  };

  const iconStyle = {
    display: 'flex',
    gap: '1rem',
    marginTop: '1rem'
  };

  const linkStyle = {
    color: 'var(--text-secondary)',
    display: 'block',
    marginBottom: '0.5rem',
    fontSize: '0.9rem'
  };

  const bottomStyle = {
    borderTop: '1px solid rgba(255, 255, 255, 0.05)',
    paddingTop: '1.5rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '1rem'
  };

  return (
    <footer style={footerStyle}>
      <div className="container">
        <div style={gridStyle}>
          <div>
            <Link to="/" style={logoStyle}>Anime<span className="text-gradient">Verse</span></Link>
            <p style={textStyle}>
              Your ultimate destination for discovering new anime, watching official trailers, and tracking your favorites.
            </p>
            <div style={iconStyle}>
              <FaTwitter size={20} color="var(--text-secondary)" style={{cursor: 'pointer'}} />
              <FaDiscord size={20} color="var(--text-secondary)" style={{cursor: 'pointer'}} />
              <FaGithub size={20} color="var(--text-secondary)" style={{cursor: 'pointer'}} />
            </div>
          </div>
          <div>
            <h3 style={{color: '#fff', marginBottom: '1rem', fontSize: '1.1rem'}}>Quick Links</h3>
            <Link to="/trending" style={linkStyle}>Trending Anime</Link>
            <Link to="/top-rated" style={linkStyle}>Top Rated</Link>
            <Link to="/upcoming" style={linkStyle}>Upcoming Seasons</Link>
            <Link to="/genres" style={linkStyle}>Browse by Genre</Link>
          </div>
          <div>
            <h3 style={{color: '#fff', marginBottom: '1rem', fontSize: '1.1rem'}}>Legal</h3>
            <Link to="/about" style={linkStyle}>About Us</Link>
            <Link to="/contact" style={linkStyle}>Contact</Link>
            <span style={linkStyle}>Terms of Service</span>
            <span style={linkStyle}>Privacy Policy</span>
          </div>
        </div>
        
        <div style={bottomStyle}>
          <p style={textStyle}>&copy; {new Date().getFullYear()} AnimeVerse. All rights reserved.</p>
          <p style={textStyle}>Powered by <a href="https://jikan.moe" target="_blank" rel="noreferrer" style={{color: 'var(--accent-cyan)'}}>Jikan API</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
