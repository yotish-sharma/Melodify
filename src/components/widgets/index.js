import React, { useState, useEffect } from "react";
import "./widgets.css";
import apiClient from "../../spotify";
import WidgetCard from "./widgetCard";

export default function Widgets({ artistID, currentlyPlaying }) {
  const [similar, setSimilar] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [newRelease, setNewRelease] = useState([]);
  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    console.log("🎯 artistID:", artistID);
    console.log("🎵 currentlyPlaying.id:", currentlyPlaying?.id);

    if (currentlyPlaying?.artists?.[0]?.name) {
      apiClient
        .get(`/search?q=${encodeURIComponent(currentlyPlaying.artists[0].name)}&type=artist&limit=3`)
        .then((res) => {
          setSimilar(res.data?.artists?.items || []);
        })
        .catch((err) => console.error("❌ Similar Artists (via search) Error:", err));
    }

    apiClient
      .get(`/me/playlists?limit=3`)
      .then((res) => {
        setFeatured(res.data?.items || []);
      })
      .catch((err) => console.error("❌ Featured Playlists Error:", err));

    apiClient
      .get(`/browse/new-releases?country=IN`)
      .then((res) => {
        const a = res.data?.albums.items.slice(0, 3);
        setNewRelease(a);
      })
      .catch((err) => console.error("❌ New Releases Error:", err));

    apiClient
      .get(`/me/top/tracks?limit=3`)
      .then((res) => {
        setRecommended(res.data?.items || []);
      })
      .catch((err) => console.error("❌ Recommendations Fallback Error:", err));
  }, [artistID, currentlyPlaying]);

  return (
    <div className="widgets-body flex">
      <WidgetCard title="Similar Artists" similar={similar} />
      <WidgetCard title="Made For You" recommended={recommended} />
      <WidgetCard title="New Releases" newRelease={newRelease} />
    </div>
  );
}
