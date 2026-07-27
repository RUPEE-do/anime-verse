import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getAnimeDetails } from '../../services/animeService';
import Loader from '../../components/Loader';
import Button from '../../components/Button';
import { useFavorites } from '../../context/FavoritesContext';
import { FaPlay, FaHeart, FaRegHeart, FaStar, FaCalendarAlt, FaFilm } from 'react-icons/fa';
import { motion } from 'framer-motion';

const AnimeDetails = () => {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        const response = await getAnimeDetails(id);

        console.log("FULL RESPONSE:", response);
        console.log("DATA:", response.data);
        console.log("INNER DATA:", response.data?.data);
        setAnime(response.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (loading) return <Loader fullScreen />;
  if (!anime) return <div className="container" style={{ paddingTop: '100px' }}><h2>Anime not found.</h2></div>;

  const isFavorite = favorites.some(fav => fav.mal_id === anime.mal_id);
  const toggleFavorite = () => {
    if (isFavorite) removeFavorite(anime.mal_id);
    else addFavorite(anime);
  };

  const bgImage = anime.images?.webp?.large_image_url || anime.images?.jpg?.large_image_url;

  return (
    <div>
      {/* Banner */}
      <div style={{
        position: 'relative', height: '65vh', minHeight: '300px', filter: 'brightness(0.45)',
        backgroundImage: `url(${bgImage})`, backgroundSize: 'cover', backgroundPosition: 'center',
        marginTop: 'calc(-1 * var(--navbar-height))', paddingTop: 'var(--navbar-height)'
      }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          background: 'linear-gradient(0deg, var(--bg-color) 0%, rgba(5,5,16,0.6) 100%)'
        }}></div>
      </div>

      <div className="container" style={{ marginTop: '-100px', position: 'relative', zIndex: 10, paddingBottom: '4rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem' }}>
          {/* Poster */}
          <motion.div
            initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
            style={{ flex: '0 0 250px' }}
          >
            <img
              src={bgImage}
              alt={anime.title}
              style={{ width: '100%', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)' }}
            />
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
            style={{ flex: 1, minWidth: '300px' }}
          >
            <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{anime.title}</h1>
            <h3 style={{ color: 'var(--text-secondary)', fontWeight: '400', marginBottom: '1.5rem' }}>{anime.title_japanese}</h3>

            <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FaStar color="#facc15" /> <strong>{anime.score || 'N/A'}</strong></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FaFilm /> {anime.type}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><FaCalendarAlt /> {anime.year || anime.aired?.string}</div>
              <div><strong>Status:</strong> {anime.status}</div>
            </div>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
              <Button
                variant="primary"
                onClick={() => {
                  document
                    .querySelector("iframe")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <FaPlay /> Watch Trailer
              </Button>
              <Button variant="secondary" onClick={toggleFavorite}>
                {isFavorite ? <FaHeart color="var(--error-color)" /> : <FaRegHeart />}
                {isFavorite ? 'Remove Favorite' : 'Add to Favorites'}
              </Button>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem', marginBottom: '1rem' }}>Synopsis</h3>
              <p style={{ lineHeight: '1.8', color: 'var(--text-secondary)' }}>{anime.synopsis}</p>
            </div>
            <div className="details-grid">
              <div><strong>Episodes:</strong> {anime.episodes || "Unknown"}</div>
              <div><strong>Season:</strong> {anime.season || "Unknown"}</div>
              <div><strong>Year:</strong> {anime.year || "Unknown"}</div>
              <div><strong>Status:</strong> {anime.status}</div>
              <div><strong>Rating:</strong> {anime.rating}</div>
              <div><strong>Source:</strong> {anime.source}</div>
              <div><strong>Duration:</strong> {anime.duration}</div>
              <div><strong>Rank:</strong> #{anime.rank}</div>
              <div><strong>Popularity:</strong> #{anime.popularity}</div>
              <div><strong>Members:</strong> {anime.members?.toLocaleString()}</div>
              <div><strong>Favorites:</strong> {anime.favorites?.toLocaleString()}</div>
            </div>
            <h3>Studios</h3>

            <div className="genre-container">
              {anime.studios?.map(studio => (
                <span className="genre-tag" key={studio.mal_id}>
                  {studio.name}
                </span>
              ))}
            </div>
            <h3>Themes</h3>

            <div className="genre-container">
              {anime.themes?.map(theme => (
                <span className="genre-tag" key={theme.mal_id}>
                  {theme.name}
                </span>
              ))}
            </div>
            <h3>Demographic</h3>

            <div className="genre-container">
              {anime.demographics?.map(item => (
                <span className="genre-tag" key={item.mal_id}>
                  {item.name}
                </span>
              ))}
            </div>
            <div>
              <h3 style={{ marginBottom: '1rem' }}>Genres</h3>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {anime.genres?.map(g => (
                  <Link key={g.mal_id} to={`/genres`} state={{ selectedGenre: g.mal_id }} style={{
                    background: 'var(--bg-color-glass)', padding: '0.25rem 0.75rem', borderRadius: 'var(--radius-full)', border: '1px solid rgba(255,255,255,0.1)', fontSize: '0.85rem'
                  }}>
                    {g.name}
                  </Link>
                ))}
              </div>
            </div>
            <div style={{ marginTop: "4rem" }}>
              <h2 style={{ marginBottom: "1.5rem" }}>🎬 Official Trailer</h2>

              {anime?.trailer?.embed_url ? (
                <iframe
                  src={`${anime.trailer.embed_url}?autoplay=1&mute=1&rel=0`}
                  width="100%"
                  height="550"
                  title={anime.title}
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  style={{
                    border: "none",
                    borderRadius: "20px",
                    boxShadow: "0 20px 50px rgba(0,0,0,.5)"
                  }}
                />
              ) : (
                <div
                  style={{
                    padding: "80px",
                    textAlign: "center",
                    borderRadius: "20px",
                    background: "#151515"
                  }}
                >
                  <h2>No Trailer Available</h2>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>


    </div>
  );
};

export default AnimeDetails;
