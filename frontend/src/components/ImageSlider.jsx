import React, { useEffect, useState } from "react";
import "../componentStyles/ImageSlider.css";

const images = [
  "./images/banner1.png",
  "./images/banner2.png",
  "./images/banner3.png",
  "./images/banner4.png",
];

function ImageSlider() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlideIndex((current) => (current + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="image-slider-container">
      <div
        className="slider-images"
        style={{ transform: `translateX(-${currentSlideIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <div className="slider-item" key={index}>
            <img src={image} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </div>

      <div className="slider-dots">
        {images.map((_, index) => (
          <span
            className={`dot ${index === currentSlideIndex ? "active" : ""}`}
            onClick={() => setCurrentSlideIndex(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default ImageSlider;
