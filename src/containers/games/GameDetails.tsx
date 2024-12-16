import { dateTimeToDate } from "../../helpers/date.helper";
import { IGame } from "../../interfaces/game.interface";

interface GameDetailsProps {
  videoGame: IGame;
}

const GameDetails: React.FC<GameDetailsProps> = ({ videoGame }) => {
  return (
    <div className="flex flex-col bg-dark border-2 border-primary p-8 rounded-xl shadow-lg max-w-lg w-full relative">
      <span>{videoGame.name}</span>
      <span>rating: {videoGame.rating}</span>
      <span>rating count: {videoGame.ratingsCount}</span>
      <span>rating: {videoGame.name}</span>
      <span>
        releaseDate: {dateTimeToDate(new Date(videoGame.releaseDate))}
      </span>
      <div className="flex flex-wrap my-4">
        {videoGame.genres.map((genre) => (
          <span
            key={genre.slug}
            className="bg-indigo-600 py-1 px-4 rounded-full m-1"
          >
            {genre.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default GameDetails;
