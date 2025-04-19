import React, { useEffect, useState } from "react";
import "./player.css";
import { useLocation } from "react-router-dom";
import apiClient from "../../spotify";
import SongCard from "../../components/songCard";
import Queue from "../../components/queue";
import AudioPLayer from "../../components/audioPlayer";
import Widgets from "../../components/widgets";

export default function Player() {
  const location = useLocation();
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    console.log("📦 Location State:", location.state);
    if (location.state?.isFavorites) {
      setTracks(location.state.tracks);
      setCurrentIndex(location.state.index);
    } else if (location.state) {
      apiClient
        .get("playlists/" + location.state?.id + "/tracks")
        .then((res) => {
          setTracks(res.data.items);
          setCurrentTrack(res.data?.items[0]?.track);
        });
    }
  }, [location.state]);

  useEffect(() => {
    if (tracks.length > 0) {
      if (location.state?.isFavorites) {
        setCurrentTrack(tracks[currentIndex]);
        console.log("🎧 Current Track set (Favorites):", tracks[currentIndex]);
      } else {
        setCurrentTrack(tracks[currentIndex]?.track);
        console.log("🎧 Current Track set (Playlist):", tracks[currentIndex]?.track);
      }
    }
  }, [currentIndex, tracks, location.state]);

  return (
    <div className="screen-container flex">
      <div className="left-player-body">
        <AudioPLayer
          currentTrack={currentTrack}
          total={tracks}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
        <Widgets
          artistID={currentTrack?.album?.artists[0]?.id}
          currentlyPlaying={currentTrack}
        />
      </div>
      <div className="right-player-body">
        <SongCard album={currentTrack?.album} />
        <Queue tracks={tracks} setCurrentIndex={setCurrentIndex} />
      </div>
    </div>
  );
}
