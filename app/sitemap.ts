import { MetadataRoute } from 'next';
import moviesData from './data.json';
import { Movie } from './type'; // Yahan 'types' ki jagah 'type' kar diya

const baseUrl = 'https://movie-app-chi-dun.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
  // Data ko Cast kar rahe hain taaki error na aaye
  const allMovies = moviesData as unknown as Movie[];

  const movieUrls = allMovies.map((movie) => ({
    url: `${baseUrl}/${movie.id}`,
    lastModified: new Date(),
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/top-rated`,
      lastModified: new Date(),
    },
    ...movieUrls,
  ];
}