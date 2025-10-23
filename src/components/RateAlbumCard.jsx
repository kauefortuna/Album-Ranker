import React, { useState, useEffect } from "react";
import "../index.css";
import { fetchAlbumSongs } from "../fetchAlbums.js";

function formatDuration(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${String(seconds).padStart(2, "0")}`;
}

function RateAlbumCard({
  imageUrl,
  albumTitle,
  artistName,
  onClose,
  token,
  albumId,
  genres,
  release,
}) {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    console.log(albumId);
    if (albumId && token) {
      fetchAlbumSongs(albumId, token, setSongs);
    }
  }, [albumId, token]);

  return (
    <>
      <div className="RateAlbumOverlay" onClick={onClose}></div>

      <div className="RateAlbumCard">
        <button className="CloseButton" onClick={onClose}>
          ✕
        </button>
        <div className="RateAlbumLeft">
          <img className="RateAlbumCover" src={imageUrl} alt={albumTitle} />
          <div className="RateAlbumInfo">
            <h2>{albumTitle}</h2>
            <br></br>
            <p>{artistName}</p>
            <br></br>
            <p>{release}</p>

            <div className="RateButtonDiv">
              <button className="niceButton">Rate This Album</button>
            </div>
          </div>
        </div>

        <div className="songsBox">
          {songs.map(({ name, durationMs }) => (
            <div className="songCard" key={name}>
              <p>{name}</p>
              <p>{formatDuration(durationMs)} min</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default RateAlbumCard;

/*<input type="radio" id="star10" name="rating" value="10" />
              <label for="star10"></label>
              <input type="radio" id="star9" name="rating" value="9" />
              <label for="star9"></label>
              <input type="radio" id="star8" name="rating" value="8" />
              <label for="star8"></label>
              <input type="radio" id="star7" name="rating" value="7" />
              <label for="star7"></label>
              <input type="radio" id="star6" name="rating" value="6" />
              <label for="star6"></label>*/

/*<div class="rating">
              <input type="radio" id="star1" name="rating" value="1" />
              <label for="star1"></label>
              <input type="radio" id="star2" name="rating" value="2" />
              <label for="star2"></label>
              <input type="radio" id="star3" name="rating" value="3" />
              <label for="star3"></label>
              <input type="radio" id="star4" name="rating" value="4" />
              <label for="star4"></label>
              <input type="radio" id="star5" name="rating" value="5" />
              <label for="star5"></label>
            </div>*/
