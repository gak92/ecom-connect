import React from "react";
import { Link } from "react-router-dom";
import "./HeroBanner.css";

function HeroBanner() {
  return (
    <section className="hero-banner">
      {/* Background image */}
      <div className="hero-bg" />

      {/* Content overlay */}
      <div className="hero-content">
        <p className="hero-eyebrow">New Season Arrivals</p>
        <h1 className="hero-title">
          Shop the <span className="hero-highlight">Latest</span> Trends
        </h1>
        <p className="hero-subtitle">
          Discover curated collections across fashion, electronics, and more.
          Quality products, secure payments, fast delivery.
        </p>
        <div className="hero-actions">
          <Link to="/products" className="hero-btn hero-btn-primary">
            Shop Now
          </Link>
          <Link to="/products" className="hero-btn hero-btn-secondary">
            Explore All
          </Link>
        </div>

        {/* Quick badges */}
        <div className="hero-badges">
          <span className="hero-badge">🔒 Secure Payments</span>
          <span className="hero-badge">🚚 Fast Delivery</span>
          <span className="hero-badge">⭐ Top Rated</span>
        </div>
      </div>
    </section>
  );
}

export default HeroBanner;
