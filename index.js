//Funktion för att hitta cityName
const h2 = document.querySelector("h2");
const h3 = document.querySelector("h3");
const citiesDiv = document.getElementById("cities");
const cityElement = document.createElement("p");
const tablediv = document.getElementById("table");


const targetCityName = prompt ("Vilken stad?");
const cityFound = searchCity (targetCityName);

createTable()
createAllCityBoxes();
// Första funktionen för att svid anrop skapa boxarna för städerna
function createAllCityBoxes() {
    citiesDiv.innerHTML = "";
    for (let city of cities) { // kör igenom enn aray av objekten cities
        const cityElement = document.createElement("p");
        cityElement.textContent = city.name; // egenskap i objekt 
        cityElement.classList.add("cityBox"); 
        citiesDiv.appendChild(cityElement); //elementet P skapas och sätts i diven citiesDiv( gemensam klass för alla städer)
    
    } 
}

function searchCity (targetCityName) { // funktion för att markera och hitta targetName = namn på stad som finns i arrayen och som matchar med propmt
    for (let city of cities) {
        if (city.name === targetCityName) {
            return city; 
        }
    }
    return null; 
}

function markCityBox(kindOfCity, cityObject) {
    const cityElements = document.querySelectorAll(".cityBox")
    for (let cityElement of cityElements) { 
       if (cityElement.textContent === cityObject.name) {
        cityElement.classList.add(kindOfCity);
     }
  }
}

function getClosestCity(targetCity) {
    let closestCity = null;
    let minDistance = Infinity;

    for (let counter of distances) {
        if (counter.city1 === targetCity.id || counter.city2 === targetCity.id) {
            const otherCityId = counter.city1 === targetCity.id ? counter.city2 : counter.city1;
            const otherCity = cities.find(city => city.id === otherCityId);

            if (counter.distance < minDistance) {
                minDistance = counter.distance;
                closestCity = otherCity;
            }
        }
    }
    return closestCity
}

function getFurthestCity(targetCity) {
    let farthestCity = null;
    let maxDistance = -Infinity;

    for (let counter of distances) {
        if (counter.city1 === targetCity.id || counter.city2 === targetCity.id) {
            const otherCityId = counter.city1 === targetCity.id ? counter.city2 : counter.city1;
            const otherCity = cities.find(city => city.id === otherCityId);

            if (counter.distance > maxDistance) {
                maxDistance = counter.distance;
                farthestCity = otherCity;
            }
        }
    }

    return farthestCity;
}

if (cityFound == null) {
    h2.textContent = `${targetCityName} finns inte i databasen!`
    document.title = "Not found"; 
    h3.textContent= "";
} else {
    h2.textContent = `${cityFound.name} (${cityFound.country})`;
    document.title = `${cityFound.name}`; 
    markCityBox("target", cityFound);
    const closestCity = getClosestCity(cityFound);
    const farthestCity = getFurthestCity(cityFound);
     h3.textContent = `Av städerna i databasen så ligger ${ closestCity.name } närmast och ${farthestCity.name} längst bort.`;


     if (closestCity) {
        markCityBox("closest", closestCity); //anropar funktionrn markCityBox med två argument.
    }
    
    if (farthestCity) {
        markCityBox("furthest", farthestCity); //anropar funktionen markcitybox med två argument. 
    }
}


function createTable(){
const emptyCell = document.createElement("p");
emptyCell.classList.add("cell");
tablediv.appendChild(emptyCell);

for (let city of cities){
    const idCell = document.createElement ("p");
    idCell.classList.add("cell", "head_row");
    idCell.textContent = city.id;
    tablediv.appendChild(idCell);
    
}

for (let cityRow of cities){
    let classEvenrows = "";
    if (cityRow.id % 2 == 0) {
     classEvenrows= "even_row";
    }

 const cityCell = document.createElement("p");
 cityCell.classList.add("cell", "head_column");
 cityCell.textContent = ` ${cityRow.id}-${cityRow.name}`;
 cityCell.classList.add("even_row");
 tablediv.appendChild(cityCell);

    for (let cityColumn of cities) {
        let classEvenCols = "";
        if ( cityColumn.id % 2 === 0) {
            classEvenCols = "even_col";
        }

        let cellClass = `cell ${classEvenrows} ${classEvenCols}`;
    
        if (cityRow.id == cityColumn.id) {
            tablediv.innerHTML += `<p class="${cellClass}"></p>`;
        } else{
            let match = distances.filter(d => d.city1 == cityRow.id && d.city2 == cityColumn.id || d.city1 == cityColumn.id && d.city2 == cityRow.id)[0]
            tablediv.innerHTML += `<p class="${cellClass}">${match.distance / 10}</p>`;
        }
     }
   }
}



















/*function cityContainer (targetCityName) {
    for (let city of cities) {
        if (targetCityName == city.name) {
            return city; 
        }
    }
    return null; 
}
//Funktion för att hitta närmaste city
 function getClosestCity(targetCity) {
     let closestCity = null;
     let minDistance = Infinity;

     for (let counter of distances) {
         if (counter.city1 === targetCity.id || counter.city2 === targetCity.id) {
             const otherCityId = counter.city1 === targetCity.id ? counter.city2 : counter.city1;
             const otherCity = cities.find(city => city.id === otherCityId);

             if (counter.distance < minDistance) {
                 minDistance = counter.distance;
                 closestCity = otherCity;
             }
         }
     }

     return closestCity;
 }
 //Funktion för att hitta city längst bort
 function getFurthestCity(targetCity) {
     let farthestCity = null;
     let maxDistance = -Infinity;

     for (let counter of distances) {
         if (counter.city1 === targetCity.id || counter.city2 === targetCity.id) {
             const otherCityId = counter.city1 === targetCity.id ? counter.city2 : counter.city1;
             const otherCity = cities.find(city => city.id === otherCityId);

             if (counter.distance > maxDistance) {
                 maxDistance = counter.distance;
                 farthestCity = otherCity;
             }
         }
     }

     return farthestCity;
 }

// Recommended: constants with references to existing HTML-elements
const citiesDiv = document.getElementById("cities");
const h1 = document.querySelector("h1");
const h3 = document.querySelector("h3");
const tablediv = document.getElementById("table");
const h2 = document.querySelector("h2");
const targetCityName = prompt ("Vilken stad?");
const matchingCity = cityContainer(targetCityName);


if (matchingCity == null) {
    h2.textContent = `${targetCityName} finns inte i databasen!`
    document.title = "Not found"; 
    h3.textContent= "";
} else {
    h2.textContent = `${matchingCity.name} (${matchingCity.country})`;
    document.title = `${matchingCity.name}`; 
    const closestCity = getClosestCity(matchingCity);
    const farthestCity = getFurthestCity(matchingCity);
    h3.textContent = `Av städerna i databsen så ligger  ${closestCity ? closestCity.name : "Ingen"} närmast och ${farthestCity ? farthestCity.name : "Ingen"} längst bort`;
}

 for (let city of cities) {
    const cityElement = document.createElement ("p");
    cityElement.classList.add("cityBox");
    cityElement.textContent = city.name;
    citiesDiv.appendChild(cityElement);
    const closestCity = getClosestCity(matchingCity);
    const farthestCity = getFurthestCity(matchingCity);
    
    if ( targetCityName === city.name){
        cityElement.classList.add("target"); 
    } 
    if (closestCity && closestCity.name === city.name) {
        cityElement.classList.add("closest");
    }
    if (farthestCity && farthestCity.name === city.name) {
        cityElement.classList.add("furthest");
        

    }
 } 

 const emptyCell = document.createElement("p");
 emptyCell.classList.add("cell");
 tablediv.appendChild(emptyCell);

    for (let city of cities){
     const idCell = document.createElement ("p");
     idCell.classList.add("cell","head_row");
     idCell.textContent = city.id;
     tablediv.appendChild(idCell);
 }

 for (let cityRow of cities){
    let classEvenrows = "";
    if (cityRow.id % 2 == 0) {
        classEvenrows= "even_row";
 }
        
     const cityCell = document.createElement("p");
     cityCell.classList.add("cell", "head_column", "even_row");
     cityCell.textContent = ` ${cityRow.id}-${cityRow.name}`;
     tablediv.appendChild(cityCell);

    for (let cityColumn of cities) {
        let classEvenCols = "";
        if ( cityColumn.id % 2 === 0) {
            classEvenCols = "even_col";
        }

        if (cityRow.id == cityColumn.id) {
            tablediv.innerHTML += `<p class= "cell ${classEvenrows}" ${classEvenCols}</p>`;
        } else{
            let match = distances.filter(d => d.city1 == cityRow.id && d.city2 == cityColumn.id || d.city1 == cityColumn.id && d.city2 == cityRow.id)[0]
                tablediv.innerHTML += `<p class="cell ${classEvenrows} ${classEvenCols}">${match.distance / 10}</p>`   
        }
    }
 } */





 





















 



















