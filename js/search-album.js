import {getToken} from "./common.js";

const baseURL = "https://api.spotify.com/v1/tracks";
const trackID = "4cOdK2wGLETKBW3PvgPWqT";

async function getTrackInfo(accessToken) {
    const response = await fetch(`${baseURL}/${trackID}`, {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    })

    return await response.json();
}

getToken().then(response => {
    getTrackInfo(response.access_token).then(track => {
        console.log(track)
    })
})