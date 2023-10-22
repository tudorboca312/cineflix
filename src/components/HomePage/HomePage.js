import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard/MovieCard";
import "./HomePage.css";
import { AiFillStar } from "react-icons/ai";

function HomePage({
  movie,
  genre,
  action,
  adventure,
  animation,
  comedy,
  crime,
  documentary,
  drama,
  family,
  fantasy,
  history,
  horror,
  music,
  mystery,
  romance,
  sf,
  tv,
  thriller,
  war,
  western,
}) {
  const imgPath = "https://image.tmdb.org/t/p/original/";

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((currentIndex + 1) % movie.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [currentIndex, movie.length]);

  const numberToGenre = (arr) => {
    if (!arr) return null;
    const genreNames = [];
    arr.forEach((id) => {
      const genreObj = genre.find((g) => g.id === id);
      if (genreObj) {
        genreNames.push(genreObj.name);
      }
    });
    return genreNames.map((name, index) => <p key={index}>{name}</p>);
  };

  const moviesByGenre = {
    action: action,
    adventure: adventure,
    animation: animation,
    comedy: comedy,
    crime: crime,
    documentary: documentary,
    drama: drama,
    family: family,
    fantasy: fantasy,
    history: history,
    horror: horror,
    music: music,
    mystery: mystery,
    romance: romance,
    sf: sf,
    tv: tv,
    thriller: thriller,
    war: war,
    western: western,
  };

  const renderMoviesByGenre = (genreKey) => {
    if (!moviesByGenre[genreKey]) return null;

    return moviesByGenre[genreKey].map((film) => {
      return (
        <MovieCard
          movie={film}
          key={film.id}
          genre={genreKey}
          numberToGenre={numberToGenre}
        />
      );
    });
  };

  const renderSections = () => {
    return Object.keys(moviesByGenre).map((genreKey) => (
      <section className="movies--section" key={genreKey}>
        <h2 className="section--title">
          {genreKey.charAt(0).toUpperCase() + genreKey.slice(1)}
        </h2>
        <div className="container--cards">{renderMoviesByGenre(genreKey)}</div>
      </section>
    ));
  };

  return (
    <div className="big--container">
      <section
        className="big--poster"
        style={{
          backgroundImage: `url(${imgPath}${movie[currentIndex]?.backdrop_path})`,
        }}
      >
        <h1 className="movie--title">{movie[currentIndex]?.original_title}</h1>
        <h3 className="movie--description">{movie[currentIndex]?.overview}</h3>
        <p className="movie--ratting">
          <AiFillStar size="2rem" />
          {movie[currentIndex]?.vote_average}
          <span>/10</span>
        </p>
        <div className="genres">
          {numberToGenre(movie[currentIndex]?.genre_ids)}
        </div>
      </section>
      {renderSections()}
    </div>
  );
}

export default HomePage;
