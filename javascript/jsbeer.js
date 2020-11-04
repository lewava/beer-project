let beerID = 2;
let url = `https://api.punkapi.com/v2/beers/${beerID}`;
let urlRandom = `https://api.punkapi.com/v2/beers/random`;

let randomButton = document.querySelector("#randomBeer");

/* Get one beer */
async function myFetch(url) {
    let response = await fetch(url);
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    } else {
        return response.json();
    }
}
//
myFetch(url) 
.then(data => {
  let beer = data[0];

getBeerInformation(beer);

})
.catch(e => {
    console.log("There is a problem! " + e.message);
});

// Get information from the beer
let mainTag = document.querySelector('#beer-info');

function getBeerInformation(beer) {
    mainTag.innerHTML = "";
    let ulTag = document.createElement('ul');
    let imgTag = document.createElement('img');
    const beerInfo = [];
    imgTag.src = beer.image_url;
    
    let ingredients = allIngredients(beer);

    beerInfo[0] = beer.name;
    beerInfo[1] = beer.description;
    beerInfo[2] = `${beer.abv}%`;
    beerInfo[3] = `${beer.volume.value} ${beer.volume.unit}`;
    beerInfo[4] = `${beer.food_pairing[0]}, ${beer.food_pairing[1]} & ${beer.food_pairing[2]}`;
    beerInfo[5] = `${beer.brewers_tips}, `
   
    

    for (let i = 0; i < beerInfo.length; i++) {

        const element = beerInfo[i];
        let liTag = document.createElement('li');

        liTag.textContent = beerInfo[i];

        ulTag.appendChild(liTag);
    }

    mainTag.appendChild(imgTag);

    mainTag.appendChild(ulTag);
    mainTag.appendChild(ingredients);
}

//get ingredients to the beer 
function allIngredients(beerIngredients) {
    let ulTag = document.createElement('ul');
    let h3TagHops = document.createElement('h3');
    h3TagHops.textContent = "Hops";
    let h3TagMalt = document.createElement('h3');
    h3TagMalt.textContent = "Malt";
    let iHops = beerIngredients.ingredients.hops;
    let iMalt = beerIngredients.ingredients.malt;
    let iYeast = beerIngredients.ingredients.yeast;
    
    
    ulTag.appendChild(h3TagHops);
    for(let i = 0; i < iHops.length; i++){
      
      let liTag = document.createElement('li');
        let hopsInfo = iHops[i].name +" "+ iHops[i].amount.value +" "+ iHops[i].amount.unit;
      
        liTag.textContent = hopsInfo;
        ulTag.appendChild(liTag);
    
    }
    ulTag.appendChild(h3TagMalt);
    for(let i = 0; i < iMalt.length; i++){
        let liTag = document.createElement('li');        
        let maltInfo = iMalt[i].name + " "+ iMalt[i].amount.value + " "+ iMalt[i].amount.unit;
    
        liTag.textContent = maltInfo;   
        ulTag.appendChild(liTag);
    }

    return ulTag;


}
//random knappen   fr o m här funkar det ej 
//PS. vi ville att länken i navbar skulle fungera som knapp. men har ej kommit så långt än


randomButton.addEventListener('click', () => {
   async function addRandomBeer(urlRandom) {
    let newBeer = await myFetch(urlRandom);
    console.log(urlRandom);
    getBeerInformation(newBeer[0]);
       
    }
    addRandomBeer(urlRandom);       
});

