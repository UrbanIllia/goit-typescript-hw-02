import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import ImageSearchBar from './components/ImageSearchBar/ImageSearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import ImageModal from './components/ImageModal/ImageModal';
import { fetchImages } from './api/unsplash';
import css from './App.module.css';

const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSearch = async (newQuery) => {
    setQuery(newQuery);
    setImages([]);
    setPage(1);
    setError(null);
    setIsLoading(true);
    try {
      const data = await fetchImages(newQuery, 1);
      setImages(data.results);
      if (data.results.length === 0) {
        toast.error('No images found for your query.');
      }
    } catch (err) {
      setError('Failed to fetch images. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = async () => {
    const nextPage = page + 1;
    setPage(nextPage);
    setIsLoading(true);
    try {
      const data = await fetchImages(query, nextPage);
      setImages((prevImages) => [...prevImages, ...data.results]);
      if (data.results.length === 0) {
        toast.error('In short, there is nothing more to upload!');
      }
    } catch (err) {
      setError('Failed to fetch images. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = (image) => {
    setSelectedImage(image);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedImage(null);
  };

  return (
    <div className={css.container}>
      <Toaster position="top-right" />
      <ImageSearchBar onSubmit={handleSearch} />
      {error && <ErrorMessage message={error} />}
      <ImageGallery images={images} onImageClick={openModal} />
      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      <ImageModal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        image={selectedImage}
      />
    </div>
  );
};

export default App;
