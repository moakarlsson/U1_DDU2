
const h2 = document.querySelector("h2");
const h3 = document.querySelector("h3");
const citiesDiv = document.getElementById("cities");
const cityElement = document.createElement("p");
const tablediv = document.getElementById("table");
const targetCityName = prompt ("Vilken stad?");
const cityFound = searchCity (targetCityName);

createTable()
createAllCityBoxes();

function createAllCityBoxes() {
    for (let city of cities) { 
        const cityElement = document.createElement("p");
        cityElement.textContent = city.name; 
        cityElement.classList.add("cityBox"); 
        citiesDiv.appendChild(cityElement); 
    } 
}
function searchCity (targetCityName) { 
    for (let city of cities) {
        if (city.name === targetCityName) {
            return city; 
        }
    }
    return null; 
}
function markCityBox(kindOfCity, cityObject, distance = null) {
    const cityElements = document.querySelectorAll(".cityBox")
    for (let cityElement of cityElements) { 
       if (cityElement.textContent === cityObject.name) {
        cityElement.classList.add(kindOfCity);

        if (kindOfCity == "closest" && distance !== null){
            cityElement.innerHTML += ` ligger ${distance} mil bort`;
        }
        if (kindOfCity == "furthest" && distance !== null){
            cityElement.innerHTML += ` ligger ${distance} mil bort`;
        }
     }
  }
}
function getClosestCity(targetCity) {
    let closestCity = null;
    let minDistance = Infinity;

    for (let counter of distances) {
        if (counter.city1 === targetCity.id || counter.city2 === targetCity.id) {
            let otherCityId;

            if (counter.city1 === targetCity.id) {
                otherCityId = counter.city2;
            } else {
                otherCityId = counter.city1;
            }
            let otherCity = null;
            for (let city of cities) {
                if (city.id === otherCityId) {
                    otherCity = city;
                    break; 
                }
            }
            if (counter.distance < minDistance) {
                minDistance = counter.distance;
                closestCity = otherCity;
            }
        }
    }
    return { city: closestCity, distance: minDistance };
}
function getFurthestCity(targetCity) {
    let farthestCity = null;
    let maxDistance = -Infinity;

    for (let counter of distances) {
        if (counter.city1 === targetCity.id || counter.city2 === targetCity.id) {
            let otherCityId;

            if (counter.city1 === targetCity.id) {
                otherCityId = counter.city2;
            } else {
                otherCityId = counter.city1;
            }
            let otherCity = null;
            for (let city of cities) {
                if (city.id === otherCityId) {
                    otherCity = city;
                    break; 
                }
            }
            if (counter.distance > maxDistance) {
                maxDistance = counter.distance;
                farthestCity = otherCity;
            }
        }
    }
    return { city: farthestCity, distance: maxDistance };
}
function findDistance(city1Id, city2Id) {
    for (let distanceObject of distances) {
        if (
            (distanceObject.city1 === city1Id && distanceObject.city2 === city2Id) ||
            (distanceObject.city1 === city2Id && distanceObject.city2 === city1Id)
        ) {
            return distanceObject.distance; 
        }
    }
    return null;
}

if (cityFound == null) {
    h2.textContent = `${targetCityName} finns inte i databasen!`
    document.title = "Not found"; 
    h3.textContent= "";
} else {
    h2.textContent = `${cityFound.name} (${cityFound.country})`;
    document.title = `${cityFound.name}`; 
    markCityBox("target", cityFound);
    const {city: closestCity, distance: minDistance} = getClosestCity(cityFound);
    markCityBox("closest", closestCity, minDistance /10);
    const {city: farthestCity, distance: maxDistance} = getFurthestCity(cityFound);
    markCityBox("furthest", farthestCity, maxDistance /10);

    h3.textContent = `Av städerna i databasen så ligger ${ closestCity.name } närmast och ${farthestCity.name} längst bort.`;        
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

for (let cityRow of cities) {
    let classEvenrows;
    if (cityRow.id % 2 === 0){
        classEvenrows= "even_row";
    } else{
        classEvenrows = "";
    }

    const cityCell = document.createElement("p");
    cityCell.classList.add("cell", "head_column");
    cityCell.textContent = ` ${cityRow.id}-${cityRow.name}`;
    cityCell.classList.add("even_row");
    tablediv.appendChild(cityCell);

 for (let cityColumn of cities) {
        let classEvenCols;
        if (cityColumn.id % 2 === 0){
            classEvenCols = "even_col";
        } else {
            classEvenCols = "";
        }
        let cellClass = `cell ${classEvenrows} ${classEvenCols}`;

    if (cityRow.id === cityColumn.id) {
        tablediv.innerHTML += `<p class="${cellClass}"></p>`;
    } else {
        const distance = findDistance(cityRow.id, cityColumn.id);
        
        let cellContent;
        if (distance) {
            cellContent = distance / 10;
        } else {
            cellContent = "";
        }
        tablediv.innerHTML += `<p class="${cellClass}">${cellContent}</p>`;
    }
   }
  }   
}




















