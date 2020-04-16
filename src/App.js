import React, { Component } from "react";
import * as $ from "jquery";
// import { authEndpoint, clientId, redirectUri, scopes } from "./config";
import hash from "./hash";
import Player from "./Components/Player/Player";
import logo from "./logo.svg";
import "./App.css";


export const authEndpoint = 'https://accounts.spotify.com/authorize';
const clientId = 'f2b90b91687f452280828703ab73b793';
const redirectUri = "https://localhost:3000";
export const scopes = [
  "user-top-read",
  "user-read-currently-playing",
  "user-read-playback-state",
];



class App extends Component {
  constructor() {
    super();
    this.state = {
      token: null,
      item: {
        album: {
          images: [{ url: "" }]
        },
        name: "",
        artists: [{ name: "" }],
        duration_ms: 0
      },
      is_playing: "Paused",
      progress_ms: 0
    };
    this.getCurrentlyPlaying = this.getCurrentlyPlaying.bind(this);
  }
  componentDidMount() {
    // Set token
    let _token = hash.access_token;

    if (_token) {
      // Set token
      this.setState({
        token: _token
      });
      this.getCurrentlyPlaying(_token);
    }
  }

  getCurrentlyPlaying(token) {
    // Make a call using the token
    $.ajax({
      url: "https://api.spotify.com/v1/me/player",
      type: "GET",
      beforeSend: xhr => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: data => {
        this.setState({
          item: data.item,
          is_playing: data.is_playing,
          progress_ms: data.progress_ms
        });
      }
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          {!this.state.token && (
            <a
              className="btn btn--loginApp-link"
              href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                "%20"
              )}&response_type=token&show_dialog=true`}
            >
              Login to Spotify
            </a>
          )}
          {this.state.token && (
            <Player
              item={this.state.item}
              is_playing={this.state.is_playing}
              progress_ms={this.progress_ms}
            />
          )}
        </header>
      </div>
    );
  }
}

export default App;









// import React, { Component } from 'react';
// import hash from "./hash";
// import * as $ from "jquery";
// import logo from './logo.svg';
// import './App.css';
// import Player from "./Components/Player/Player";


// export const authEndpoint = 'https://accounts.spotify.com/authorize';

// const clientId = 'f2b90b91687f452280828703ab73b793';
// const redirectUri = "https://localhost:3000";
// const scopes = ["user-currently-playing", "user-playback-state"];

// class App extends Component {
//   constructor() {
//     super();
//     this.state = {
//       token: null,
//       item: {
//         album: {
//           images: [{ url: "" }]
//         },
//         name: "",
//         artists: [{ name: "" }],
//         duration_ms: 0,
//       },
//       is_playing: "Paused",
//       progress_ms: 0,
//     };
//     this.getCurrentlyPlaying = this.getCurrentlyPlaying.bind(this);
//   }

//   getCurrentlyPlaying(token) {
//     $.ajax({
//       url: "https://api.spotify.com/v1/me/player",
//       type: "GET",
//       beforeSend: (xhr) => {
//         xhr.setRequestHeader("Authorization", "Bearer" + token);
//       },
//       succes: (data) => {
//         this.setState({
//           item: data.item,
//           is_playing: data.is_playing,
//           progress_ms: data.progress_ms,
//         });
//       }
//     });
//   }
//   componentDidMount() {
//     let _token = hash.access_token;
//     if (_token) {
//       this.setState({
//         token: _token,
//       })
//     }

//   }

//   render() {
//     return (
//       <div className="app-container">
//         <header className="header">
//           <img src={logo} className="image" alt="image" />
//           {!this.state.token && (
//             <a
//               className="button-loggin"
//               href={`${authEndpoint}client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`}
//             >
//               Login to Spotify
//             </a>
//           )}
//           {this.state.token && (
//             <Player
//               item={this.state.item}
//               is_playing={this.state.is_playing}
//               progress_ms={this.state.progress_ms}
//             />
//           )}
//         </header>

//       </div>
//     );
//   }
// }

// export default App;
