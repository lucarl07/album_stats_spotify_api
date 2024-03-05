/* ABOUT THE SELECTED ALBUM: */

// Import access token
import { getToken, getReleaseType } from "./common.js";

// Change the page title
function changePageTitle(album) {
    document.title = `${getAllArtistNames(album)} - ${album.name} | AlbumStats`
}

// Get the name of all the artists
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

// When the page is loaded:
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
            loadPageContent(response);
        })
    })
})

function loadPageContent(album) {
    const divPageContent = document.querySelector('.page-content')
    const divPageAlbum = document.createElement('div')
    
    const artistsString = getAllArtistNames(album);
    console.log(album);

    divPageAlbum.id = album.id;
    divPageAlbum.innerHTML = `
        <div class="page-album">
            <img class="album-cover" src="${album.images[0].url}" alt="Capa do ${album.type} ${album.name}">

            <div class="album-info">
                <div class="title-area">
                    <h1 class="title">${album.name}</h1>
                    <h2 class="artist">${artistsString}</h2>
                </div>

                <table class="table">
                    <tbody>
                        <tr class="table-row">
                            <td class="table-cell">
                                <h3>Tipo de álbum:</h3>
                                ${getReleaseType(album.type)}
                            </td>
                            <td class="table-cell">
                                <h3>Data de lançamento:</h3>
                                ${album.release_date} <!-- getReleaseDate(album) -->
                            </td>
                            <td class="table-cell">
                                <h3>Número de faixas:</h3>
                                ${album.total_tracks}
                            </td>
                        </tr>
                        <tr class="table-row">
                            <td class="table-cell">
                                <h3>Selo:</h3>
                                ${album.label}
                            </td>
                            <td class="table-cell">
                                <h3>Países disponíveis:</h3>
                                ${album.available_markets.length}
                            </td>
                            <td class="table-cell">
                                <h3>Popularidade:</h3>
                                ${album.popularity}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;

    divPageAlbum.classList.add('page-album')
    divPageContent.appendChild(divPageAlbum);
}