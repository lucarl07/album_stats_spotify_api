/* SEARCH ALBUMS BASED ON NAME: */

// Import access token
import { getToken } from "./common.js";

// Declare HTML elements and properties
const inGetAlbum = document.querySelector('#inGetAlbum'),
btnRequest = document.querySelector('#btnRequest');
let objectPage = 0;

// Declare URL endpoint
const baseUrl = "https://api.spotify.com/v1/search"

// When the search button is clicked:
btnRequest.addEventListener('click', () => {

    // Get albums using the access token
    const getArrayOfAlbums = async(access_token) => {

        // Declare the offset and encoded album name for the search
        const albumName = encodeURIComponent(inGetAlbum.value);
        let offset = 0;
        
        if (objectPage > 0) {
            offset = (objectPage * 8) + 1;
        }

        // Set the fetch URL with all the parameters
        const compositeUrl = `${baseUrl}?q=${albumName}&type=album&offset=${offset}`;

        // Fetch the composite URL
        const response = await fetch(compositeUrl, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + access_token
            }
        });

        // Slice the amount of albums shown (max. 8) by page, and then return
        const data = await response.json();
        const limitData = data.albums.items.slice(0, 8);
        return {
            results: limitData
        }
    }

    // Call all the functions
    getToken().then(response => {
        getArrayOfAlbums(response.access_token).then(response => {
            showAlbums(response.results)
        })
    });
})

function showAlbums(albums) {
    const divResults = document.querySelector('.results');
    console.log('Álbuns: \n', albums)
    
    divResults.innerHTML = `<h2 class="area-title">Resultados:</h2>`

    albums.map(album => {
        const divAlbum = document.createElement('div')

        divAlbum.id = `${album.id}`
        divAlbum.innerHTML = `
            <img src="${album.images[1].url}" alt="Capa do ${album.type} ${album.name}">

            <article class="info-box">
                <div class="top-section">
                    <h1 class="album-title">
                        <a href="#">${album.name}</a>
                    </h1>

                    <h2 class="artist-name">
                        <a href="${album.artists[0].external_urls.spotify}" target="_blank" rel="noopener noreferrer">
                            ${album.artists[0].name}
                        </a>
                    </h2>

                    <div class="other-info">
                        <span>${getAlbumYear(album.release_date)}</span> • <span>${album.total_tracks} ${trackOrTracks(album.total_tracks)}</span>
                    </div>
                </div>

                <div class="bottom-section">
                    <a  class="spotify-url" href="${album.external_urls.spotify}" target="_blank" rel="noopener noreferrer">
                        Ver álbum no Spotify
                    </a>
                </div>
            </article>
        `;

        divAlbum.classList.add('album')
        divResults.appendChild(divAlbum)
    })
}

function getAlbumYear(date) {
    const year = date.split("-", 1)
    return year;
}

function trackOrTracks(num) {
    if(num > 1) {
        return "faixas";
    } else {
        return "faixa";
    }
}