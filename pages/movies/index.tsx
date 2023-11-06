import InfoModal from "../../components/InfoModal";
import useInfoModal from "../../hooks/useInfoModal";

import MovieList from "../../components/MovieList";
import Navbar from "../../components/Navbar";
import useMovieList from "../../hooks/useMovieList";

const MoviesPage = () => {
  const { data: movies = [] } = useMovieList();
  const { isOpen, closeModal } = useInfoModal();

  return (
    <div className="h-full bg-zinc-950">
        <InfoModal visible={isOpen} onClose={closeModal} />
        <Navbar />
      <div className="pt-20">
        <MovieList title="Movies" data={movies} />
      </div>
    </div>
  );
};

export default MoviesPage;
