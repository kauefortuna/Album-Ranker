import React from "react";
import "../index.css";

function AlbumCard({ Image, title, artist, onClick }) {
  return (
    <div className="AlbumCard" onClick={onClick}>
      <img className="AlbumCover" src={Image} alt={title}></img>
      <p className="AlbumDescript">
        {title}
        <br />
        <span className="ArtistName">{artist}</span>
      </p>
    </div>
  );
}

export default AlbumCard;
