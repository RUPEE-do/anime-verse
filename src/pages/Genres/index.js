import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getAnimeGenres, getAnimeByGenre } from '../../services/animeService';
import GenreFilter from '../../components/GenreFilter';
import AnimeCard from '../../components/AnimeCard';
import Loader from '../../components/Loader';
import Pagination from '../../components/Pagination';

const Genres = () => {
  const location = useLocation();
  const initialGenre = location.state?.selectedGenre || null;

  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(initialGenre);
  const [animeList, setAnimeList] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasNextPage, setHasNextPage] = useState(true);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await getAnimeGenres();
        setGenres(response.data.data.filter(g => g.count > 100));
      } catch (err) {
        console.error(err);
      }
    };
    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchAnime = async () => {
      setLoading(true);

      try {
        if (!selectedGenre) {
          setAnimeList([]);
          setLoading(false);
          return;
        }

        const response = await getAnimeByGenre(selectedGenre, page);

        setAnimeList(response.data.data);
        setHasNextPage(response.data.pagination?.has_next_page || false);

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnime();
  }, [selectedGenre, page]);

  const handleGenreChange = (genreId) => {
    setSelectedGenre(genreId);
    setPage(1);
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '1.5rem',
  };

  return (
    <div className="container" style={{ padding: 'var(--spacing-2xl) 0' }}>
      <h1 style={{ marginBottom: '1rem' }}>Browse by Genre</h1>
      <GenreFilter genres={genres} selectedGenre={selectedGenre} onSelectGenre={handleGenreChange} />

      <div style={{ marginTop: 'var(--spacing-xl)' }}>
        {loading ? <Loader /> : (
          <>
            <div style={gridStyle}>
              {Array.isArray(animeList) &&
                animeList.map((anime) => (
                  <AnimeCard key={anime.mal_id} anime={anime} />
                ))}
            </div>
            {Array.isArray(animeList) && animeList.length > 0 ? (
              <Pagination currentPage={page} hasNextPage={hasNextPage} onPageChange={setPage} />
            ) : (
              <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                No anime found.
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Genres;
