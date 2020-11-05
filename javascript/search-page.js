const input = document.querySelector(".input");
const ulContainer = document.querySelector(".ul-container");
const ul = document.querySelector(".list");
const left = document.querySelector(".left");
const right = document.querySelector(".right");
const counter = document.querySelector(".counter");
const select = document.querySelector("select");
let currentPage = 1;

document.querySelector(".close").addEventListener("click", closeList);
checkInput();

function getData(input) {
  switch (select.value) {
    case "name":
      return fetch(`https://api.punkapi.com/v2/beers?beer_name=${input}`);
    case "hops":
      return fetch(`https://api.punkapi.com/v2/beers?hops=${input}`);
    case "malt":
      return fetch(`https://api.punkapi.com/v2/beers?malt=${input}`);
    case "brewed-before":
      return fetch(`https://api.punkapi.com/v2/beers?brewed_before=${input}`);
    case "brewed-after":
      return fetch(`https://api.punkapi.com/v2/beers?brewed_after=${input}`);
    case "abv-greater":
      return fetch(`https://api.punkapi.com/v2/beers?abv_gt=${input}`);
    case "abv-lesser":
      return fetch(`https://api.punkapi.com/v2/beers?abv_lt=${input}`);
    default:
      alert("Please select a search method");
  }
}

function checkInput() {
  document.querySelector(".search").addEventListener("click", () => {
    let filteredInput = input.value.trim().replace(" ", "_");

    if (filteredInput !== "") {
      getData(filteredInput)
        .then((resp) => resp.json())
        .then((data) => {
          let beerNames = getBeerNames(data);
          console.log(beerNames);
          changeCurrentPage(beerNames);
          addItems(beerNames, currentPage);
          ulContainer.style.display = "flex";
          input.value = "";
        })
        .catch((err) => err.message);
    } else {
      alert("Input field is empty.");
    }
  });
}

function getBeerNames(beers) {
  let beerNames = [];
  beers.forEach((element) => {
    beerNames.push(element.name);
  });
  return beerNames;
}

function changeCurrentPage(beerNames) {
  let numberOfPages = Math.ceil(beerNames.length / 10);

  if (numberOfPages === 0) {
    numberOfPages = 1;
  }

  document.querySelector(".pages").textContent = numberOfPages;

  left.addEventListener("click", () => {
    if (currentPage === 1) {
      counter.textContent = currentPage;
      addItems(beerNames, currentPage);
    } else {
      currentPage -= 1;
      counter.textContent = currentPage;
      addItems(beerNames, currentPage);
    }
  });

  right.addEventListener("click", () => {
    if (currentPage === numberOfPages) {
      counter.textContent = currentPage;
      addItems(beerNames, currentPage);
    } else {
      currentPage += 1;
      counter.textContent = currentPage;
      addItems(beerNames, currentPage);
    }
  });
}

function addItems(beerNames, currentPage) {
  ul.innerHTML = "";
  if (currentPage === 1) {
    for (let i = 0; i < 10; i++) {
      li = document.createElement("li");
      li.className = "li";
      li.textContent = beerNames[i];
      ul.appendChild(li);
    }
  } else {
    const number = Math.round(currentPage) * 10 - 10;
    for (let i = number; i < number + 10; i++) {
      li = document.createElement("li");
      li.className = "li";
      li.textContent = beerNames[i];
      ul.appendChild(li);
    }
  }
}

function closeList() {
  document.querySelector(".list").innerHTML = "";
  ulContainer.style.display = "none";
}
