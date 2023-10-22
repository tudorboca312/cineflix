import React from "react";
import "./MovieCard.css";
import Modal from "./Modal/Modal";
import { useState } from "react";

function MovieCard({ movie, genre, numberToGenre }) {
  const imgPath = "https://image.tmdb.org/t/p/w500/";

  const [modal, setModal] = useState(false);
  const [id, setId] = useState(0);

  const handleClick = () => {
    setId(movie.id);
    setModal(!modal);
  };

  return (
    <div className="card--container" onClick={handleClick}>
      <div className="movie--card">
        {movie.poster_path ? (
          <img
            src={`${imgPath}${movie.poster_path}`}
            alt="movie poster"
            className="img--poster"
          />
        ) : null}
      </div>
      {modal ? (
        <Modal
          movie={movie}
          genre={genre}
          id={id}
          numberToGenre={numberToGenre}
        />
      ) : null}
    </div>
  );
}

export default MovieCard;
