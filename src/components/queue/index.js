import React from "react";
import "./queue.css";

export default function Queue({ tracks, setCurrentIndex }) {
  return (
    <div className="queue-container flex">
      <div className="queue flex">
        <p className="upNext">Up Next</p>
        <div className="queue-list">
          {tracks?.map((track, index) => {
            const actualTrack = track.track || track;
            return (
              <div
                key={index + "key"}
                className="queue-item flex"
                onClick={() => setCurrentIndex(index)}
              >
                <p className="track-name">{actualTrack?.name}</p>
                <p>0:30</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
