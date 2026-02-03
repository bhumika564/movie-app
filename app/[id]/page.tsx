import Link from "next/link";
import moviesData from "../data.json"; // Data import
import { Movie } from "../type";         // Types import

// Ye Next.js ko batata hai ki kitne pages banane hain (Assignment requirement)
export async function generateStaticParams() {
  const movies = moviesData as Movie[];
  return movies.map((movie) => ({
    id: movie.id.toString(),
  }));
}

// Main Detail Page Component
export default async function MovieDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const movies = moviesData as Movie[];
  const movie = movies.find((m) => m.id.toString() === id);

  if (!movie) {
    return <div className="text-white text-center mt-20">Movie Not Found</div>;
  }

  return (
    <main className="min-h-screen bg-black text-white flex justify-center py-20 px-4">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* Left Side: Big Image Area */}
        <div className="relative h-[500px] bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl border border-gray-800 shadow-2xl flex items-center justify-center group overflow-hidden">
          <span className="text-9xl transform group-hover:scale-110 transition-transform duration-500">🍿</span>
          {/* Overlay effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        </div>

        {/* Right Side: Information */}
        <div className="flex flex-col justify-center space-y-6">

          {/* Back Button */}
          <Link href="/" className="inline-flex items-center text-gray-400 hover:text-yellow-400 transition-colors w-fit">
            ← Back to Directory
          </Link>

          {/* Title & Stats */}
          <div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200 mb-4">
              {movie.title}
            </h1>
            <div className="flex flex-wrap gap-4 text-sm font-medium">
              <span className="bg-yellow-500 text-black px-3 py-1 rounded-full">
                ★ {movie.rating}/10
              </span>
              <span className="bg-gray-800 border border-gray-700 text-gray-300 px-3 py-1 rounded-full">
                {movie.genre}
              </span>
              <span className="text-gray-500 flex items-center">
                Released: {movie.release_year}
              </span>
            </div>
          </div>

          {/* Description */}
          <div className="bg-gray-900/50 p-6 rounded-xl border border-gray-800">
            <h3 className="text-lg font-bold text-white mb-2">Plot Summary</h3>
            <p className="text-gray-300 leading-relaxed text-lg">
              {movie.description}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-4">
            <button className="bg-yellow-500 text-black font-bold py-4 px-8 rounded-xl hover:bg-yellow-400 transition-transform hover:-translate-y-1 shadow-lg shadow-yellow-500/20">
              Watch Now
            </button>
            <button className="border border-gray-700 text-white font-bold py-4 px-8 rounded-xl hover:bg-gray-800 transition-colors">
              Add to Watchlist +
            </button>
          </div>

        </div>
      </div>
    </main>
  );
}