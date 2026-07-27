import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Loader from '../components/Loader';

// Lazy loading pages
const Home = React.lazy(() => import('../pages/Home'));
const AnimeDetails = React.lazy(() => import('../pages/AnimeDetails'));
const Trending = React.lazy(() => import('../pages/Trending'));
const TopRated = React.lazy(() => import('../pages/TopRated'));
const Upcoming = React.lazy(() => import('../pages/Upcoming'));
const Genres = React.lazy(() => import('../pages/Genres'));
const Search = React.lazy(() => import('../pages/Search'));
const Favorites = React.lazy(() => import('../pages/Favorites'));
const About = React.lazy(() => import('../pages/About'));
const Contact = React.lazy(() => import('../pages/Contact'));
const NotFound = React.lazy(() => import('../pages/NotFound'));

const AppRoutes = () => {
  return (
    <Router>
      <MainLayout>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/anime/:id" element={<AnimeDetails />} />
            <Route path="/trending" element={<Trending />} />
            <Route path="/top-rated" element={<TopRated />} />
            <Route path="/upcoming" element={<Upcoming />} />
            <Route path="/genres" element={<Genres />} />
            <Route path="/search" element={<Search />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </MainLayout>
    </Router>
  );
};

export default AppRoutes;
