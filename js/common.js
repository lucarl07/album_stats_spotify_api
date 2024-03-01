/* FILE DESIGNED FOR COMMON USE OF THE FOLLOWING FUNCTIONS: */

// Method to obtain the Spotify Web API access token:
const clientId = '676cb524e96d48749f7c8bf60f64be2b'; 
const clientSecret = 'ca2a68808edf4648aca8ad611bec7b77';

export async function getToken() {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    body: new URLSearchParams({
      'grant_type': 'client_credentials'
    }),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
    },
  });

  return await response.json();
}