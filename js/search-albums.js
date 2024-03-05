/* SEARCH ALBUMS BASED ON NAME: */

// Import access token
import { getToken, getReleaseType, getReleaseYear } from "./common.js";

// Declare HTML input fields:
const inGetAlbum = document.querySelector('#inGetAlbum'),
inArtistName = document.querySelector('#inArtistName'),
selPopularity = document.querySelector('#selPopularity'),
inFirstReleaseYear = document.querySelector('#inFirstReleaseYear'),
inLastReleaseYear = document.querySelector('#inLastReleaseYear');

// Declare URL endpoint
const baseUrl = "https://api.spotify.com/v1/search"

// When the search button is clicked:
document.querySelector('#btnRequest').addEventListener('click', () => {

    // Get albums using the access token
    const getArrayOfAlbums = async(access_token) => {

        // Encode URI components:
        const albumName = encodeURIComponent(inGetAlbum.value)
        let artistName = '', firstYear = '', lastYear = '', popularity = '';

        if(inArtistName.value !== "") {
            artistName = "artist:" + encodeURIComponent(inArtistName.value);
        }
        if(inFirstReleaseYear.value !== "") {
            firstYear = "%20year:" + encodeURIComponent(inFirstReleaseYear.value);
        }
        if(inLastReleaseYear.value !== "") {
            lastYear = "-" + encodeURIComponent(inLastReleaseYear.value);
        }
        if(selPopularity.value == "tag:new" || selPopularity.value == "tag:hipster") {
            popularity = "%20" + selPopularity.value
        }

        // Set the fetch URL with all the parameters
        const compositeUrl = `${baseUrl}?q=${albumName+artistName+firstYear+lastYear+popularity}&type=album&offset=0`;

        // Fetch the composite URL
        const response = await fetch(compositeUrl, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + access_token
            }
        });

        // Slice the amount of albums shown (max. 8) by page, and then return
        const data = await response.json();

        const limitData = data.albums.items.slice(0, 10);
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
    
    divResults.innerHTML = `<h2 class="area-title">Resultados:</h2>`
    console.log(albums)

    albums.map(album => {
        const divAlbum = document.createElement('div')

        divAlbum.id = album.id;
        divAlbum.innerHTML = `
            <img id="cover-${album.id}" src="${album.images[1].url}" alt="Capa do(a) ${getReleaseType(album.album_type, album.total_tracks)} ${album.name}">

            <article class="info-box">
                <div class="top-section">
                    <h1 class="album-title">
                        <a href="${goToAlbumPage(album.id)}">${album.name}</a>
                    </h1>

                    <h2 class="artist-name">
                        ${getAllArtistLinks(album)}
                    </h2>

                    <div class="other-info">
                        <span>${getReleaseType(album.album_type, album.total_tracks)}</span> • <span>${getReleaseYear(album.release_date)}</span> • <span>${album.total_tracks} ${trackOrTracks(album.total_tracks)}</span>
                    </div>
                </div>

                <div class="bottom-section">
                    <a class="spotify-url" href="${album.external_urls.spotify}" target="_blank" rel="noopener noreferrer">
                        Ver álbum no Spotify
                    </a>
                </div>
            </article>
        `;

        divAlbum.classList.add('album')
        divResults.appendChild(divAlbum)
        document.querySelector(`#cover-${album.id}`).addEventListener('click', () => {
            window.location.href = goToAlbumPage(album.id);
        })
    })
}

function goToAlbumPage(id) {
    const encryptedId = id.toString(36) // Non-functional encryption (will be replaced with another method)
    return `./about-album.html?id=${encryptedId}`
}

function getAllArtistLinks(album) {
    let creditedArtists = '',
    lastArtist = (album.artists.length) - 1;

    if(album.artists.length > 1) {
        album.artists.forEach((artist, i) => {
            if(i < lastArtist) {
                creditedArtists += `<a href="${artist.external_urls.spotify}" target="_blank" rel="noopener noreferrer">${artist.name}</a>, `;
            } else {
                creditedArtists += `<a href="${artist.external_urls.spotify}" target="_blank" rel="noopener noreferrer">${artist.name}</a>`;
            }
        })
    } else {
        creditedArtists = `
            <a href="${album.artists[0].external_urls.spotify}" target="_blank" rel="noopener noreferrer">${album.artists[0].name}</a>
        `;
    }
    
    return creditedArtists;
}

function trackOrTracks(num) {
    if(num > 1) {
        return "faixas";
    } else {
        return "faixa";
    }
}