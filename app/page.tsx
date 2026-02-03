"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import moviesData from "./data.json";

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
const genres = ["All", ...new Set(allMovies.map((m) => m.genre))];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [sortBy, setSortBy] = useState("rating"); // NEW: Sorting State

  // Filter Logic
  const filteredMovies = allMovies
    .filter((movie) => {
      const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGenre = selectedGenre === "All" || movie.genre === selectedGenre;
      return matchesSearch && matchesGenre;
    })
    .sort((a, b) => {
      // Sorting Logic
      if (sortBy === "rating") return b.rating - a.rating; // High to Low
      if (sortBy === "year") return b.release_year - a.release_year; // Newest First
      if (sortBy === "title") return a.title.localeCompare(b.title); // A-Z
      return 0;
    });

  return (
    <div className="flex flex-col min-h-screen bg-black text-white font-sans">
      <main className="flex-grow p-8">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <header className="mb-8 text-center">
            <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-red-600 mb-4">
              🎬 Movie Directory
            </h1>
            <p className="text-gray-400 text-lg">Find & Discover Top Rated Movies</p>
          </header>

          {/* Navigation to Top Rated */}
          <div className="flex justify-center mb-10">
             <Link href="/top-rated">
                <button className="bg-gray-800 border border-gray-700 hover:border-yellow-500 hover:text-yellow-400 text-white px-6 py-2 rounded-full transition-all shadow-lg flex items-center gap-2">
                  🏆 View Top Rated Collection
                </button>
             </Link>
          </div>

          {/* CONTROLS: Search, Filter, Sort */}
          <div className="flex flex-col md:flex-row gap-4 mb-10 justify-between items-center bg-gray-900/50 p-4 rounded-2xl border border-gray-800">
            
            {/* Search */}
            <input
              type="text"
              placeholder="Search movies..."
              className="p-3 rounded-xl bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-yellow-500 w-full md:w-1/3"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className="flex gap-4 w-full md:w-auto">
              {/* Genre Filter */}
              <select
                className="p-3 rounded-xl bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-yellow-500 cursor-pointer"
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
              >
                {genres.map((genre) => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>

              {/* NEW: Sort Dropdown */}
              <select
                className="p-3 rounded-xl bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-yellow-500 cursor-pointer"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="rating">Sort by: Rating ⭐</option>
                <option value="year">Sort by: Newest 📅</option>
                <option value="title">Sort by: Name (A-Z) 🔤</option>
              </select>
            </div>
          </div>

          {/* MOVIE GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMovies.map((movie, index) => (
              <Link href={`/${movie.id}`} key={movie.id} className="group block">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-yellow-500/10 hover:border-yellow-500/50 h-full flex flex-col"
                >
                  <div className="h-52 bg-gradient-to-t from-gray-900 via-gray-800 to-gray-700 flex items-center justify-center relative group-hover:from-gray-800 group-hover:to-gray-600 transition-colors">
                     <span className="text-6xl drop-shadow-2xl filter grayscale group-hover:grayscale-0 transition-all duration-300">🍿</span>
                  </div>

                  <div className="p-5 flex-grow">
                    <div className="flex justify-between items-start mb-3">
                      <h2 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors line-clamp-1">{movie.title}</h2>
                      <span className="bg-yellow-500 text-black text-xs px-2 py-1 rounded font-bold">
                        ★ {movie.rating}
                      </span>
                    </div>
                    
                    <div className="flex gap-2 mb-3 text-xs font-medium text-gray-400">
                       <span className="border border-gray-700 px-2 py-1 rounded">{movie.genre}</span>
                       <span className="border border-gray-700 px-2 py-1 rounded">{movie.release_year}</span>
                    </div>

                    <p className="text-gray-400 text-sm line-clamp-2 group-hover:text-gray-300">
                      {movie.description}
                    </p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>

          {filteredMovies.length === 0 && (
            <div className="text-center text-gray-500 mt-20 text-xl">No movies found matching your criteria.</div>
          )}
          
        </div>
      </main>

      {/* NEW: Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 py-8 mt-12 text-center text-gray-500 text-sm">
        <p>Built with Next.js, Tailwind & ❤️ by [Your Name]</p>
        <p className="mt-2">Data provided by AI Generation • © 2026 MovieDirectory</p>
      </footer>
    </div>
  );
}