let token = window.localStorage.getItem("token");
let SpotifyWebApi = require("spotify-web-api-node");
let spotifyApi = new SpotifyWebApi({
  clientId: "e4fe20831fd44f7f9dca5cd597f58779",
  clientSecret: "60cf28fc74a44dbba8b6d91a69e4701f",
  redirectUri: "http://localhost:3000/start",
});
spotifyApi.setAccessToken(token);
 
let globalPlaylist = new Promise ((resolve, err)=>{
  
})

spotifyApi.getPlaylist("5ieJqeLJjjI8iJWaxeBLuK").then(
  function (data) {
    console.log("Some information about this playlist", data.body);
  },
  function (err) {
    console.log("Something went wrong!", err);
  }
);