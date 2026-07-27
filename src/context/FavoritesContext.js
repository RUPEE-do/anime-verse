import React, { createContext, useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const FavoritesContext = createContext();

export const useFavorites = () => useContext(FavoritesContext);

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useLocalStorage('anime-favorites', []);

  const addFavorite = (anime) => setFavorites([...favorites, anime]);
  const removeFavorite = (id) => setFavorites(favorites.filter(fav => fav.mal_id !== id));

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
