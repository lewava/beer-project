let url = `https://api.punkapi.com/v2/beers/1`; // import url


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
    let h3Tag = document.createElement('h3');
    let divTag = document.createElement('div');
    h3Tag.textContent = beer.name;
    const beerInfo = [];
    imgTag.src = beer.image_url;
    
    let ingredients = allIngredients(beer);

    beerInfo[0] = beer.name;
    beerInfo[1] = `Description: ${beer.description}`;
    beerInfo[2] = `Alcohol by volume: ${beer.abv}%`;
    beerInfo[3] = `The volume of this bottle is: ${beer.volume.value}  ${beer.volume.unit}.`;
    beerInfo[4] = `Goes well with: ${beer.food_pairing[0]}, ${beer.food_pairing[1]} & ${beer.food_pairing[2]}`;
    beerInfo[5] = `Brewers tip: ${beer.brewers_tips}, `
   
    

    for (let i = 0; i < beerInfo.length; i++) {

        const element = beerInfo[i];
        let liTag = document.createElement('li');

        liTag.textContent = beerInfo[i];

        ulTag.appendChild(liTag);
    }

    h3Tag.classList.add("beerName");

    mainTag.appendChild(imgTag);
    divTag.appendChild(h3Tag);
    divTag.appendChild(ulTag);
    mainTag.appendChild(divTag);
    mainTag.appendChild(ingredients);
}

//get ingredients to the beer 
function allIngredients(beerIngredients) {
    let divWrapper = document.createElement('div');
    let ulTagHops = document.createElement('ul');
    let ulTagMalt = document.createElement('ul');
    let h3TagHops = document.createElement('h3');
    h3TagHops.textContent = "Hops";
    let h3TagMalt = document.createElement('h3');
    h3TagMalt.textContent = "Malt";
    let iHops = beerIngredients.ingredients.hops;
    let iMalt = beerIngredients.ingredients.malt;
    let iYeast = beerIngredients.ingredients.yeast;
    
    
    ulTagHops.appendChild(h3TagHops);
    
    for(let i = 0; i < iHops.length; i++){
      
      let liTag = document.createElement('li');
        let hopsInfo = iHops[i].name +" "+ iHops[i].amount.value +" "+ iHops[i].amount.unit;
      
        liTag.textContent = hopsInfo;
        ulTagHops.appendChild(liTag);
    
    }
    ulTagMalt.appendChild(h3TagMalt);
    for(let i = 0; i < iMalt.length; i++){
        let liTag = document.createElement('li');        
        let maltInfo = iMalt[i].name + " "+ iMalt[i].amount.value + " "+ iMalt[i].amount.unit;
    
        liTag.textContent = maltInfo;   
        ulTagMalt.appendChild(liTag);
    }
    divWrapper.classList.add("textColumn");
    divWrapper.appendChild(ulTagHops);
    divWrapper.appendChild(ulTagMalt);
    return divWrapper;


}