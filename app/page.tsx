"use client";

import { useState, useMemo, useEffect } from "react";
import { Check, Bookmark } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import moviesData from "./data.json";
import { Movie } from "./type";

const allMovies = moviesData as unknown as Movie[];
const genres = ["All", ...Array.from(new Set(allMovies.map((m) => m.genre)))];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [sortBy, setSortBy] = useState("rating");

  const filteredMovies = useMemo(() => {
    return allMovies
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
  }, [searchTerm, selectedGenre, sortBy]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedGenre, sortBy]);

  return (
    <div className="flex flex-col min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-[#00e054] selection:text-black">
      
      {/* --- HERO SECTION --- */}
      <section className="relative py-28 px-6 flex flex-col items-center justify-center text-center bg-[#0a0a0a] overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-6xl z-10"
        >
          <p className="text-[#00e054] font-black tracking-[0.6em] uppercase text-xs mb-6">
            Your Personal
          </p>
          
          <h1 className="text-6xl md:text-8xl lg:text-[11rem] font-black tracking-tighter leading-[0.8] mb-12 italic uppercase text-white">
            MOVIE <br /> <span className="text-[#00e054]">DIARY</span>
          </h1>

          <div className="flex flex-col items-center gap-8 mt-6">
            <h2 className="text-xl md:text-3xl text-gray-400 font-medium max-w-3xl leading-tight">
              Discover movies. Remember every story. <br />
              Recommend what moved you.
            </h2>

            <Link href="#">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-8 px-14 py-6 bg-[#00e054] text-[#0a0a0a] font-black text-2xl rounded-2xl shadow-[0_10px_50px_rgba(0,224,84,0.3)] uppercase tracking-tighter transition-shadow hover:shadow-[#00e054]/50"
              >
                Let's get started — it's free!
              </motion.button>
            </Link>
          </div>
        </motion.div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[800px] bg-[radial-gradient(circle_at_center,_#00e05408_0%,_transparent_70%)] -z-0" />
      </section>

      {/* --- COLLECTION HEADER --- */}
      <div className="max-w-[1600px] mx-auto w-full px-8 mb-10 flex items-center gap-6">
        <h3 className="text-white font-black uppercase tracking-[0.2em] text-sm whitespace-nowrap">
          Collection
        </h3>
        <div className="h-[1px] flex-grow bg-white/10" />
        <span className="text-[#00e054] font-black text-sm whitespace-nowrap uppercase tracking-widest bg-white/5 px-4 py-2 rounded-lg">
          {filteredMovies.length} TITLES
        </span>
      </div>

      {/* --- FILTERS & SEARCH --- */}
      <main className="flex-grow p-4 md:p-8">
        <div className="max-w-[1600px] mx-auto">
          <div className="flex flex-col md:flex-row gap-4 mb-12 justify-between items-center bg-[#141414]/90 p-6 rounded-[2.5rem] border border-white/5 shadow-2xl sticky top-6 z-50 backdrop-blur-xl">
            <input
              type="text"
              placeholder="Search by title..."
              className="p-4 rounded-2xl bg-[#1a1a1a] border border-white/5 text-white focus:outline-none focus:border-[#00e054] w-full md:w-1/3 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="flex gap-4 w-full md:w-auto">
              <select
                className="p-4 rounded-2xl bg-[#1a1a1a] border border-white/5 text-white focus:outline-none focus:border-[#00e054] cursor-pointer"
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
              >
                {genres.map((genre) => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
              <select
                className="p-4 rounded-2xl bg-[#1a1a1a] border border-white/5 text-white focus:outline-none focus:border-[#00e054] cursor-pointer"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="rating">Highest Rated</option>
                <option value="year">Newest First</option>
                <option value="title">A to Z</option>
              </select>
            </div>
          </div>

          {/* --- GRID --- */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredMovies.map((movie, index) => (
                <Link href={`/${movie.id}`} key={movie.id} className="block group">
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: (index % 12) * 0.02 }}
                    className="relative aspect-[2/3] rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/5 bg-[#1a1a1a]"
                  >
                    <img src={movie.image_url} alt={movie.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" loading="lazy" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />
                    <div className="absolute top-5 right-5 bg-[#00e054] text-[#0a0a0a] w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs">
                      {movie.rating}
                    </div>
                    <div className="absolute inset-0 p-6 flex flex-col justify-end translate-y-6 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                      <h3 className="text-sm font-black uppercase italic leading-tight">{movie.title}</h3>
                      <p className="text-[10px] font-bold text-[#00e054] mt-1 tracking-widest uppercase">{movie.genre}</p>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </main>

      <footer className="py-20 text-center opacity-40 border-t border-white/5 mt-20">
        <p className="text-[#00e054] font-black text-2xl italic">MOVIE DIARY</p>
        <p className="text-[0.6rem] font-bold uppercase tracking-[0.5em] mt-4">Built with love by Bhumika</p>
      </footer>
    </div>
  );
}