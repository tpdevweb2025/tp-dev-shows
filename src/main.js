const input = document.getElementById("search_term");
const searchButton = document.getElementById("search_btn");
const results = document.getElementById("results");
const resultsZone = document.querySelector(".results");

if (searchButton) {
  searchButton.addEventListener("click", (event) => {
    event.preventDefault();
    if (input.value.length < 1) {
      return;
    }
    results.style.display = "block";
    document.getElementById("search_query").textContent = input.value;
    fetch("https://api.tvmaze.com/search/shows?q=" + input.value)
      .then((response) => response.json())
      .then((shows) => {
        resultsZone.innerHTML = "";
        const nb = shows.length >= 6 ? 6 : shows.length;
        for (let i = 0; i < nb; i++) {
          const show = shows[i].show;
          const date =
            show.premiered != null ? show.premiered.split("-")[0] : "N/C";
          const category =
            show.genres.length > 0
              ? show.genres.join(" / ").slice(0, 24) + "..."
              : "N/C";
          resultsZone.innerHTML += `<div class="result">
            <div class="content">
              <div class="title">
                <h2>${show.name}</h2>
              </div>
              <div class="infos">
                <span class="year">${date}</span> -
                <span class="nb_episodes_${i}"></span> épisodes
              </div>
              <div class="theme">
                <a href="#" class="category">
                  ${category}
                </a>
              </div>
              <div class="cta">
                <a href="details.html?id=${show.id}">En savoir plus</a>
              </div>
            </div>
          </div>`;
          fetch(`https://api.tvmaze.com/shows/${show.id}/episodes`)
            .then((response) => response.json())
            .then((episodes) => {
              const nbEpisodes = episodes.length;
              document.querySelector(".nb_episodes_" + i).textContent =
                nbEpisodes;
            });
        }
      });
  });
}

// Permet la vérification de notre présence sur details.html
const detailsName = document.querySelector("#details-name");

if (detailsName) {
  // On est bien sur la page details
  const episodesZone = document.querySelector(".episodes"); // Zone d'accueil des épisodes
  const params = new URLSearchParams(document.location.search);
  const id = params.get("id"); // ID = 16

  fetch(`https://api.tvmaze.com/shows/${id}/episodes`) // https://api.tvmaze.com/shows/16/episodes
    .then((response) => response.json())
    .then((episodes) => {
      console.log(episodes); // Tableau de tous les épisodes
      fetch(`https://api.tvmaze.com/shows/${id}`) // https://api.tvmaze.com/shows/1412
        .then((response) => response.json())
        .then((show) => {
          document.querySelector("#details-name").textContent = show.name;
          document.querySelector("#year").textContent =
            show.premiered.split("-")[0]; // split => ["2024","12","12"]
          document.querySelector("#nb-episodes").textContent = episodes.length; // Longueur du tableau d'épisodes
          document.querySelector(".theme > a").textContent =
            show.genres.length > 0 ? show.genres.join(" / ") : "N/C"; // Affichage des genres espacés par un /
        });
      for (let episode of episodes) {
        const image =
          episode.image !== null
            ? episode.image.medium
            : "https://picsum.photos/600/400";
        episodesZone.innerHTML += `
          <div class="episode">
              <div class="thumbnail">
                  <img src="${image}" alt="${episode.name} - Saison ${episode.season} Episode ${episode.number}">
              </div>
              <div class="content">
                  <div class="season_episode">
                      <a href="episode.html?id=${episode.id}">Saison ${episode.season} - Episode ${episode.number}</a>
                  </div>
                  <h2>${episode.name}</h2>
                  <p>${episode.summary}</p>
              </div>
          </div>`;
      }
    });
}
