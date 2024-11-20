
function cityContainer (targetCityName) {
    for (let city of cities) {
        if (targetCityName == city.name) {
            return city; 
        }
    }
    return null; 
}

// Recommended: constants with references to existing HTML-elements
const citiesDiv = document.getElementById("cities");
const main = document.querySelector("main");
const h1 = document.querySelector("h1");
const h3 = document.querySelector("h3");
const p = document.querySelector("p");
const div = document.querySelector("div");
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
    const farthestCity = getFarthestCity(matchingCity);
    h3.textContent = `Av städerna i databsen så ligger  ${closestCity ? closestCity.name : "Ingen"} närmast och ${farthestCity ? farthestCity.name : "Ingen"} längst bort`;
}




 for (let city of cities) {
    const cityElement = document.createElement ("p");
    cityElement.classList.add("cityBox");
    cityElement.textContent = city.name;
    citiesDiv.appendChild(cityElement);
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

 for (let city of cities) {
    const cityCell = document.createElement("p");
    cityCell.classList.add("cell", "head_column");
    cityCell.textContent = `${city.id}-${city.name}`;
    tablediv.appendChild(cityCell);

    const emptyDistancecell = document.createElement("p");
    emptyDistancecell.classList.add("cell");
    tablediv.appendChild(emptyDistancecell);
     
    
     for (let keys of distances) {
         if (keys.city1 == city.id || keys.city2 == city.id) {
             const distanceCell = document.createElement("p");
             distanceCell.classList.add("cell");
             distanceCell.textContent = keys.distance / 10;
             tablediv.appendChild(distanceCell);
         }  
     } 
 }



















