//import {key} from "./link";
const searchBar = document.getElementById('search-bar');
const searchResults = document.getElementById('search-results');

const loaderEl = document.getElementById('loadelement');
const gameList = document.querySelector('.gameList');
const loadMoreGamesBtn = document.querySelector('.main-button');
let nextGameListUrl = null;

// conditions for updated values (date)

//const key = 'bafed38dc2df4e6097710af21ce094a2';
const url = `https://api.rawg.io/api/games?key=${key}&dates=2022-01-01,2023-11-30&ordering=-added`;


document.addEventListener('DOMContentLoaded', function () {
    searchBar.addEventListener('input', debounce(handleSearch, 300));

// limit rate of input event (API requests)
    function debounce(func, delay) {
        let timeout;
        return function () {
            const context = this;
            const args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                func.apply(context, args);
            }, delay);
        };
    }

    async function handleSearch() {
        const searchTerm = searchBar.value.trim();
        if (searchTerm.length === 0) {

// clear search results if sB empty          
            searchResults.innerHTML = '';
            return;
        }
        const apiUrl = `https://api.rawg.io/api/genres?key=${key}&search=${searchTerm}`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            displayResults(data.results);
        } catch (error) {
            console.error('Oops! An error occurred', error);
        }
    }

    function displayResults(results) {
// Clear previous results
        searchResults.innerHTML = '';

        if (results.length === 0) {
            searchResults.innerHTML = '<p>No results found</p>';
            return;
        }
        results.forEach(result => {
            const genreName = result.name;
            const genreId = result.id;
            const genreElement = document.createElement('p');
            genreElement.textContent = `${genreName}`;

            searchResults.appendChild(genreElement);
        });
    }
});


// map through platform data for name (playstation etc). if characters are greater than 60 show ...
const getPlatformStr = platforms => {
    const platformStr = platforms.map(pl => pl.platform.name).join(',');
    if (platformStr.length > 30) {
        return platformStr.substring(0, 30) + '...';
    }
    return platformStr;
}

// fun loading animation and then fetch recent games rawg api
function loadGames(url) {
    loaderEl.classList.remove('loaded');

    fetch(url)
        .then(response => response.json())
        .then(data => {
            nextGameListUrl = data.next ? data.next : null;
            const games = data.results;
            loaderEl.classList.add('loaded');

            //looking through games + making cards
            games.forEach(game => {
                const gameItemEl = `
                <div class="game-card">
                    <img src="${game.background_image}" alt="${game.name} image">
                    <h4 class="game-name">${game.name}
                    <br>
                    <span class="platforms">${getPlatformStr(game.parent_platforms)}</span>
                    </h4>
                    <ul>
                        <li><i class="fa-solid fa-star"></i><span class="rating">${game.rating}</span></li>
                        <li><i class="fa-regular fa-calendar"></i><span class="date">${game.released}</span></li>
                    </ul>
                </div>            
        `

                //adding in each of the div elements to the gameList
                gameList.insertAdjacentHTML('beforeend', gameItemEl)
            });
            loaderEl.classList.add('loaded')
            if (nextGameListUrl) {
                loadMoreGamesBtn.classList.remove('hidden');
            } else {
                loadMoreGamesBtn.classList.add('hidden');
            }
        })
        .catch(error => {
            console.log('Oops! An error occurred:', error);
        });
}

//load games
loadGames(url);

//  ---- EventListener for Load More button ----
loadMoreGamesBtn.addEventListener('click', () => {
    if (nextGameListUrl) {
        loadGames(nextGameListUrl);
    }
})

// --- EventListener script will run after DOM has loaded ----
document.addEventListener('DOMContentLoaded', function () {
    let backToTop = document.querySelector('.backToTop');

    // ---- EventListener scroll to top - using console.log to find scroll point ----
    window.addEventListener('scroll', function () {
        if (window.scrollY > 720) {
            backToTop.style.display = 'block';
        } else {
            backToTop.style.display = 'none';
        }
    });
});
