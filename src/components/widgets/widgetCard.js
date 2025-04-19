import React from "react";
import "./widgetCard.css";
import WidgetEntry from "./widgetEntry";
import { IconContext } from "react-icons";
import { FiChevronRight } from "react-icons/fi";

export default function WidgetCard({ title, similar, featured, newRelease, recommended }) {
  const getEntries = () => {
    if (similar?.length)
      return similar.map((artist) => (
        <WidgetEntry
          key={artist?.id}
          title={artist?.name}
          subtitle={artist?.followers?.total + " Followers"}
          image={artist?.images?.[2]?.url || artist?.images?.[0]?.url}
        />
      ));

    if (featured?.length)
      return featured.map((playlist) => (
        <WidgetEntry
          key={playlist?.id}
          title={playlist?.name}
          subtitle={playlist?.tracks?.total + " Songs"}
          image={playlist?.images?.[0]?.url}
        />
      ));

    if (newRelease?.length)
      return newRelease.map((album) => (
        <WidgetEntry
          key={album?.id}
          title={<span className="widget-song-title">{album?.name}</span>}
          subtitle={album?.artists?.[0]?.name}
          image={album?.images?.[2]?.url || album?.images?.[0]?.url}
        />
      ));

    if (recommended?.length)
      return recommended.map((track) => (
        <WidgetEntry
          key={track?.id}
          title={track?.name}
          subtitle={track?.artists?.map((a) => a.name).join(", ")}
          image={track?.album?.images?.[2]?.url || track?.album?.images?.[0]?.url}
        />
      ));

    return null;
  };

  return (
    <div className="widgetcard-body">
      <p className="widget-title">{title}</p>
      {getEntries()}
      <div className="widget-fade">
        <div className="fade-button">
          <IconContext.Provider value={{ size: "24px", color: "#c4d0e3" }}>
            <FiChevronRight />
          </IconContext.Provider>
        </div>
      </div>
    </div>
  );
}
