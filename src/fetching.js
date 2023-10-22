import axios from "axios";

const key = "3f1cc17f68ded756485bef4e9b28c184";

export const genres = [
  "action",
  "adventure",
  "animation",
  "comedy",
  "crime",
  "documentary",
  "drama",
  "family",
  "fantasy",
  "history",
  "horror",
  "music",
  "mystery",
  "romance",
  "sf",
  "tv",
  "thriller",
  "war",
  "western",
];

const genreIds = {
  action: 28,
  adventure: 12,
  animation: 16,
  comedy: 35,
  crime: 80,
  documentary: 99,
  drama: 18,
  family: 10751,
  fantasy: 14,
  history: 36,
  horror: 27,
  music: 10402,
  mystery: 9648,
  romance: 10749,
  sf: 878,
  tv: 10770,
  thriller: 53,
  war: 10752,
  western: 37,
};

export const fetchMoviesByGenre = async (genre) => {
  try {
    const response = await axios.get(
      "https://api.themoviedb.org/3/discover/movie",
      {
        params: {
          api_key: key,
          with_genres: genreIds[genre],
          sort_by: "popularity.desc",
          vote_count: {
            gte: 1000,
          },
        },
      }
    );
    return response.data.results;
  } catch (error) {
    console.error(error);
    return [];
  }
};
