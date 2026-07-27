import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ScrollToTop from '../components/ScrollToTop';

const MainLayout = ({ children }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main style={{ flex: 1, position: 'relative' }}>
        {children}
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default MainLayout;
