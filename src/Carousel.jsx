import React from "react";
import "./Carousel.css";
import "./mobile.css";

function Carousel({ AlbumsArray, setSelectedAlbum }) {
  return (
    <div className="carousel">
      <div className="group">
        <div className="card">
          <img className="AlbumCoverCarousel" src={AlbumsArray[0]}></img>
        </div>
        <div className="card">
          <img className="AlbumCoverCarousel" src={AlbumsArray[1]}></img>
        </div>
        <div className="card">
          <img className="AlbumCoverCarousel" src={AlbumsArray[2]}></img>
        </div>
        <div className="card">
          <img className="AlbumCoverCarousel" src={AlbumsArray[3]}></img>
        </div>
        <div className="card">
          <img className="AlbumCoverCarousel" src={AlbumsArray[4]}></img>
        </div>
        <div className="card">
          <img className="AlbumCoverCarousel" src={AlbumsArray[5]}></img>
        </div>
        <div className="card">
          <img className="AlbumCoverCarousel" src={AlbumsArray[6]}></img>
        </div>
        <div className="card">
          <img className="AlbumCoverCarousel" src={AlbumsArray[7]}></img>
        </div>
        <div className="card">
          <img className="AlbumCoverCarousel" src={AlbumsArray[8]}></img>
        </div>
        <div className="card">
          <img className="AlbumCoverCarousel" src={AlbumsArray[9]}></img>
        </div>
      </div>
      <div aria-hidden className="group">
        <div className="card">
          <img className="AlbumCoverCarousel" src={AlbumsArray[0]}></img>
        </div>
        <div className="card">
          <img className="AlbumCoverCarousel" src={AlbumsArray[1]}></img>
        </div>
        <div className="card">
          <img className="AlbumCoverCarousel" src={AlbumsArray[2]}></img>
        </div>
        <div className="card">
          <img className="AlbumCoverCarousel" src={AlbumsArray[3]}></img>
        </div>
        <div className="card">
          <img className="AlbumCoverCarousel" src={AlbumsArray[4]}></img>
        </div>
        <div className="card">
          <img className="AlbumCoverCarousel" src={AlbumsArray[5]}></img>
        </div>
        <div className="card">
          <img className="AlbumCoverCarousel" src={AlbumsArray[6]}></img>
        </div>
        <div className="card">
          <img className="AlbumCoverCarousel" src={AlbumsArray[7]}></img>
        </div>
        <div className="card">
          <img className="AlbumCoverCarousel" src={AlbumsArray[8]}></img>
        </div>
        <div className="card">
          <img className="AlbumCoverCarousel" src={AlbumsArray[9]}></img>
        </div>
      </div>
    </div>
  );
}

export default Carousel;
