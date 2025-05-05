import css from './ImageCard.module.css';

type ImageCardProps = {
  image: Image;
  onClick: (image: Image) => void;
};

const ImageCard = ({ image, onClick }: ImageCardProps) => {
  return (
    <div className={css.card} onClick={() => onClick(image)}>
      <img
        src={image.urls.small}
        alt={image.alt_description || 'Image'}
        className={css.image}
      />
    </div>
  );
};

export default ImageCard;
