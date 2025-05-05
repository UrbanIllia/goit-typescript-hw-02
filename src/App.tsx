import React, { useState, useEffect } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import ImageSearchBar from './components/ImageSearchBar/ImageSearchBar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import ImageModal from './components/ImageModal/ImageModal';
import { fetchImages } from './api/unsplash';
import css from './App.module.css';
import { Image } from './types';

type AppState = {
  query: string;
  images: Image[];
  page: number;
  isLoading: boolean;
  error: string | null;
  modalIsOpen: boolean;
  selectedImage: Image | null;
};

const App = () => {
  const [state, setState] = useState<AppState>({
    query: '',
    images: [],
    page: 1,
    isLoading: false,
    error: null,
    modalIsOpen: false,
    selectedImage: null,
  });

  useEffect(() => {
    if (!state.query) return;

    const fetchData = async () => {
      setState((prev) => ({ ...prev, isLoading: true }));
      try {
        const data = await fetchImages(state.query, state.page);
        setState((prev) => ({
          ...prev,
          images:
            state.page === 1 ? data.results : [...prev.images, ...data.results],
          error:
            data.results.length === 0
              ? 'No images found for your query.'
              : null,
        }));
        if (data.results.length === 0) {
          toast.error('No images found for your query.');
        }
      } catch (err) {
        setState((prev) => ({
          ...prev,
          error: 'Failed to fetch images. Please try again later.',
        }));
      } finally {
        setState((prev) => ({ ...prev, isLoading: false }));
      }
    };

    fetchData();
  }, [state.query, state.page]);

  const handleSearch = (newQuery: string) => {
    setState((prev) => ({
      ...prev,
      query: newQuery,
      images: [],
      page: 1,
      error: null,
    }));
  };

  const handleLoadMore = () => {
    setState((prev) => ({ ...prev, page: prev.page + 1 }));
  };

  const openModal = (image: Image) => {
    setState((prev) => ({ ...prev, selectedImage: image, modalIsOpen: true }));
  };

  const closeModal = () => {
    setState((prev) => ({ ...prev, modalIsOpen: false, selectedImage: null }));
  };

  return (
    <div className={css.container}>
      <Toaster position="top-right" />
      <ImageSearchBar onSubmit={handleSearch} />
      {state.error && <ErrorMessage message={state.error} />}
      <ImageGallery images={state.images} onImageClick={openModal} />
      {state.isLoading && <Loader />}
      {state.images.length > 0 && !state.isLoading && (
        <LoadMoreBtn onClick={handleLoadMore} />
      )}
      <ImageModal
        isOpen={state.modalIsOpen}
        onRequestClose={closeModal}
        image={state.selectedImage}
      />
    </div>
  );
};

export default App;
