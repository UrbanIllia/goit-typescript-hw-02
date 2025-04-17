import React from 'react';
import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css';

const ImageGallery = ({ images, onImageClick }) => {
  if (!images || images.length === 0) return null;

  return (
    <ul className={css.gallery}>
      {images.map((image, index) => (
        <li key={`${image.id}-${index}`} className={css.galleryItem}>
          <ImageCard image={image} onClick={() => onImageClick(image)} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
