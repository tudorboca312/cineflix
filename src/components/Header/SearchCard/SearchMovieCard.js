import React, { useState } from "react";
import Modal from "../../HomePage/MovieCard/Modal/Modal";
import "./SearchMovieCard.css";

function SearchMovieCard({ movie, genre }) {
  const imgPath = "https://image.tmdb.org/t/p/original/";
  const [modal, setModal] = useState(false);
  const [id, setId] = useState(0);

  const handleClick = () => {
    setId(movie.id);
    setModal(!modal);
  };

  const numberToGenre = (arr) => {
    if (!arr) return null;
    const genreNames = arr.map((id) => genre.find((g) => g.id === id)?.name);
    return genreNames.map((name, index) => <p key={index}>{name}</p>);
  };

  const renderImage = () => {
    if (!movie.poster_path) return null;
    return (
      <img
        src={`${imgPath}${movie.poster_path}`}
        alt={`${movie.title || movie.original_title} poster`}
        className="img--search"
      />
    );
  };

  const renderModal = () => {
    if (!modal) return null;
    return (
      <Modal
        movie={movie}
        genre={genre}
        id={id}
        numberToGenre={numberToGenre}
      />
    );
  };

  return (
    <div className="search--container--card" onClick={handleClick}>
      <div className="movie--card--2">{renderImage()}</div>
      {renderModal()}
    </div>
  );
}

export default SearchMovieCard;
