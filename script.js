
const loaderEl = document.getElementById("js-preloader");
const gameList = document.querySelector(".gameList");
const loadMoreGamesBtn = document.querySelector(".main-button")
let nextGameListUrl = null;

// conditions for updated values (date)
const url = `https://api.rawg.io/api/games?key=${key}&dates=2023-01-01,2023-11-301&ordering=-added`;

// console.log(url, "check")

function loadGames(url) {
    loaderEl.classList.remove("loaded");

    fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data)
    })
}
loadGames(url);


// const getPlatformStr = (platforms) => {
//     const platformStr = platforms.map(pl => pl.platform.name).join(",")
// }