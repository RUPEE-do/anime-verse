import React from 'react';
import AppRoutes from './routes/AppRoutes';
import { FavoritesProvider } from './context/FavoritesContext';

function App() {
  return (
    <FavoritesProvider>
      <AppRoutes />
    </FavoritesProvider>
  );
}

export default App;
