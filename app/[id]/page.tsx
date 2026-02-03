import { Metadata } from "next";
import Link from "next/link";
import moviesData from "../data.json";
import { Movie } from "../type";
import { use } from "react";

interface Props {
  params: Promise<{ id: string }>;
}

const allMovies = moviesData as unknown as Movie[];

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const movie = allMovies.find((m) => String(m.id) === id);
  return {
    title: movie ? `${movie.title} | Movie Directory` : "Movie Not Found",
  };
}

export default function MovieDetail({ params }: Props) {
  const { id } = use(params);
  const movie = allMovies.find((m) => String(m.id) === id);

  if (!movie) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-10 font-sans">
        <h1 className="text-4xl font-black mb-4">404 - MOVIE NOT FOUND</h1>
        <Link href="/" className="text-[#D14D35] underline font-bold px-8 py-3 border border-[#D14D35] rounded-2xl hover:bg-[#D14D35] hover:text-white transition-all">
          Return to Directory
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-[#D14D35]">
      <div className="max-w-7xl mx-auto p-6 md:p-12">
        <Link 
          href="/" 
          className="inline-block mb-10 text-gray-500 hover:text-[#D14D35] transition-colors font-bold tracking-widest uppercase text-xs"
        >
          ← Back to Collection
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Poster Section */}
          <div className="lg:col-span-5">
            <div className="relative aspect-[2/3] rounded-[3rem] overflow-hidden shadow-2xl border border-white/5 shadow-[#D14D35]/10 group">
              <img 
                src={movie.image_url} 
                alt={movie.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute top-8 right-8 bg-white text-black w-16 h-16 rounded-2xl flex flex-col items-center justify-center shadow-2xl">
                <span className="text-xl font-black">{movie.rating}</span>
                <span className="text-[0.6rem] font-bold text-gray-400 uppercase">IMDB</span>
              </div>
            </div>
          </div>

          {/* Details Section */}
          <div className="lg:col-span-7 pt-6">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] mb-6 uppercase">
              {movie.title}
            </h1>
            
            <div className="flex flex-wrap gap-4 mb-8">
              <span className="px-6 py-2 rounded-full bg-[#D14D35] text-white font-bold text-xs uppercase tracking-widest">
                {movie.genre}
              </span>
              <span className="px-6 py-2 rounded-full bg-white/5 border border-white/10 text-gray-400 font-bold text-xs uppercase tracking-widest">
                {movie.release_year}
              </span>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-gray-500 font-black uppercase tracking-[0.3em] text-[0.65rem] mb-4">The Plot</h3>
                <p className="text-xl md:text-2xl text-gray-300 leading-relaxed font-medium">
                  {movie.description}
                </p>
              </div>

              {/* Action Buttons - AB YAHAN HAI BUTTONS */}
              <div className="flex flex-wrap gap-4 pt-4">
                <button className="flex-1 min-w-[180px] bg-[#D14D35] hover:bg-[#b03d28] text-white font-black py-5 rounded-[2rem] transition-all transform hover:scale-[1.02] active:scale-[0.98] uppercase tracking-tighter text-lg shadow-xl shadow-[#D14D35]/20">
                  Watch Now
                </button>
                <button className="flex-1 min-w-[180px] bg-white/5 hover:bg-white/10 border border-white/10 text-white font-black py-5 rounded-[2rem] transition-all transform hover:scale-[1.02] active:scale-[0.98] uppercase tracking-tighter text-lg backdrop-blur-md">
                  + Add to Watchlist
                </button>
              </div>

              <div className="pt-10 border-t border-white/5 flex gap-12">
                <div>
                  <p className="text-gray-500 font-black uppercase tracking-[0.2em] text-[0.6rem] mb-1">Quality</p>
                  <p className="text-lg font-bold">4K Ultra HD</p>
                </div>
                <div>
                  <p className="text-gray-500 font-black uppercase tracking-[0.2em] text-[0.6rem] mb-1">Language</p>
                  <p className="text-lg font-bold">English (EN)</p>
                </div>
                <div>
                  <p className="text-gray-500 font-black uppercase tracking-[0.2em] text-[0.6rem] mb-1">Audio</p>
                  <p className="text-lg font-bold">Dolby 7.1</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}