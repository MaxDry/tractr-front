import { IGame } from "../../interfaces/game.interface";
import { dateTimeToDate } from "../../helpers/date.helper";
import Stars from "../../components/Stars";
import Modal from "../../components/Modal";
import { useState } from "react";
import VideoGameService from "../../services/video-game-service";
import GameDetails from "./GameDetails";
import Loader from "../../components/Loader";

interface IGameList {
  games: IGame[] | null;
}

const GameList: React.FC<IGameList> = ({ games }) => {
  const videoGameService = new VideoGameService();

  const [isOpen, setIsOpen] = useState(false);
  const [videoGame, setVideoGame] = useState<IGame | null>(null);

  const openModal = async (id: number) => {
    setIsOpen(true);
    const showVideoGame = await videoGameService.get(id);
    setVideoGame(showVideoGame);
  };

  const onClose = () => {
    setIsOpen(false);
    setVideoGame(null);
  };

  return (
    <div className="flex flex-wrap justify-center">
      <Modal isOpen={isOpen} onClose={onClose}>
        {videoGame ? <GameDetails videoGame={videoGame} /> : <Loader />}
      </Modal>
      {games ? (
        games.map((game: IGame) => {
          return (
            <div
              onClick={() => openModal(game.id)}
              key={game.slug}
              className="w-[45rem] bg-dark-light p-5 flex m-6 rounded-lg h-53 cursor-pointer"
            >
              <img
                className="w-1/2 object-cover rounded-xl h-48"
                src={game.image}
                alt={game.name}
              />
              <div className="w-1/2 ml-5">
                <h3 className="text-primary text-2xl font-Maloney  truncate w-72">
                  {game.name}
                </h3>
                <span className="text-gray-400">
                  {dateTimeToDate(new Date(game.releaseDate))}
                </span>
                <div className="flex mt-2">
                  <Stars note={game.rating} />
                  <span>{game.rating}</span>
                  <span className="text-sm">({game.ratingsCount})</span>
                </div>
                <div className="flex flex-wrap my-4">
                  {game.genres.map((genre) => (
                    <span
                      key={genre.slug}
                      className="bg-indigo-600 py-1 px-4 rounded-full m-1"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default GameList;
