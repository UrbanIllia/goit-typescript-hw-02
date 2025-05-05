import axios from 'axios';

const API_KEY = 'VEPpmBf4oR11VcFkJEGcKQisnNuyCRUJwSMju6f9N6w';
const BASE_URL = 'https://api.unsplash.com';

type Image = {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  alt_description: string | null;
  user: {
    name: string;
  };
  likes: number;
  description: string | null;
};

type UnsplashResponse = {
  results: Image[];
  total: number;
  total_pages: number;
};

export const fetchImages = async (
  query: string,
  page: number = 1
): Promise<UnsplashResponse> => {
  const response = await axios.get(`${BASE_URL}/search/photos`, {
    params: {
      query,
      page,
      per_page: 12,
      client_id: API_KEY,
    },
  });
  return response.data;
};
