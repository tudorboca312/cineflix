import { Button, TextField } from "@mui/material";
import React from "react";
import "./Header.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Header({ fetchSearch }) {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    fetchSearch(searchInput);
    navigate("/search");
    setSearchInput("");
  };

  const goHome = () => {
    navigate("/cineflix");
  };

  return (
    <div className="header">
      <img
        src={require("./imag001.png")}
        alt="imagine"
        className="imag"
        onClick={goHome}
        style={{ cursor: "pointer" }}
      />
      <section className="search--section">
        <form onSubmit={handleSearch}>
          <TextField
            value={searchInput}
            className="search--bar"
            onChange={(e) => setSearchInput(e.target.value)}
            InputProps={{
              style: {
                height: 42,
              },
            }}
            InputLabelProps={{
              shrink: true,
            }}
            placeholder="Search Movie..."
          />
          <Button
            type="submit"
            variant="contained"
            size="small"
            className="btn--search"
          >
            Search Movie
          </Button>
        </form>
      </section>
    </div>
  );
}

export default Header;
