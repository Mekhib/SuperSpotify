let token = window.localStorage.getItem("token");
let SpotifyWebApi = require("spotify-web-api-node");
let spotifyApi = new SpotifyWebApi({
  clientId: "e4fe20831fd44f7f9dca5cd597f58779",
  clientSecret: "60cf28fc74a44dbba8b6d91a69e4701f",
  redirectUri: "http://localhost:3000/start",
});
spotifyApi.setAccessToken(token);
// function getMe()
const topTracks = new Promise((resolve, err) => {
  spotifyApi.getMyTopTracks().then(
    function (data) {
      console.log(data);
      resolve(data);
    },
    function (err) {
      console.log("Something went wrong!", err);
    }
  );
});

const topArtist = new Promise((resolve, err) => {
  spotifyApi.getMyTopArtists().then(
    function (data) {
      console.log(data);
      resolve(data);
    },
    function (err) {
      console.log("Something went wrong with grabbing artist!", err);
    }
  );
});

const userPlaylist = new Promise((resolve, err) => {
  spotifyApi.getUserPlaylists().then(
    function (data) {
      console.log("Retrieved playlists", data.body);
      resolve(data);
    },
    function (err) {
      console.log("Something went wrong!", err);
    }
  );
});

const loggedIn = new Promise((resolve,err)=> {
  if(token){
  spotifyApi.getMe().then(
    function (data) {
      console.log("Some information about the authenticated user", data.body);
      resolve(data);
    },
    function (err) {
      console.log("Something went wrong with get me!", err);
      resolve(err);
    }
  );
  }

})

const userRecentTracks = new Promise((resolve, err) => {
spotifyApi
  .getMyRecentlyPlayedTracks({
    limit: 10,
  })
  .then(
    function (data) {
      // Output items
      resolve(data)
    },
    function (error) {
      err(error)
      console.log("Something went wrong!", error);
    }
  );
});

const userTracks = new Promise((resolve, err) => {
  spotifyApi
    .getMySavedTracks({limit: 50})
    .then(
      function (data) {
        resolve(data);
      },
      function (error) {
        err(error);

        console.log("Something went wrong!", error);
      }
    );
});


export {
  topArtist,
  topTracks,
  userPlaylist,
  loggedIn,
  userRecentTracks,
  userTracks,
};
