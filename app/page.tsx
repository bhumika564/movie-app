"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import moviesData from "./data.json";
import { Movie } from "./type";

const allMovies = moviesData as unknown as Movie[];

// Naye JSON se unique genres nikalne ka logic
const genres = ["All", ...Array.from(new Set(allMovies.map((m) => m.genre)))];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [sortBy, setSortBy] = useState("rating");

  const filteredMovies = allMovies
    .filter((movie) => {
      const matchesSearch = movie.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGenre = selectedGenre === "All" || movie.genre === selectedGenre;
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
        <div className="max-w-[1600px] mx-auto">
          
          <header className="mb-12 text-center pt-10">
            <motion.h1 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-6xl md:text-8xl font-black tracking-tighter mb-4"
            >
              TOP <span className="text-[#D14D35]">250</span> MOVIES
            </motion.h1>
            <p className="text-gray-500 text-lg font-medium tracking-widest uppercase">Curated TMDB Collection</p>
          </header>

          {/* Search & Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-12 justify-between items-center bg-[#141414] p-6 rounded-[2.5rem] border border-white/5 shadow-2xl sticky top-4 z-50 backdrop-blur-xl">
            <input
              type="text"
              placeholder="Search movies..."
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
                <option value="rating">Top Rated ⭐</option>
                <option value="year">Latest Release 📅</option>
                <option value="title">Alphabetical A-Z 🔤</option>
              </select>
            </div>
          </div>

          {/* MOVIE GRID - Updated for 250 Movies */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {filteredMovies.map((movie, index) => (
              <Link href={`/${movie.id}`} key={movie.id} className="block group">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: (index % 12) * 0.03 }}
                  className="relative aspect-[2/3] rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/5 bg-[#1a1a1a]"
                >
                  <img 
                    src={movie.image_url} 
                    alt={movie.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  
                  {/* Subtle Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                  
                  {/* Rating Label */}
                  <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md border border-white/10 text-white w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm">
                    {movie.rating}
                  </div>

                  {/* Movie Info on Hover */}
                  <div className="absolute inset-0 p-6 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <h3 className="text-sm font-black uppercase leading-tight line-clamp-2">{movie.title}</h3>
                    <p className="text-[10px] font-bold text-[#D14D35] mt-1">{movie.genre}</p>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>

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