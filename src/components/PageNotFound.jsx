import React from 'react';
import '../assets/PageNotFound.css';
import { Link } from 'react-router-dom';
import WallpaperLogo from '../../public/favicon.png';

const PageNotFound = () => {
  return (
    <section className="page-not-found">
      <div className="content">
        <img
          src={WallpaperLogo}
          alt="Wallpaper Logo"
          className="wallpaper-logo"
        />
        <h1>404</h1>
        <h2>ERROR</h2>
        <p className="subtitle">This wall seems empty…</p>
        <p className="description">
          The page you're looking for doesn't exist. Let's help you redecorate—go back to our homepage.
        </p>
        <Link to="/" className="home-button">Return Home</Link>
      </div>
    </section>
  );
};

export default PageNotFound;
