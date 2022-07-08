let token = window.localStorage.getItem("token");
let SpotifyWebApi = require("spotify-web-api-node");

let spotifyApi = new SpotifyWebApi({
  clientId: "e4fe20831fd44f7f9dca5cd597f58779",
  clientSecret: "60cf28fc74a44dbba8b6d91a69e4701f",
  redirectUri: "http://localhost:3000/",
  accessToken: token
});

let setWebToken = (webApi) => {
    return spotifyApi = webApi
}

let globalPlaylist = new Promise ((resolve, err)=>{
  spotifyApi.getPlaylist("37i9dQZEVXbLRQDuF5jeBp", {offset: 5 ,limit: 5}).then(
    function (data) {
console.log('data', data)
resolve(data)    },
    function (err) {
      console.log("Something went wrong!", err);
    }
  );
})

let globalAlbumPlaylist = new Promise ((resolve, err)=> {
  spotifyApi.getPlaylist("7qWT4WcLgV6UUIPde0fqf9", { limit: 5 }).then(
    function (data) {
      resolve(data);
    },
    function (err) {
      console.log("Something went wrong!", err);
    }
  );
})

 let newReleases = 
   new Promise((resolve, err) => {
     spotifyApi.getNewReleases().then(
       function (data) {
         resolve(data);
       },
       function (err) {
         console.log("Something went wrong!", err);
       }
     );
   });


let getPlaylist = async (id) => new Promise((resolve, err) => {
  spotifyApi.getPlaylist(id).then(
    function (data) {
      resolve(data);
    },
    function (err) {
      console.log("Something went wrong!", err);
    }
  );
});

let getArtist = async (id) =>
  new Promise((resolve, err) => {
    spotifyApi.getArtist(id).then(
      function (data) {
        resolve(data);
      },
      function (err) {
        console.log("Something went wrong!", err);
      }
    );
  });

 
  let getArtistSongs = async (id) =>
    new Promise((resolve, err) => {
      spotifyApi.getArtistTopTracks(id, "US").then(
        function (data) {
          resolve(data);
        },
        function (err) {
          console.log("Something went wrong!", err);
        }
      );
    });

      let getArtistAlbums = async (id) =>
        new Promise((resolve, err) => {
          spotifyApi
            .getArtistAlbums(id, {
              album_type: "album",
              country: "US",

            })
            .then(
              function (data) {
                resolve(data);
              },
              function (err) {
                console.log("Something went wrong!", err);
              }
            );
        });

           let getArtistArtist= async (id) =>
             new Promise((resolve, error) => {
             spotifyApi.getArtistRelatedArtists(id).then(
               function (data) {
                 console.log(data.body);
                 resolve(data)
               },
               function (err) {
                 error(err);
               }
             );
             });

spotifyApi
  .getMySavedTracks({
    limit: 2,
    offset: 1,
  })
  .then(
    function (data) {
      console.log("Done!");
    },
    function (err) {
      console.log("Something went wrong!", err);
    }
  );
           let getAlbums = async (id) =>
             new Promise((resolve, error) => {
               spotifyApi
                 .getAlbum(id)
                 .then(
                   function (data) {
                    resolve(data);
                   },
                   function (err) {
                     error(err);
                   }
                 );
             });

             
        export {
  globalPlaylist,
  globalAlbumPlaylist,
  setWebToken,
  getPlaylist,
  getArtist,
  getArtistSongs,
  getArtistAlbums,
  getArtistArtist,
  getAlbums,
  newReleases
};