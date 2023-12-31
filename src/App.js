import "./App.css";
import Header from "./components/Header/Header";
import HomePage from "./components/HomePage/HomePage";
import axios from "axios";
import { useEffect, useState } from "react";
import { genres, fetchMoviesByGenre } from "./fetching";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Search from "./components/Search/Search";
import ErrorBoundary from "./components/HomePage/ErrorBoundary";

function App() {
  const key = process.env.REACT_APP_API_KEY;

  const [movie, setMovie] = useState([]);
  const [genre, setGenre] = useState({});
  const [searchMovie, setSearchMovie] = useState([]);
  const [moviesByGenre, setMoviesByGenre] = useState({});

  const fetchGenre = async () => {
    axios
      .get("https://api.themoviedb.org/3/genre/movie/list", {
        params: {
          api_key: key,
          language: "en-US",
        },
      })
      .then((response) => {
        setGenre(response.data.genres);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const fetchSearch = async (searchInput) => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=${searchInput}`
      )
      .then((response) => {
        setSearchMovie(response.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const fetchPopularMovies = async () => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=1`
      )
      .then((data) => {
        setMovie(data.data.results);
      });
  };

  const fetchMoviesByAllGenres = async () => {
    const movies = {};

    for (const genre of genres) {
      movies[genre] = await fetchMoviesByGenre(genre);
    }

    setMoviesByGenre(movies);
  };

  useEffect(() => {
    fetchPopularMovies();
    fetchGenre();
    fetchMoviesByAllGenres();
  }, []);

  return (
    <BrowserRouter>
      <div className="app">
        <Header fetchSearch={fetchSearch} />
        <Routes>
          <Route
            path="/cineflix"
            element={
              <ErrorBoundary>
                <HomePage movie={movie} genre={genre} {...moviesByGenre} />
              </ErrorBoundary>
            }
          />
          <Route
            path="/search"
            element={<Search searchMovie={searchMovie} genre={genre} />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
