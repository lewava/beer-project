const closeUl = document.querySelector(".close");
const search = document.querySelector(".search");
const name = document.querySelector(".name");
const hops = document.querySelector(".hops");
const malt = document.querySelector(".malt");
const bb = document.querySelector(".bb");
const ba = document.querySelector(".ba");
const al = document.querySelector(".al");
const ag = document.querySelector(".ag");
const ulContainer = document.querySelector(".ul-container");
const ul = document.querySelector(".list");
const left = document.querySelector(".left");
const right = document.querySelector(".right");
const counter = document.querySelector(".counter");
const oldUrl = JSON.parse(sessionStorage.getItem("url"));
const oldCurrentPage = JSON.parse(sessionStorage.getItem("currentPage"));
let currentPage = 1;

if (oldUrl !== null) {
  Caching(oldUrl, oldCurrentPage);
}

closeUl.addEventListener("click", closeList);
search.addEventListener("click", searchEvent);

function getInput() {
  let url = `https://api.punkapi.com/v2/beers?page=1&per_page=10&`;

  if (name.value !== "") url += `beer_name=${name.value}&`;
  if (hops.value !== "") url += `hops=${hops.value}&`;
  if (malt.value !== "") url += `malt=${malt.value}&`;
  if (bb.value !== "") url += `brewed_before=${bb.value}&`;
  if (ba.value !== "") url += `brewed_after=${ba.value}&`;
  if (al.value !== "") url += `abv_lt=${al.value}&`;
  if (ag.value !== "") url += `abv_gt=${ag.value}&`;

  return url;
}

function getData(url) {
  fetch(url)
    .then((resp) => resp.json())
    .then((data) => {
      const beerNames = getBeerNames(data);
      sessionStorage.setItem("url", JSON.stringify(url));
      addItems(beerNames);
      listEvent(data);
    })
    .catch((err) => err.message);
}

function searchEvent(event) {
  event.preventDefault();
  const url = getInput();
  getData(url);
  changePages(url, currentPage);
}

function getBeerNames(data) {
  let beerNames = [];
  data.forEach((element) => {
    beerNames.push(element.name);
  });
  return beerNames;
}

function addItems(beerNames) {
  ul.innerHTML = "";
  for (let i = 0; i < beerNames.length; i++) {
    li = document.createElement("li");
    li.className = "li";
    li.textContent = beerNames[i];
    ul.appendChild(li);
  }
  ulContainer.style.display = "flex";
}

function changePages(url, currentPage) {
  counter.textContent = currentPage;
  let newUrl = url;
  left.addEventListener("click", () => {
    if (currentPage === 1) {
      counter.textContent = currentPage;
      newUrl =
        url.substring(0, 38) + currentPage + url.substring(39, url.length);
      sessionStorage.setItem("currentPage", JSON.stringify(currentPage));
      sessionStorage.setItem("url", JSON.stringify(newUrl));
      getData(newUrl);
    } else {
      currentPage -= 1;
      counter.textContent = currentPage;
      newUrl =
        url.substring(0, 38) + currentPage + url.substring(39, url.length);
      sessionStorage.setItem("currentPage", JSON.stringify(currentPage));
      sessionStorage.setItem("url", JSON.stringify(newUrl));
      getData(newUrl);
    }
  });

  right.addEventListener("click", () => {
    if (currentPage === 100) {
      counter.textContent = currentPage;
      newUrl =
        url.substring(0, 38) + currentPage + url.substring(39, url.length);
      sessionStorage.setItem("currentPage", JSON.stringify(currentPage));
      sessionStorage.setItem("url", JSON.stringify(newUrl));
      getData(newUrl);
    } else {
      currentPage += 1;
      counter.textContent = currentPage;
      newUrl =
        url.substring(0, 38) + currentPage + url.substring(39, url.length);
      sessionStorage.setItem("currentPage", JSON.stringify(currentPage));
      sessionStorage.setItem("url", JSON.stringify(newUrl));
      getData(newUrl);
    }
  });
}

function listEvent(data) {
  const items = document.querySelectorAll(".li");
  for (let i = 0; i < items.length; i++) {
    const item = items[i];

    item.addEventListener("click", () => {
      data.forEach((element) => {
        if (element.name === item.textContent) {
          sessionStorage.setItem("object", JSON.stringify(element));
          window.open("info-page.html", "_self");
        }
      });
    });
  }
}

function Caching(oldUrl, oldCurrentPage) {
  if (oldCurrentPage === null) oldCurrentPage = 1;
  getData(oldUrl);
  changePages(oldUrl, oldCurrentPage);
}

function closeList() {
  ulContainer.style.display = "none";
}
