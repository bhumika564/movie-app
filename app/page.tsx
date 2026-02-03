"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import moviesData from "./data.json";
import { Movie } from "./type";

// Data casting
const allMovies = moviesData as unknown as Movie[];

// Genres list banane ka logic (Duplicate hatane ke liye)
const genres = ["All", ...Array.from(new Set(allMovies.map((m) => m.genre.split(',')[0].trim())))];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [sortBy, setSortBy] = useState("rating");

  // Search, Filter aur Sort logic
  const filteredMovies = allMovies
    .filter((movie) => {
      const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGenre = selectedGenre === "All" || movie.genre.includes(selectedGenre);
      return matchesSearch && matchesGenre;
    })
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "year") return b.release_year - a.release_year;
      if (sortBy === "title") return a.title.localeCompare(b.title);
      return 0;
    });

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-[#D14D35]">
      <main className="flex-grow p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Header Section */}
          <header className="mb-12 text-center pt-10">
            <motion.h1 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-6xl md:text-7xl font-black tracking-tighter mb-4"
            >
              MOVIE <span className="text-[#D14D35]">DIRECTORY</span>
            </motion.h1>
            <p className="text-gray-500 text-lg font-medium tracking-widest uppercase">Premium Film Collection 2026</p>
          </header>

          {/* Controls: Search, Filter & Sort */}
          <div className="flex flex-col md:flex-row gap-4 mb-12 justify-between items-center bg-[#141414] p-6 rounded-[2.5rem] border border-white/5 shadow-2xl">
            <input
              type="text"
              placeholder="Search by movie title..."
              className="p-4 rounded-2xl bg-[#1a1a1a] border border-white/5 text-white focus:outline-none focus:border-[#D14D35] w-full md:w-1/3 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <div className="flex gap-4 w-full md:w-auto">
              <select
                className="p-4 rounded-2xl bg-[#1a1a1a] border border-white/5 text-white focus:outline-none focus:border-[#D14D35] cursor-pointer"
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
              >
                {genres.map((genre) => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>

              <select
                className="p-4 rounded-2xl bg-[#1a1a1a] border border-white/5 text-white focus:outline-none focus:border-[#D14D35] cursor-pointer"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="rating">Rating ⭐</option>
                <option value="year">Newest 📅</option>
                <option value="title">A-Z 🔤</option>
              </select>
            </div>
          </div>

          {/* MOVIE GRID */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {filteredMovies.map((movie, index) => (
    <Link href={`/${movie.id}`} key={movie.id} className="block group">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05 }}
        className="bg-[#1a1a1a] rounded-[3rem] p-3 hover:scale-[1.01] transition-all duration-500 shadow-2xl border border-white/5"
      >
        {/* Image Section - Yahan Real Photo aayegi */}
<div className="relative aspect-[2/3] w-full rounded-[2.5rem] overflow-hidden mb-3">
  
  {/* Purane <img> tag ko hata kar ye wala paste karein 👇 */}
  <img 
    src={movie.image_url} 
    alt={movie.title}
    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
    onError={(e) => {
      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=500&auto=format&fit=crop";
    }}
  />
  {/* 👆 Yahan tak paste karein */}

  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
  
  <div className="absolute top-6 right-6 flex flex-col items-center justify-center bg-white text-black w-14 h-14 rounded-2xl shadow-xl z-10">
    <span className="text-lg font-black">{movie.rating}</span>
    <span className="text-[0.5rem] font-bold text-gray-400">IMDB</span>
  </div>
</div>

        {/* Bottom Section - Yahan Real Naam aayega */}
        <div className="bg-[#D14D35] rounded-[2.5rem] p-8 text-white min-h-[250px] flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-black leading-tight mb-3 uppercase">
              {movie.title}
            </h2>
            <p className="text-white/80 text-sm line-clamp-3 mb-4 font-medium">
              {movie.description}
            </p>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <span className="text-[0.6rem] font-bold text-white/50 uppercase">Release</span>
              <span className="font-bold">{movie.release_year}</span>
            </div>
            <div className="px-4 py-2 rounded-xl bg-black/20 text-[10px] font-bold border border-white/10 uppercase tracking-widest">
              {movie.genre.split(',')[0]}
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  ))}
</div>

          {/* Empty State */}
          {filteredMovies.length === 0 && (
            <div className="text-center py-40">
              <p className="text-gray-500 text-xl font-medium uppercase tracking-widest">No Movies Found</p>
            </div>
          )}
          
        </div>
      </main>

      <footer className="py-10 text-center opacity-30">
        <p className="text-[0.6rem] font-bold uppercase tracking-[0.5em]">Built with ❤️ by Bhumika</p>
      </footer>
    </div>
  );
}