let token = window.localStorage.getItem("token");
let SpotifyWebApi = require("spotify-web-api-node");
let spotifyApi = new SpotifyWebApi({
  clientId: "e4fe20831fd44f7f9dca5cd597f58779",
  clientSecret: "60cf28fc74a44dbba8b6d91a69e4701f",
  redirectUri: "http://localhost:3000/start",
});
spotifyApi.setAccessToken(token);

spotifyApi.getMyCurrentPlaybackState().then(
  function (data) {
    // Output items
    if (data.body && data.body.is_playing) {
      console.log("User is currently playing something!");
    } else {
      console.log("User is not playing anything, or doing so in private.");
    }
  },
  function (err) {
    console.log("Something went wrong!", err);
  }
);

// Get Current User's Recently Played Tracks
spotifyApi
  .getMyRecentlyPlayedTracks({
    limit: 20,
  })
  .then(
    function (data) {
      // Output items
      console.log("Your 20 most recently played tracks are:");
      data.body.items.forEach((item) => console.log(item.track));
    },
    function (err) {
      console.log("Something went wrong!", err);
    }
  );

// Get the User's Currently Playing Track
spotifyApi.getMyCurrentPlayingTrack().then(
  function (data) {
    console.log("Now playing: " + data.body.item.name);
  },
  function (err) {
    console.log("Something went wrong!", err);
  }
);

let pause = new Promise ((resolve, err)=>{
  // Pause a User's Playback
  spotifyApi.pause().then(
    function () {
      resolve(true);
    },
    function (err) {
      //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
      console.log("Something went wrong!", err);
    }
  );
})

 let start = (id) => (new Promise ((resolve,err)=>{
     console.log(id);
spotifyApi.play({id}).then(
  function () {
    resolve(true)
  },
  function (err) {
    //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
    console.log("Something went wrong!", err);
  }
);
})
)

async function play(id) {
await start(id).then((data)=>
console.log(data))
}

export {play, pause}
