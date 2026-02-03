import Link from "next/link";
import moviesData from "../data.json"; 
import { Movie } from "../type";

export async function generateStaticParams() {
  const movies = moviesData as Movie[];
  return movies.map((movie) => ({
    id: movie.id.toString(),
  }));
}

export default async function MovieDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const movies = moviesData as Movie[];
  const movie = movies.find((m) => m.id.toString() === id);

  if (!movie) {
    return <div className="text-white text-center mt-20 font-bold text-2xl selection:bg-[#D14D35]">Movie Not Found</div>;
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white flex justify-center py-12 md:py-20 px-4 selection:bg-[#D14D35]">
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* LEFT SIDE: POSTER AREA (Fixed Image Logic) */}
        <div className="relative h-[550px] md:h-[700px] w-full bg-[#1a1a1a] rounded-[3rem] border border-white/5 shadow-2xl overflow-hidden group">
          <img 
            src={movie.image_url} 
            alt={movie.title}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          {/* Bottom Gradient for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90"></div>
          
          {/* Floating Rating Badge */}
          <div className="absolute bottom-10 left-10 bg-white text-black px-6 py-3 rounded-[1.5rem] font-black text-2xl shadow-2xl">
            ★ {movie.rating}
          </div>
        </div>

        {/* RIGHT SIDE: INFORMATION */}
        <div className="flex flex-col space-y-8">
          <Link href="/" className="text-gray-500 hover:text-[#D14D35] font-bold uppercase tracking-[0.3em] text-xs transition-colors">
            ← Back to Gallery
          </Link>

          <div>
            <h1 className="text-6xl md:text-7xl font-black leading-none mb-6 tracking-tighter uppercase">
              {movie.title}
            </h1>
            
            <div className="flex flex-wrap gap-3">
              {movie.genre.split(',').map((g) => (
                <span key={g} className="bg-[#D14D35]/10 text-[#D14D35] border border-[#D14D35]/20 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">
                  {g.trim()}
                </span>
              ))}
              <span className="text-gray-500 font-bold px-4 py-1.5 tracking-widest text-xs uppercase self-center">
                Released: {movie.release_year}
              </span>
            </div>
          </div>

          <div className="bg-[#141414] p-8 rounded-[2.5rem] border border-white/5">
            <h3 className="text-[#D14D35] text-xs font-bold uppercase tracking-[0.3em] mb-4">Plot Summary</h3>
            <p className="text-gray-400 leading-relaxed text-lg font-medium">
              {movie.description}
            </p>
          </div>

          <div className="flex gap-4 pt-4">
            <button className="flex-1 bg-white text-black font-black py-5 rounded-[1.5rem] hover:bg-[#D14D35] hover:text-white transition-all duration-300 uppercase tracking-widest text-sm">
              Watch Trailer
            </button>
            <button className="flex-1 border border-white/10 text-white font-black py-5 rounded-[1.5rem] hover:bg-white/5 transition-all uppercase tracking-widest text-sm">
              Watchlist +
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}