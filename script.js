//import {key} from "./link";
const loaderEl = document.getElementById('loadelement');
const gameList = document.querySelector('.gameList');
const loadMoreGamesBtn = document.querySelector('.main-button');
let nextGameListUrl = null;

// conditions for updated values (date)
const url = `https://api.rawg.io/api/games?key=${key}&dates=2022-01-01,2023-11-30&ordering=-added`;


// map through platform data for name (playstation etc). if characters are greater than 40 show ...
const getPlatformStr = platforms => {
    const platformStr = platforms.map(pl => pl.platform.name).join(',');
    if (platformStr.length > 20) {
        return platformStr.substring(0, 20) + '...';
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
