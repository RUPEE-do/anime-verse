import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { searchAnime } from '../../services/animeService';
import AnimeCard from '../../components/AnimeCard';
import Loader from '../../components/Loader';
import Pagination from '../../components/Pagination';

const Search = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('q') || '';

  const [animeList, setAnimeList] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasNextPage, setHasNextPage] = useState(true);

  useEffect(() => {
    // Reset page when query changes
    setPage(1);
  }, [query]);

  useEffect(() => {
    const fetchSearch = async () => {
      if (!query) {
        setAnimeList([]);
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const response = await searchAnime(query, page);

        setAnimeList(response.data.data);

        setHasNextPage(response.data.pagination?.has_next_page || false);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSearch();
  }, [query, page]);

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '1.5rem',
  };

  return (
    <div className="container" style={{ padding: 'var(--spacing-2xl) 0' }}>
      <h1 style={{ marginBottom: 'var(--spacing-xl)' }}>Search Results for "{query}"</h1>
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
              No results found.
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Search;
