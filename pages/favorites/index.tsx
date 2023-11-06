import InfoModal from "../../components/InfoModal";
import useInfoModal from "../../hooks/useInfoModal";

import useFavorites from "../../hooks/useFavorites";
import MovieList from "../../components/MovieList";
import Navbar from "../../components/Navbar";

const FavoritesPage = () => {
  const { data: favorites } = useFavorites();
  const { isOpen, closeModal } = useInfoModal();

  return (
    <div className="h-full bg-zinc-950">
        <InfoModal visible={isOpen} onClose={closeModal} />
        <Navbar />
      <div className="pt-20">
        <MovieList title="Favorites" data={favorites} />
      </div>
    </div>
  );
};

export default FavoritesPage;
