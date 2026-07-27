import React, { useState, useEffect } from 'react';
import { getTopAnime } from '../../services/animeService';
import AnimeCard from '../../components/AnimeCard';
import Loader from '../../components/Loader';
import Pagination from '../../components/Pagination';

const Trending = () => {
  const [animeList, setAnimeList] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasNextPage, setHasNextPage] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      setLoading(true);
      try {
        const response = await getTopAnime();

        setAnimeList(response.data.data);

        setHasNextPage(response.data.pagination.has_next_page);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrending();
  }, [page]);

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '1.5rem',
  };
  console.log(animeList);
  console.log(Array.isArray(animeList));
  return (
    <div className="container" style={{ padding: 'var(--spacing-2xl) 0' }}>
      <h1 style={{ marginBottom: 'var(--spacing-xl)' }}>Trending Anime</h1>
      {loading ? <Loader /> : (
        <>
          <div style={gridStyle}>
            {animeList.map(anime => (
              <AnimeCard key={anime.mal_id} anime={anime} />
            ))}
          </div>
          <Pagination currentPage={page} hasNextPage={hasNextPage} onPageChange={setPage} />
        </>
      )}
    </div>
  );
};

export default Trending;
