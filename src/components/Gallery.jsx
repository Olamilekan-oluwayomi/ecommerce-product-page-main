import { useState } from "react";
import "./Gallery.css";
import productImage1 from "../assets/image-product-1.jpg";
import productImage2 from "../assets/image-product-2.jpg";
import productImage3 from "../assets/image-product-3.jpg";
import productImage4 from "../assets/image-product-4.jpg";
import thumbnail1 from "../assets/image-product-1-thumbnail.jpg";
import thumbnail2 from "../assets/image-product-2-thumbnail.jpg";
import thumbnail3 from "../assets/image-product-3-thumbnail.jpg";
import thumbnail4 from "../assets/image-product-4-thumbnail.jpg";
import previousIcon from "../assets/icon-previous.svg";
import nextIcon from "../assets/icon-next.svg";
import closeIcon from "../assets/icon-close.svg";

function Gallery() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const images = [
    { main: productImage1, thumb: thumbnail1 },
    { main: productImage2, thumb: thumbnail2 },
    { main: productImage3, thumb: thumbnail3 },
    { main: productImage4, thumb: thumbnail4 },
  ];

  const handlePrevious = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  const handleLightboxPrevious = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleLightboxNext = () => {
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="gallery">
      {/* Main Image Container (Mobile) */}
      <div className="gallery__main-container">
        <button
          type="button"
          className="gallery__nav-button gallery__nav-button--prev"
          onClick={handlePrevious}
          aria-label="Previous image"
        >
          <img src={previousIcon} alt="" />
        </button>

        <button
          type="button"
          className="gallery__main-image-button"
          onClick={() => setIsLightboxOpen(true)}
          aria-label="Open lightbox gallery"
        >
          <img
            className="gallery__main-image"
            src={images[currentImageIndex].main}
            alt={`Product image ${currentImageIndex + 1}`}
          />
        </button>

        <button
          type="button"
          className="gallery__nav-button gallery__nav-button--next"
          onClick={handleNext}
          aria-label="Next image"
        >
          <img src={nextIcon} alt="" />
        </button>
      </div>

      {/* Thumbnails */}
      <div className="gallery__thumbnails">
        {images.map((image, index) => (
          <button
            key={index}
            type="button"
            className={`gallery__thumbnail ${
              index === currentImageIndex ? "gallery__thumbnail--active" : ""
            }`}
            onClick={() => handleThumbnailClick(index)}
            aria-label={`View product image ${index + 1}`}
            aria-current={index === currentImageIndex}
          >
            <img src={image.thumb} alt="" />
          </button>
        ))}
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div
          className="gallery__lightbox"
          onClick={() => setIsLightboxOpen(false)}
          role="presentation"
        >
          <div
            className="gallery__lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="gallery__lightbox-close"
              onClick={() => setIsLightboxOpen(false)}
              aria-label="Close lightbox"
            >
              <img src={closeIcon} alt="" />
            </button>

            <div className="gallery__lightbox-main-container">
              <button
                type="button"
                className="gallery__lightbox-nav-button gallery__lightbox-nav-button--prev"
                onClick={handleLightboxPrevious}
                aria-label="Previous image in lightbox"
              >
                <img src={previousIcon} alt="" />
              </button>

              <img
                className="gallery__lightbox-image"
                src={images[currentImageIndex].main}
                alt={`Product image ${currentImageIndex + 1}`}
              />

              <button
                type="button"
                className="gallery__lightbox-nav-button gallery__lightbox-nav-button--next"
                onClick={handleLightboxNext}
                aria-label="Next image in lightbox"
              >
                <img src={nextIcon} alt="" />
              </button>
            </div>

            {/* Lightbox Thumbnails */}
            <div className="gallery__lightbox-thumbnails">
              {images.map((image, index) => (
                <button
                  key={index}
                  type="button"
                  className={`gallery__lightbox-thumbnail ${
                    index === currentImageIndex
                      ? "gallery__lightbox-thumbnail--active"
                      : ""
                  }`}
                  onClick={() => handleThumbnailClick(index)}
                  aria-label={`View product image ${index + 1} in lightbox`}
                  aria-current={index === currentImageIndex}
                >
                  <img src={image.thumb} alt="" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gallery;
