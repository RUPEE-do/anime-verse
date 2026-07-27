import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SearchBar from '../SearchBar';
import { FaBars, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Trending', path: '/trending' },
    { name: 'Upcoming', path: '/upcoming' },
    { name: 'Genres', path: '/genres' },
    { name: 'Favorites', path: '/favorites' },
  ];

  const headerStyle = {
    position: 'sticky',
    top: 0,
    zIndex: 100,
    height: 'var(--navbar-height)',
    display: 'flex',
    alignItems: 'center'
  };

  const innerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
  };

  const logoStyle = {
    fontFamily: 'var(--font-secondary)',
    fontSize: '1.5rem',
    fontWeight: '800',
    color: '#fff',
    letterSpacing: '-1px'
  };

  const desktopNavStyle = {
    display: 'none',
    alignItems: 'center',
    gap: '2rem'
  };

  const linkStyle = (path) => ({
    color: location.pathname === path ? 'var(--accent-cyan)' : 'var(--text-primary)',
    fontWeight: location.pathname === path ? '600' : '400',
    fontSize: '0.95rem'
  });

  return (
    <header className="glass-panel" style={headerStyle}>
      <div className="container" style={innerStyle}>
        <Link to="/" style={logoStyle}>
          Anime<span className="text-gradient">Verse</span>
        </Link>

        {/* Desktop Nav */}
        <div className="desktop-nav" style={{ ...desktopNavStyle, display: 'flex' }}>
          <nav style={{ display: 'flex', gap: '2rem' }}>
            {navLinks.map((link) => (
              <Link key={link.name} to={link.path} style={linkStyle(link.path)}>
                {link.name}
              </Link>
            ))}
          </nav>
          <SearchBar />
        </div>

        {/* Mobile Toggle */}
        <div className="mobile-toggle" style={{ display: 'none', cursor: 'pointer' }} onClick={toggleMenu}>
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </div>
      </div>

      {/* Basic responsive override could be done via standard CSS but we will inject a small style tag for mobile menu */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-toggle { display: block !important; }
        }
      `}</style>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="glass-panel"
            style={{ position: 'absolute', top: '100%', left: 0, right: 0, padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}
          >
            <SearchBar onSearch={() => setIsOpen(false)} />
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                onClick={() => setIsOpen(false)}
                style={{ ...linkStyle(link.path), display: 'block', padding: '0.5rem 0' }}
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
