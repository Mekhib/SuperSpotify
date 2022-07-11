import { spotifyApi } from "./global.js";

let getTracks = async (track) =>
  new Promise((resolve, err) => {
    spotifyApi.searchTracks(track).then(
      function (data) {
        console.log('Search by "track"', data.body);
        resolve(data.body);
      },
      function (err) {
        console.error(err);
      }
    );
  });

let getArtist = async (artist) =>
  new Promise((resolve, err) => {
    spotifyApi.searchArtists(artist).then(
      function (data) {
        console.log('Search by "track"', data.body);
        resolve(data.body);
      },
      function (err) {
        console.error(err);
      }
    );
  });

let getAlbums = async (albums) =>
  new Promise((resolve, err) => {
    spotifyApi.searchAlbums(albums).then(
      function (data) {
        console.log('Search by "track"', data.body);
        resolve(data.body);
      },
      function (err) {
        console.error(err);
      }
    );
  });

export { getTracks, getArtist, getAlbums };
