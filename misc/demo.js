import {getToken} from '../js/common.js';

const baseURL = "https://api.spotify.com/v1/tracks";
const trackId = "4VPR3GtqJrTRpZOCYpG6v6";

async function getTrackInfo(access_token) {
  const response = await fetch(`${baseURL}/${trackId}`, {
    method: 'GET',
    headers: { 'Authorization': 'Bearer ' + access_token },
  });

  return await response.json();
}

async function getAudioFeatures(access_token) {
  const response = await fetch(`https://api.spotify.com/v1/audio-features/${trackId}`, {
    method: 'GET',
    headers: { 'Authorization': 'Bearer ' + access_token }
  });

  return await response.json();
}

getToken().then(response => {
  getTrackInfo(response.access_token).then(song => {
    console.log(song.artists[0].name + " - " + song.name)
  })

  getAudioFeatures(response.access_token).then(song => {
    console.log(song)
  })
});