import React, { useState, useEffect } from 'react';
import { getUpcomingAnime } from '../../services/animeService';
import AnimeCard from '../../components/AnimeCard';
import Loader from '../../components/Loader';
import Pagination from '../../components/Pagination';

const Upcoming = () => {
  const [animeList, setAnimeList] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasNextPage, setHasNextPage] = useState(true);

  useEffect(() => {
    const fetchUpcoming = async () => {
      setLoading(true);
      try {
        const response = await getUpcomingAnime(page);
        setAnimeList(response.data.data);
        setHasNextPage(response.data.pagination?.has_next_page || false);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUpcoming();
  }, [page]);

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '1.5rem',
  };

  return (
    <div className="container" style={{ padding: 'var(--spacing-2xl) 0' }}>
      <h1 style={{ marginBottom: 'var(--spacing-xl)' }}>Upcoming Seasons</h1>
      {loading ? <Loader /> : (
        <>
          <div style={gridStyle}>
            {Array.isArray(animeList) &&
              animeList.map((anime) => (
                <AnimeCard key={anime.mal_id} anime={anime} />
              ))}

          </div>
          <Pagination currentPage={page} hasNextPage={hasNextPage} onPageChange={setPage} />
        </>
      )}
    </div>
  );
};

export default Upcoming;
