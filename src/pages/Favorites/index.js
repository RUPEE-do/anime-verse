import React from 'react';
import AnimeCard from '../../components/AnimeCard';
import { useFavorites } from '../../context/FavoritesContext';

const Favorites = () => {
  const { favorites } = useFavorites();

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '1.5rem',
  };

  return (
    <div className="container" style={{ padding: 'var(--spacing-2xl) 0' }}>
      <h1 style={{ marginBottom: 'var(--spacing-xl)' }}>My Favorites</h1>
      
      {favorites.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-secondary)' }}>
          <h2 style={{ marginBottom: '1rem' }}>No favorites yet!</h2>
          <p>Browse anime and click the heart icon to add them to your favorites.</p>
        </div>
      ) : (
        <div style={gridStyle}>
          {favorites.map(anime => (
            <AnimeCard key={anime.mal_id} anime={anime} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
