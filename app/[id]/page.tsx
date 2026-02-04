"use client";

import { use } from "react";
import moviesData from "../data.json";
import { Movie } from "../type";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Bookmark, Star, ArrowLeft } from "lucide-react";

const allMovies = moviesData as unknown as Movie[];

export default function MovieDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const movie = allMovies.find((m) => m.id === parseInt(resolvedParams.id));

  if (!movie) return <div className="text-white text-center mt-20 font-black">MOVIE NOT FOUND</div>;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-[#00e054] selection:text-black">
      {/* Background Poster Blur */}
      <div className="fixed inset-0 z-0">
        <img src={movie.image_url} className="w-full h-full object-cover opacity-20 blur-3xl scale-110" alt="" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0a0a0a]" />
      </div>

      <main className="relative z-10 max-w-6xl mx-auto px-6 py-12 md:py-24">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#00e054] transition-colors mb-12 group">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-bold uppercase tracking-widest text-xs">Back to Diary</span>
        </Link>

        <div className="grid md:grid-cols-[350px_1fr] gap-12 items-start">
          {/* Movie Poster Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-[2.5rem] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10"
          >
            <img src={movie.image_url} alt={movie.title} className="w-full aspect-[2/3] object-cover" />
          </motion.div>

          {/* Info & Actions */}
          <div className="flex flex-col h-full justify-center">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h1 className="text-5xl md:text-7xl font-black italic uppercase leading-[0.8] mb-4 tracking-tighter">
                {movie.title}
              </h1>
              
              <div className="flex items-center gap-4 mb-8">
                <span className="bg-[#00e054] text-black px-3 py-1 rounded-lg font-black text-sm italic">
                  {movie.rating} IMDB
                </span>
                <span className="text-gray-400 font-bold uppercase tracking-widest text-sm">
                  {movie.genre} • {movie.release_year}
                </span>
              </div>

              <p className="text-xl text-gray-300 leading-relaxed mb-12 font-medium max-w-2xl">
                {movie.description}
              </p>

              {/* ACTION BUTTONS (The ones you wanted) */}
              <div className="flex flex-wrap gap-4">
                <button className="px-8 py-5 bg-[#00e054] text-black font-black rounded-2xl flex items-center gap-3 hover:scale-105 active:scale-95 transition-all uppercase tracking-tighter">
                  <Check size={20} strokeWidth={4} />
                  Watched it
                </button>

                <button className="px-8 py-5 bg-white/5 border border-white/10 text-white font-black rounded-2xl flex items-center gap-3 hover:bg-white/10 transition-all uppercase tracking-tighter">
                  <Bookmark size={20} fill="white" />
                  Save to List
                </button>

                <button className="p-5 bg-white/5 border border-white/10 text-[#00e054] rounded-2xl hover:bg-white/10 transition-all group">
                  <Star size={24} className="group-hover:rotate-12 transition-transform" />
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}