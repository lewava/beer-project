const ulContainer = document.querySelector(".ul-container");
const ul = document.querySelector(".list");
document.querySelector(".close").addEventListener("click", closeList);
checkInput();

function checkInput() {
  document.querySelector(".search").addEventListener("click", () => {
    const input = document.querySelector(".input");

    const fetchName = fetch(
      `https://api.punkapi.com/v2/beers?beer_name=${input.value}`
    );
    const fetchHops = fetch(
      `https://api.punkapi.com/v2/beers?hops=${input.value}`
    );
    const fetchMalt = fetch(
      `https://api.punkapi.com/v2/beers?malt=${input.value}`
    );
    const fetchBF = fetch(
      `https://api.punkapi.com/v2/beers?malt=${input.value}`
    );
    const fetchBA = fetch(
      `https://api.punkapi.com/v2/beers?malt=${input.value}`
    );
    const fetchAG = fetch(
      `https://api.punkapi.com/v2/beers?malt=${input.value}`
    );
    const fetchAL = fetch(
      `https://api.punkapi.com/v2/beers?malt=${input.value}`
    );

    if (typeof input.value === "string") {
      Promise.all([fetchName, fetchHops, fetchMalt])
        .then((values) => {
          return Promise.all(values.map((resp) => resp.json()));
        })
        .then((data) => {
          addListItem(data);
        })
        .catch((err) => err.message);
    } else if (typeof input.value === "number") {
      Promise.all([fetchAG, fetchAL])
        .then((values) => {
          return Promise.all(values.map((resp) => resp.json()));
        })
        .then((data) => {
          addListItem(data);
        })
        .catch((err) => err.message);
    }

    ulContainer.style.display = "flex";
  });
}

function closeList() {
  document.querySelector(".list").innerHTML = "";
  ulContainer.style.display = "none";
}

function addListItem(beers) {
  console.log(beers);
  beers.forEach((element) => {
    element.forEach((element) => {
      console.log(element.name);
      li = document.createElement("li");
      li.className = "li";
      li.textContent = element.name;
      ul.appendChild(li);
    });
  });
}
