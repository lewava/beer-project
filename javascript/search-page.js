const input = document.querySelector(".input");
const ulContainer = document.querySelector(".ul-container");
const ul = document.querySelector(".list");
const left = document.querySelector(".left");
const right = document.querySelector(".right");
const counter = document.querySelector(".counter");

document.querySelector(".close").addEventListener("click", closeList);
checkInput();
 /*** vart är du? LEOOOON, skolan ekar tomt på leons */
/**
 * Lägg till validation.
 */
function checkInput() {
  document.querySelector(".search").addEventListener("click", () => {
    ul.innerHTML = "";
    let filteredInput = input.value.trim().replace(" ", "_");

    if (filteredInput !== '') {
      if (isNaN(input)) {
        const fetchName = fetch(
          `https://api.punkapi.com/v2/beers?beer_name=${filteredInput}`
        );
        const fetchHops = fetch(
          `https://api.punkapi.com/v2/beers?hops=${filteredInput}`
        );
        /* const fetchMalt = fetch(
          `https://api.punkapi.com/v2/beers?malt=${filteredInput}`
        );
        const fetchBB = fetch(
          `https://api.punkapi.com/v2/beers?brewed_before=${filteredInput}`
        );
        const fetchBA = fetch(
          `https://api.punkapi.com/v2/beers?brewed_after=${filteredInput}`
        ); */

        Promise.all([fetchName])
          .then((values) => {
            return Promise.all(values.map((resp) => resp.json()));
          })
          .then((data) => {
            let beerNames = getBeerNames(data);
            changeCurrentPage(beerNames);
            addItems(beerNames);
          })
          .catch((err) => err.message);
      } else {
        const fetchAG = fetch(
          `https://api.punkapi.com/v2/beers?abv_gt=${filteredInput}`
        );
        const fetchAL = fetch(
          `https://api.punkapi.com/v2/beers?abv_lt=${filteredInput}`
        );

        Promise.all([fetchAG, fetchAL])
          .then((values) => {
            return Promise.all(values.map((resp) => resp.json()));
          })
          .then((data) => {
            let beerNames = getBeerNames(data);
            changeCurrentPage(beerNames);
            addItems(beerNames);
          })
          .catch((err) => err.message);
      }

      ulContainer.style.display = "flex";
      input.value = "";
    }else {
      alert('Input field is empty.');
    }
  });
}

function getBeerNames(beers) {
  let beerNames = [];
  beers.forEach((element) => {
    element.forEach((element) => {
      beerNames.push(element.name);
    });
  });
  return beerNames;
}

function changeCurrentPage(beerNames) {
  let currentPage = 1;
  let numberOfPages = Math.ceil(beerNames.length / 10);

  if (numberOfPages === 0) {
    numberOfPages = 1;
  }

  counter.textContent = currentPage;
  document.querySelector(".pages").textContent = numberOfPages;

  left.addEventListener("click", () => {
    if (currentPage === 1) {
      currentPage = 1;
    } else {
      currentPage -= 1;
      counter.textContent = currentPage;
    }
  });

  right.addEventListener("click", () => {
    if (currentPage === numberOfPages) {
      currentPage = numberOfPages;
    } else {
      currentPage += 1;
      counter.textContent = currentPage;
    }
  });
}

function addItems(beerNames) {
  for (let i = 0; i < 10; i++) {
    li = document.createElement("li");
    li.className = "li";
    li.textContent = beerNames[i];
    ul.appendChild(li);
  }
}

function closeList() {
  document.querySelector(".list").innerHTML = "";
  ulContainer.style.display = "none";
  counter.textContent = 1;
}
