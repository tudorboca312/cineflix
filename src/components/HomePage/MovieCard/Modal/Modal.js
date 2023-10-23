// Modal.js
import React from "react";
import "./Modal.css";
import { AiFillStar } from "react-icons/ai";
import { Button } from "@mui/material";
import axios from "axios";

function Modal({ movie, genre, id, numberToGenre }) {
  const key = "3f1cc17f68ded756485bef4e9b28c184";
  const imgPath = "https://image.tmdb.org/t/p/original/";
  const videoLink = `https://api.themoviedb.org/3/movie/${id}?&append_to_response=videos`;

  const fetchVideo = async () => {
    try {
      const response = await axios.get(videoLink, {
        params: {
          api_key: key,
          append_to_response: "videos",
        },
      });
      const videoKey = response.data?.videos?.results?.find(
        (video) => video.type === "Trailer"
      )?.key;
      if (videoKey) {
        const youtubeLink = `https://www.youtube.com/embed/${videoKey}`;
        window.open(youtubeLink);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="modal--overlay">
      <div className="modal--content">
        <section
          className="modal--pic"
          style={{
            backgroundImage: `url(${imgPath}${movie.backdrop_path})`,
          }}
        >
          {" "}
          <Button
            onClick={fetchVideo}
            variant="contained"
            size="small"
            className="btn--trailer"
          >
            Play
          </Button>
        </section>
        <section className="modal--description">
          <h1 className="modal--title">{movie.original_title}</h1>
          <p className="modal--overview">{movie.overview}</p>
          <p className="modal--rating">
            <AiFillStar size="2rem" />
            {movie.vote_average.toFixed(1)}
            <span className="out--of">
              /10
              <span className="movie--count">({movie.vote_count})</span>
            </span>
          </p>
          <div className="modal--genre">{numberToGenre(movie.genre_ids)}</div>{" "}
        </section>
      </div>
    </div>
  );
}

export default Modal;
