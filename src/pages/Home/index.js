import React, { useEffect, useState } from 'react';
import Hero from '../../components/Hero';
import AnimeCard from '../../components/AnimeCard';
import Loader, { Skeleton } from '../../components/Loader';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import { motion } from "framer-motion";
import {
  getTopAnime,
  getUpcomingAnime,
} from "../../services/animeService";
const Home = () => {
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const trendingResponse = await getTopAnime();

        const upcomingResponse = await getUpcomingAnime();

        setTrending(trendingResponse.data.data);

        setUpcoming(upcomingResponse.data.data);

        setError(null);
      } catch (error) {
        console.error(error);

        setTrending([]);

        setUpcoming([]);

        setError("Unable to load anime.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <Loader fullScreen />;
  if (error) return <div className="container" style={{ paddingTop: '100px' }}><h2>Error loading data. Note: The free Jikan API might be rate-limiting you. Please try again in a few seconds.</h2></div>;

  const heroAnime = trending.length > 0 ? trending[0] : null;

  const sectionStyle = {
    padding: 'var(--spacing-2xl) 0',
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 'var(--spacing-xl)',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
    gap: '1.5rem',
  };

  const linkStyle = {
    color: 'var(--accent-cyan)',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontWeight: '600'
  };

  return (
    <div>
      <Hero anime={heroAnime} />

      <div className="container">


        {/* ===================== Trending ===================== */}
        <section style={sectionStyle}>
          <div style={headerStyle}>
            <h2>Trending Now</h2>
            <Link to="/trending" style={linkStyle}>
              View All <FaArrowRight />
            </Link>
          </div>

          <div
            style={{
              overflow: "hidden",
              width: "100%",
            }}
          >
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                repeat: Infinity,
                duration: 25,
                ease: "linear",
              }}
              style={{
                display: "flex",
                gap: "20px",
                width: "max-content",
              }}
            >
              {[...trending.slice(1, 13), ...trending.slice(1, 13)].map(
                (anime, index) => (
                  <div
                    key={`${anime.mal_id}-${index}`}
                    style={{
                      width: "220px",
                      flexShrink: 0,
                    }}
                  >
                    <AnimeCard anime={anime} />
                  </div>
                )
              )}
            </motion.div>
          </div>
        </section>

        {/* ===================== Upcoming ===================== */}
        <section style={sectionStyle}>
          <div style={headerStyle}>
            <h2>Upcoming Seasons</h2>
            <Link to="/upcoming" style={linkStyle}>
              View All <FaArrowRight />
            </Link>
          </div>

          <div
            style={{
              overflow: "hidden",
              width: "100%",
            }}
          >
            <motion.div
              animate={{ x: ["-50%", "0%"] }}
              transition={{
                repeat: Infinity,
                duration: 25,
                ease: "linear",
              }}
              style={{
                display: "flex",
                gap: "20px",
                width: "100%",
              }}
            >
              {[...upcoming.slice(0, 12), ...upcoming.slice(0, 12)].map(
                (anime, index) => (
                  <div
                    key={`${anime.mal_id}-${index}`}
                    style={{
                      width: "220px",
                      flexShrink: 0,
                    }}
                  >
                    <AnimeCard anime={anime} />
                  </div>
                )
              )}
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
