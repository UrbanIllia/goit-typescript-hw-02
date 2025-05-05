import ImageCard from '../ImageCard/ImageCard';
import css from './ImageGallery.module.css';
import { Image } from '../../types';

type ImageGalleryProps = {
  images: Image[];
  onImageClick: (image: Image) => void;
};

const ImageGallery = ({ images, onImageClick }: ImageGalleryProps) => {
  if (!images || images.length === 0) return null;

  return (
    <ul className={css.gallery}>
      {images.map((image, index) => (
        <li key={`${image.id}-${index}`} className={css.galleryItem}>
          <ImageCard image={image} onClick={onImageClick} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
