export interface IGame {
  id: number;
  name: string;
  slug: string;
  image: string;
  rating: number;
  ratingsCount: number;
  releaseDate: string;
  genres: IGenre[];
}

export interface IGenre {
  id: number;
  name: string;
  slug: string;
}
