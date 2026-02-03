"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import moviesData from "./data.json";
import { Movie } from "./type"; // 👈 IMPORT ADD KAREIN (types.ts se)

// 1. Data ko "Movie" list ki tarah treat karein (Casting)
const allMovies = moviesData as unknown as Movie[];

// 2. Genres nikalne ka SAFE tareeka (Array.from use kiya)
const genres = ["All", ...Array.from(new Set(allMovies.map((m) => m.genre)))];

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
{/* DRIBBBLE INSPIRED 'BENTO' GRID */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
  {filteredMovies.map((movie, index) => (
    <Link href={`/${movie.id}`} key={movie.id} className="block group">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.1 }}
        className="bg-[#1a1a1a] rounded-[2.5rem] p-2 hover:scale-[1.02] transition-transform duration-500 shadow-2xl"
      >
        {/* Top Section: Image & Badges */}
        <div className="relative h-64 w-full rounded-[2rem] overflow-hidden mb-2">
          {/* Gradient Placeholder for Image */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900 group-hover:scale-105 transition-transform duration-700">
             {/* Real App mein yahan <Image /> hota */}
             <div className="flex items-center justify-center h-full text-8xl opacity-20">🎬</div>
          </div>
          
          {/* IMDB Rating Badge (Top Right - White Style) */}
          <div className="absolute top-4 right-4 flex flex-col items-center justify-center bg-[#e5e5e5] text-black w-16 h-16 rounded-2xl shadow-lg z-10">
            <span className="text-xl font-bold leading-none">{movie.rating}</span>
            <span className="text-[0.6rem] font-bold uppercase tracking-wider text-gray-500 mt-1">Rating</span>
          </div>

          {/* Age Rating Badge (Below IMDB - Grey Style) */}
          <div className="absolute top-24 right-4 flex items-center justify-center bg-[#2a2a2a]/80 backdrop-blur-sm text-gray-300 w-12 h-12 rounded-xl border border-white/10 z-10">
            <span className="text-sm font-bold">R</span>
          </div>

          {/* Play Button Overlay */}
          <div className="absolute bottom-4 left-4 bg-black/40 backdrop-blur-md p-3 rounded-full border border-white/20">
            <span className="text-white text-xl">▶</span>
          </div>
        </div>

        {/* Bottom Section: The Orange Card */}
        <div className="bg-[#D14D35] rounded-[2rem] p-6 text-white relative overflow-hidden group-hover:bg-[#e0553d] transition-colors">
          {/* Title */}
          <p className="text-xs font-medium text-white/80 uppercase tracking-widest mb-2">About Film</p>
          <h2 className="text-3xl font-bold leading-tight mb-3 font-sans">
            {movie.title}
          </h2>
          
          {/* Description */}
          <p className="text-white/90 text-sm line-clamp-3 mb-6 font-light leading-relaxed">
            {movie.description}
          </p>

          {/* Footer: Read More & Share */}
          <div className="flex justify-between items-center mt-auto">
            <button className="border border-white/40 px-6 py-2 rounded-full text-sm hover:bg-white hover:text-[#D14D35] transition-all font-medium">
              Read more
            </button>
            <div className="flex -space-x-2">
              {/* Dummy Cast Circles */}
              <div className="w-8 h-8 rounded-full bg-white/20 border border-white/10"></div>
              <div className="w-8 h-8 rounded-full bg-white/30 border border-white/10"></div>
              <div className="w-8 h-8 rounded-full bg-white/40 border border-white/10 flex items-center justify-center text-[0.6rem]">+3</div>
            </div>
          </div>
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