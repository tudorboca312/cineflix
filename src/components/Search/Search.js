import React from "react";
import "./Search.css";
import SearchMovieCard from "../Header/SearchCard/SearchMovieCard";

function Search({ searchMovie, genre }) {
  const renderCard = () => {
    if (searchMovie.length === 0) {
      return (
        <h2 className="movie-not-found">Movie not found :/ Try another one!</h2>
      );
    }

    return searchMovie.map((movie) => {
      return (
        <SearchMovieCard
          key={movie.id}
          movie={movie}
          id={movie.id}
          genre={genre}
        />
      );
    });
  };

  return (
    <div className="search--container">
      <h1 className="resultTitle">Results for your search</h1>
      <section className="search--results--cards">{renderCard()}</section>
    </div>
  );
}

export default Search;
