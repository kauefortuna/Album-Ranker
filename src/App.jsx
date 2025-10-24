import SearchBar from "./components/SearchBar";
import AlbumCard from "./components/AlbumCard";
import "./index.css";
import "./mobile.css";
import { useState, useEffect, useRef } from "react";
import DarkVeil from "./DarkVeil.jsx";
import Iridescence from "./Iridescence.jsx";
//import { loginUrl } from "./spotifyAuth.js";
import Carousel from "./Carousel.jsx";
import "./Carousel.css";
import CarouselReverse from "./CarouselReverse.jsx";
import LogoLoop from "./LogoLoop.jsx";
import { redirectToSpotifyAuth, getAccessToken } from "./spotifyAuth.js";
import { fetchAlbum } from "./fetchAlbums";
import RateAlbumCard from "./components/RateAlbumCard.jsx";
/* const token =
    "BQC8fxNaAi0is4kNN3LXpYLgDQKGH7xLqswIDWLBUttUrx3nsp8mogUsZlr9dkqZ4grIiWMVuk1SnvdokX_JaG934ouMYaI2MT2jNdr_WTDekQfVG6wDZwyl1h3lEcBI3DoQt3ALsRtcs2ssqITNGw1BGHo5U4OsgsqJKdeUsrXwpPARnjSjLKtZRCDceLONGgbyEhHjOu1ZFlceB_2O9NcImJGgwhAEcpFJzg9xtG8MwOujKwvBOmOVRnuXuwYlBVxBFGAJbrRUjZjsdz4ohLm6288TkivrC1ekQ12ycjgVzoXA8UoT2HkGaKpWovmxrBKQ";
  const userId = "198f3046d64c4939a13ea8578b392fe0";

  */

function App() {
  const [token, setToken] = useState(null);

  const [userId, setUserId] = useState(null);

  const [AllAlbums, setAllAlbums] = useState([]);
  const [albums, setAlbums] = useState([]);

  const [query, setQuery] = useState("");

  const [inputValue, setInputValue] = useState("");

  const [viewMode, setViewMode] = useState("all");

  const [AlbumArray1, setAlbumArray1] = useState([]);
  const [AlbumArray2, setAlbumArray2] = useState([]);

  const [FilteredAlbums, setFilteredAlbums] = useState([]);

  const [SelectedAlbum, setSelectedAlbum] = useState(null);

  // const filteredAlbums =
  //   query.trim() === ""
  //     ? []
  //     : AllAlbums.filter(
  //         ({ albumTitle, artistName }) =>
  //           albumTitle.toLowerCase().includes(query.toLowerCase()) ||
  //           artistName.toLowerCase().includes(query.toLowerCase())
  //       );

  async function fetchData({ token, setAllAlbums }) {
    if (!token) return;

    const timeRanges = ["short_term", "medium_term", "long_term"];
    const allAlbums = [];
    const seen = new Set();

    for (const range of timeRanges) {
      try {
        const response = await fetch(
          `https://api.spotify.com/v1/me/top/tracks?limit=36&time_range=${range}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const data = await response.json();

        if (!data.items) {
          console.error(`Error fetching ${range} tracks:`, data);
          continue;
        }

        for (const track of data.items) {
          const album = track.album;
          if (!seen.has(album.id)) {
            seen.add(album.id);
            allAlbums.push({
              imageUrl: album.images[0]?.url,
              albumTitle: album.name,
              artistName: album.artists[0]?.name,
              timeRange: range, // tag so you know which range it came from
            });
          }
        }
      } catch (err) {
        console.error(`Spotify fetch error (${range}):`, err);
      }
    }

    setAllAlbums(allAlbums);
  }

  useEffect(() => {
    if (!token || !userId) return;
    fetchData({ token, setAllAlbums });
  }, [token, userId]);
  //chat
  function handleSpotifyError(response) {
    if (response.status === 401) {
      window.localStorage.removeItem("spotify_token");
      window.location.reload(); // Forces new login
    }
  }

  useEffect(() => {
    getAccessToken().then((token) => {
      if (token) setToken(token);
    });
  }, []);

  // 🧑‍💻 Fetch user ID after login
  useEffect(() => {
    if (!token) return;

    fetch("https://api.spotify.com/v1/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        return res.json();
      })
      .then((userData) => setUserId(userData.id))
      .catch((err) => console.error("Failed to get user:", err));
  }, [token]);

  //fetch top albums
  useEffect(() => {
    if (!token) return;

    fetch(
      "https://api.spotify.com/v1/me/top/tracks?limit=24&time_range=long_term",
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.items) {
          const uniqueAlbums = [];
          const seen = new Set();

          for (let track of data.items) {
            const album = track.album;
            if (!seen.has(album.id)) {
              seen.add(album.id);
              uniqueAlbums.push({
                imageUrl: album.images[0]?.url,
                albumTitle: album.name,
                artistName: album.artists[0]?.name,
              });
            }
          }

          setAlbums(uniqueAlbums.slice(0, 24));
        } else {
          console.error("Error fetching top tracks:", data);
        }
      })
      .catch((err) => console.error("Spotify fetch error:", err));
  }, [token, userId]);

  //asdasdassadsa

  useEffect(() => {
    if (albums.length > 0) {
      const covers = albums.map(({ imageUrl }) => imageUrl);
      const half = Math.ceil(covers.length / 2);

      setAlbumArray1(covers.slice(0, half));
      setAlbumArray2(covers.slice(half));
    }
  }, [albums]);

  if (!token) {
    return (
      <div className="login-page">
        <Iridescence
          color={[0.6, 0.4, 0.8]}
          mouseReact={false}
          amplitude={0.1}
          speed={1.0}
        />
        <div className="AppMain" style={{ margin: "10% auto" }}>
          <h1>Album Ranker 3000</h1>
          <button className="login-btn" onClick={redirectToSpotifyAuth}>
            Login with Spotify
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Iridescence
        color={[0.6, 0.45, 0.75]}
        mouseReact={false}
        amplitude={0.1}
        speed={1.0}
      ></Iridescence>
      <div className="AppMain" style={{ margin: "0 auto" }}>
        <div className="HeaderBar">
          <h1>Album Ranker 3000</h1>

          <div className="HeaderSearch">
            <SearchBar
              inputValue={inputValue}
              setInputValue={setInputValue}
              value={inputValue}
              onChange={(e) => setInputValue(e)}
              onKeyDown={async (e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  setQuery(inputValue);
                  await fetchAlbum(inputValue, token, setFilteredAlbums);
                  setViewMode("filtered");
                }
              }}
            />
          </div>

          <div className="HeaderButtons">
            <button onClick={() => setViewMode("all")} className="active-btn">
              All Albums
            </button>
            <button
              onClick={() => setViewMode("filtered")}
              className="active-btn"
            >
              Filtered Albums
            </button>
          </div>
        </div>

        <div>
          <br></br>
          <br></br>
        </div>

        {viewMode === "all" && (
          //use map to create array of album cards each with unique information
          //pass that array onto the carousel component
          // <div className="AlbumsContainer">
          //   {albums.map(({ imageUrl, albumTitle, artistName }) => (
          //     <AlbumCard
          //       key={albumTitle}
          //       Image={imageUrl}
          //       title={albumTitle}
          //       artist={artistName}
          //     />
          //   ))}
          // </div>
          <>
            <div className="carousel-wrapper">
              <Carousel
                AlbumsArray={AlbumArray1}
                setSelectedAlbum={setSelectedAlbum}
              ></Carousel>
            </div>
            <div className="carousel-wrapper">
              <CarouselReverse AlbumsArray={AlbumArray2}></CarouselReverse>
            </div>
          </>
        )}

        {viewMode === "filtered" && (
          <div className="AlbumsContainer">
            {FilteredAlbums.map((album) => (
              <AlbumCard
                key={`${album.albumTitle}-${album.artistName}`}
                Image={album.imageUrl}
                title={album.albumTitle}
                artist={album.artistName}
                onClick={() => {
                  setSelectedAlbum(album);
                }}
              />
            ))}
            {SelectedAlbum != null && (
              <div className="AlbumsContainer">
                <RateAlbumCard
                  release={SelectedAlbum.release}
                  genre={SelectedAlbum.genres}
                  token={token}
                  albumId={SelectedAlbum.albumId}
                  key={`${SelectedAlbum.albumTitle}-${SelectedAlbum.artistName}`}
                  imageUrl={SelectedAlbum.imageUrl}
                  artistName={SelectedAlbum.artistName}
                  albumTitle={SelectedAlbum.albumTitle}
                  onClose={() => setSelectedAlbum(null)}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
