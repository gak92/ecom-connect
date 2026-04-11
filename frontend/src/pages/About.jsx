import React from "react";
import "./About.css";
import PageTitle from "../components/PageTitle";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import StorefrontIcon from "@mui/icons-material/Storefront";
import VerifiedIcon from "@mui/icons-material/Verified";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import HeadsetMicIcon from "@mui/icons-material/HeadsetMic";

function About() {
  return (
    <>
      <PageTitle title="About Us" />
      <Navbar />

      {/* Hero */}
      <section className="about-hero">
        <div className="about-hero-content">
          <StorefrontIcon className="about-hero-icon" />
          <h1>About Our Store</h1>
          <p>
            We are a passionate team building a seamless, secure, and joyful
            shopping experience — from browse to doorstep.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="about-section">
        <div className="about-card">
          <h2>Our Mission</h2>
          <p>
            Our mission is to make high-quality products accessible to everyone.
            We believe shopping online should feel safe, fast, and rewarding.
            Every feature we build — from secure payments to real-time order
            tracking — is designed with you in mind.
          </p>
        </div>
      </section>

      {/* Value Cards */}
      <section className="about-values">
        <h2 className="about-values-title">Why Shop With Us?</h2>
        <div className="about-values-grid">
          <div className="about-value-card">
            <VerifiedIcon className="value-icon" />
            <h3>Verified Quality</h3>
            <p>
              Every product is reviewed and vetted before it appears on our
              shelves.
            </p>
          </div>
          <div className="about-value-card">
            <LocalShippingIcon className="value-icon" />
            <h3>Fast Delivery</h3>
            <p>
              We partner with reliable couriers to get your orders to you
              quickly.
            </p>
          </div>
          <div className="about-value-card">
            <HeadsetMicIcon className="value-icon" />
            <h3>24/7 Support</h3>
            <p>
              Our support team is always here to help with any questions or
              issues.
            </p>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="about-section">
        <div className="about-card">
          <h2>Built With Passion</h2>
          <p>
            This store was built as a full-stack MERN application using React,
            Redux Toolkit, Node.js, Express, and MongoDB. Payments are securely
            handled by Stripe and images are stored on Cloudinary. Every line of
            code reflects a commitment to quality, security, and a great user
            experience.
          </p>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default About;
