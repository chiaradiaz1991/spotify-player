import React from "react";
import style from './styles.css';


const Player = (props) => {
  const backgroundStyles = {
    backgroundImage: `url(${props.item.album.images[0].url})`,
  };

  const progressBar = {
    width: (props.progress_ms * 100 / props.item.duration_ms) + '%'
  };

  return (
    <div className="player-container">
      <div className="main-container">
        <div className="now-playing">
          <img src={props.item.abum.images[0].url} />
        </div>
        <div className="now-playing-side">
          <div className="now-playing-name">{props.item.name}</div>
          <div className="now-playing-artist">{props.item.artists[0].name}</div>
          <div className="now-playing-status">{props.is_playing ? "Playing" : "Paused"}</div>
          <div className="progress">
            <div className="progress-bar" style={progressBar} />
          </div>
        </div>
        <div className="background" style={backgroundStyles} />{" "}
      </div>
    </div>
  );
}

export default Player;