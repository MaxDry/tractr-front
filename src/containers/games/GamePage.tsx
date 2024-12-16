import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import VideoGameService from "../../services/video-game-service";
import { IGame, IGenre } from "../../interfaces/game.interface";
import GameList from "./GameList";
import GenreService from "../../services/genre-service";
import StarIcon from "@mui/icons-material/Star";

interface IFormInput {
  selectedGames: string[];
  minimumRating: number;
}

const GamePage: React.FC = () => {
  const videoGameService = new VideoGameService();
  const genreService = new GenreService();

  const [videoGames, setVideoGames] = useState<IGame[] | null>(null);
  const [genres, setGenres] = useState<IGenre[] | null>(null);

  const { register, handleSubmit, setValue, getValues, watch } =
    useForm<IFormInput>({
      defaultValues: {
        selectedGames: [],
        minimumRating: 1,
      },
    });

  const fetchVideoGames = async (queries = {}) => {
    const videoGames = await videoGameService.all(queries);
    setVideoGames(videoGames);
  };

  const fetchGenres = async () => {
    const genres = await genreService.all();
    setGenres(genres);
  };

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    const genresQueries = !!data.selectedGames.length
      ? data.selectedGames.join(",")
      : null;
    fetchVideoGames({
      genres: genresQueries,
      minimumRating: data.minimumRating,
    });
  };

  const handleAddGame = (gameSlug: string) => {
    const currentGames = getValues("selectedGames");
    if (!currentGames.includes(gameSlug)) {
      const newSelectedGames = [...currentGames, gameSlug];
      setValue("selectedGames", newSelectedGames);
    }
  };

  const handleRemoveGame = (gameName: string) => {
    const currentGames = getValues("selectedGames");
    const newSelectedGames = currentGames.filter((game) => game !== gameName);
    setValue("selectedGames", newSelectedGames);
  };

  useEffect(() => {
    fetchVideoGames();
    fetchGenres();
  }, []);

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex items-center">
          {genres && (
            <div className="flex items-center mx-4">
              <select
                id="game-select"
                onChange={(e) => handleAddGame(e.target.value)}
                className="border border-indigo-600 px-3 py-3 rounded-lg p-2 bg-dark-light"
              >
                {genres?.map((genre) => (
                  <option key={genre.slug} value={genre.slug}>
                    {genre.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="flex my-5 mx-4">
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-dark-light border rounded-s-md w-14">
              <StarIcon htmlColor="#faca14" />
            </span>
            <input
              type="number"
              min={1}
              max={5}
              className="rounded-none text-gray-100 rounded-e-lg bg-dark-light border text-gray-900 border-gray-300 p-2.5 dark:placeholder-gray-100 w-14"
              placeholder="1"
              {...register("minimumRating")}
            />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {watch("selectedGames").map((game) => (
            <div
              key={game}
              className="bg-indigo-600 rounded-full px-3 py-1 flex items-center gap-1 text-sm"
            >
              {game}
              <span
                className="cursor-pointer ml-2"
                onClick={() => handleRemoveGame(game)}
              >
                ✕
              </span>
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="mt-4 bg-primary text-black rounded py-2 px-4 text-lg"
        >
          Filtrer
        </button>
      </form>

      {<GameList games={videoGames} />}
    </div>
  );
};

export default GamePage;
