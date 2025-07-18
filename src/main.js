const input = document.getElementById("search_term");
const searchButton = document.getElementById("search_btn");
const results = document.getElementById("results");

const resultsZone = document.querySelector(".results");

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
