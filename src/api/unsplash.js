import axios from 'axios';

const API_KEY = 'VEPpmBf4oR11VcFkJEGcKQisnNuyCRUJwSMju6f9N6w';
const BASE_URL = 'https://api.unsplash.com';

export const fetchImages = async (query, page = 1) => {
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
