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
    const getAlbums = async(access_token) => {

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
        getAlbums(response.access_token).then(response => {
            showAlbums(response.results)
        })
    });
})

function showAlbums(albums) {
    const divResults = document.querySelector('.results');
    console.log('Álbuns: \n', albums)
    
    albums.map(album => {
        const divAlbum = document.createElement('div')

        divAlbum.id = `${album.id}`
        divAlbum.innerHTML = `
            <img src="${album.images[1].url}" alt="Capa do ${album.type} ${album.name}">

            <article class="infobox">
                <div class="name-and-artist">
                    <h1 class="album-name">${album.name}</h1>
                    <h2 class="artist-name">${album.artists[0].name}</h2>
                </div>

                <div class="type-and-release">
                    <span>${album.type}</span> - <span>${album.release_date}</span>
                </div>
            </article>
        `;

        divAlbum.classList.add('album')
        divResults.appendChild(divAlbum)
    })
}