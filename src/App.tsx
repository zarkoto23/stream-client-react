import { useState, useEffect } from "react";
import VideoPlayer from "./components/VideoPlayer";

interface Movie {
  id: string;
  title: string;
  playlist: string;
}

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:3000/movies")
      .then((res) => res.json())
      .then(setMovies);
  }, []);

  return (
    <div>
      <h1>Моите филми</h1>
      <select onChange={(e) => setSelectedMovie(e.target.value)} value={selectedMovie || ""}>
        <option value="">Избери филм</option>
        {movies.map((movie) => (
          <option key={movie.id} value={movie.playlist}>
            {movie.title}
          </option>
        ))}
      </select>
      {selectedMovie && <VideoPlayer src={selectedMovie} />}
    </div>
  );
}

export default App;