import axios from 'axios';

const PEXELS_API_URL = 'https://api.pexels.com/v1/search';
const PEXELS_API_KEY = import.meta.env.VITE_PEXELS_API_KEY;

export const fetchImageFromPexels = async (query: string) => {
  try {
    const response = await axios.get<{ photos: { src: { medium: string } }[] }>(PEXELS_API_URL, {
      headers: {
        Authorization: PEXELS_API_KEY,
      },
      params: {
        query,
        per_page: 1,
      },
    });
    const photos = response.data.photos;
    return photos.length > 0 ? photos[0].src.medium : null;
  } catch (error) {
    console.error('Error fetching image from Pexels:', error);
    return null;
  }
};
