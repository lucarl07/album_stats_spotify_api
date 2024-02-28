import {getToken} from './common.js';

const trackId = "7dU9Z24yR9AKuS9cAe2Tj7"

async function getTrackInfo(access_token) {
  const response = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
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