/* ABOUT THE SELECTED ALBUM: */

// Import access token
import { getToken } from "./common.js";

// Change the page title
function changePageTitle(album) {
    document.title = `${getAllArtistNames(album)} - ${album.name} | AlbumStats`
}

function getAllArtistNames(album) {
    let creditedArtists = '',
    lastArtist = (album.artists.length) - 1;

    if(album.artists.length > 1) {
        album.artists.forEach((artist, i) => {
            if(i < lastArtist) {
                creditedArtists += `${artist.name}, `;
            } else {
                creditedArtists += `${artist.name}`;
            }
        });
    } else {
        creditedArtists = album.artists[0].name
    }
    
    return creditedArtists;
}

document.addEventListener('DOMContentLoaded', () => {
    // Get the URL parameters and its ID
    const pageUrlParams = new URLSearchParams(window.location.search),
    pageId = pageUrlParams.get('id');

    // Declare the "Get Album" endpoint
    const endpoint = `https://api.spotify.com/v1/albums/${pageId}`

    // Function to get album data, using the given access token
    async function getAlbumInfo(access_token) {
        // Fetch the URL
        const response = await fetch(endpoint, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + access_token },
        });

        // Return the response in JSON format
        return await response.json();
    }

    getToken().then(response => {
        getAlbumInfo(response.access_token).then(response => {
            changePageTitle(response);
            console.log(response)
        })
    })
})