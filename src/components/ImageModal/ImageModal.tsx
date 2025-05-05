import Modal from 'react-modal';
import css from './ImageModal.module.css';

Modal.setAppElement('#root');

type ImageModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  image: Image | null;
};

const ImageModal = ({ isOpen, onRequestClose, image }: ImageModalProps) => {
  if (!image) return null;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={css.modal}
      overlayClassName={css.overlay}
    >
      <img
        src={image.urls.regular}
        alt={image.alt_description || 'Image'}
        className={css.image}
      />
      <div className={css.info}>
        <p className={css.infoItem}>
          <strong>Author:</strong> {image.user.name}
        </p>
        <p className={css.infoItem}>
          <strong>Likes:</strong> {image.likes}
        </p>
        {(image.description || image.alt_description) && (
          <p className={css.infoItem}>
            <strong>Description:</strong>{' '}
            {image.description || image.alt_description}
          </p>
        )}
      </div>
    </Modal>
  );
};

export default ImageModal;
