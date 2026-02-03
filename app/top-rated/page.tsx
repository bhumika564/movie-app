import Link from "next/link";
import moviesData from "../data.json"; // Data import
import { Movie } from "../type";         // Types import

const allMovies = moviesData as Movie[];

// Sirf 8.5 se upar wali movies filter karo
const topMovies = allMovies.filter((movie) => movie.rating >= 8.5);

export default function TopRated() {
  return (
    <main className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        
        {/* Header with Navigation */}
        <header className="mb-10 flex justify-between items-center border-b border-gray-800 pb-6">
          <div>
            <h1 className="text-4xl font-bold text-yellow-400 mb-2">
              🏆 Top Rated Gems
            </h1>
            <p className="text-gray-400">Movies with 8.5+ Rating</p>
          </div>
          <Link href="/" className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition">
            ← Back to All Movies
          </Link>
        </header>

        {/* Grid (Same styling as Home) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topMovies.map((movie) => (
            <Link href={`/${movie.id}`} key={movie.id} className="group">
              <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-yellow-500/20 hover:border-yellow-500/50 cursor-pointer h-full">
                
                <div className="h-48 bg-gradient-to-tr from-yellow-900 to-gray-900 flex items-center justify-center relative">
                   <span className="text-5xl drop-shadow-lg">🌟</span>
                   <div className="absolute top-2 right-2 bg-yellow-500 text-black font-bold px-2 py-1 rounded text-xs">
                     TOP PICK
                   </div>
                </div>

                <div className="p-5">
                  <h2 className="text-xl font-bold text-white group-hover:text-yellow-400">
                    {movie.title}
                  </h2>
                  <p className="text-yellow-500 font-bold mt-1">★ {movie.rating}/10</p>
                  <p className="text-gray-400 text-sm mt-2 line-clamp-2">
                    {movie.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </main>
  );
}