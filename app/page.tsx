"use client"; // Ye line batati hai ki hum is page par interactivity (state) use karenge

import { useState } from "react";
import moviesData from "./data.json";
import Link from "next/link";

// Agar aapne types.ts alag file rakhi hai to import karein, 
// warna neeche wala interface use karein:
interface Movie {
  id: number;
  title: string;
  genre: string;
  rating: number;
  release_year: number;
  description: string;
  image_url: string;
}

const allMovies: Movie[] = moviesData as Movie[];

// Saare unique genres nikal lete hain filter ke liye
const genres = ["All", ...new Set(allMovies.map((m) => m.genre))];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");

  // Ye logic movies ko filter karti hai based on Search + Genre
  const filteredMovies = allMovies.filter((movie) => {
    const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenre === "All" || movie.genre === selectedGenre;
    return matchesSearch && matchesGenre;
  });

  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Navigation Links */}
<div className="flex justify-center gap-4 mb-8">
  <button className="bg-yellow-500 text-black font-bold px-6 py-2 rounded-full cursor-default">
    All Movies
  </button>
  <Link href="/top-rated">
    <button className="bg-gray-800 text-white hover:bg-gray-700 px-6 py-2 rounded-full transition border border-gray-700">
      🏆 Top Rated
    </button>
  </Link>
</div>

        {/* SEARCH & FILTER SECTION */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 justify-center">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search movies..."
            className="p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-yellow-500 w-full md:w-96"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Genre Dropdown */}
          <select
            className="p-3 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-yellow-500"
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
          >
            {genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>

        {/* RESULTS COUNT */}
        <p className="mb-4 text-gray-500">
          Showing {filteredMovies.length} results
        </p>

        {/* MOVIE GRID START */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {filteredMovies.map((movie) => (
    <Link href={`/${movie.id}`} key={movie.id} className="group">
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-yellow-500/50 cursor-pointer h-full">

        {/* Fake Image Area - Gradient ke saath */}
        <div className="h-56 bg-gradient-to-t from-gray-900 via-gray-800 to-gray-700 flex items-center justify-center relative group-hover:from-gray-800 group-hover:to-gray-600 transition-colors">
           <span className="text-5xl drop-shadow-lg">🍿</span>
           {/* Hover karne par "View" badge dikhega */}
           <span className="absolute bottom-4 right-4 bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
             View Details
           </span>
        </div>

        <div className="p-5">
          <div className="flex justify-between items-start mb-2">
            <h2 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors">
              {movie.title}
            </h2>
            <span className="bg-yellow-500/10 text-yellow-500 text-xs px-2 py-1 rounded border border-yellow-500/20 font-bold">
              ★ {movie.rating}
            </span>
          </div>

          <span className="inline-block bg-gray-800 text-gray-400 text-xs px-2 py-1 rounded mb-3 border border-gray-700">
            {movie.genre}
          </span>

          <p className="text-gray-400 text-sm line-clamp-2 group-hover:text-gray-300">
            {movie.description}
          </p>
        </div>
      </div>
    </Link>
  ))}
</div>
{/* MOVIE GRID END */}

        {/* Agar koi movie na mile */}
        {filteredMovies.length === 0 && (
          <div className="text-center text-gray-500 mt-10">
            No movies found. Try a different search!
          </div>
        )}
        
      </div>
    </main>
  );
}