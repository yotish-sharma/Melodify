import React, { useState, useEffect } from "react";
import APIKit from "../../spotify";
import { IconContext } from "react-icons";
import { AiFillPlayCircle } from "react-icons/ai";
import "./favorites.css";
import { useNavigate } from "react-router-dom";

export default function Favorites() {
  const [likedTracks, setLikedTracks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    APIKit.get("/me/tracks?limit=50")
      .then((res) => {
        setLikedTracks(res.data.items.map(item => item.track));
      })
      .catch((err) => console.error("❌ Liked Songs Error:", err));
  }, []);

  const playTrack = (id) => {
    const selectedIndex = likedTracks.findIndex((track) => track.id === id);
    if (selectedIndex !== -1) {
      navigate("/player", {
        state: {
          isFavorites: true,
          tracks: likedTracks,
          index: selectedIndex,
        },
      });
    }
  };

  return (
    <div className="screen-container">
      <div className="favorites-body">
        {likedTracks.map((track) => (
          <div
            className="song-card"
            key={track.id}
            onClick={() => playTrack(track.id)}
          >
            <img
              src={track.album.images[0]?.url}
              className="song-image"
              alt="Track-Art"
            />
            <p className="song-title">{track.name}</p>
            <p className="song-subtitle">
              {track.artists.map((a) => a.name).join(", ")}
            </p>
            <div className="song-fade">
              <IconContext.Provider value={{ size: "50px", color: "#E99D72" }}>
                <AiFillPlayCircle />
              </IconContext.Provider>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
