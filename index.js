// Recommended: All functions declared here
function cityContainer (targetCityName) {
    for (let city of cities) {
        if (city.name == targetCityName) {
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
// Recommended: Ask for the city name and then the rest of the code

const targetCityName = prompt ("Vilken stad?");
const matchingCity = cityContainer(targetCityName);


if (cityContainer(targetCityName) == null) {
    const h2 = document.querySelector("h2");
    h2.textContent = `${targetCityName} finns inte i databasen!`
    document.title = `${targetCityName} - Stad finns inte i databasen!`; 
} else {
    h2.textContent = `${matchingCity.name} ${cityContainer(targetCityName).country}`;
    document.title = `${matchingCity.name} - ${matchingCity.country}`; 
}
for (let city of cities) {
    citiesDiv.innerHTML += `<p class="cityBox">${city.name}</p>`; 
}

tablediv.innerHTML = `<p class = "cell"></p>`;

for (let city of cities){
    tablediv.innerHTML += `<p class ="cell head_row">${city.id}</p>`;
}


for (let city of cities) {
    tablediv.innerHTML += `<p class= "cell head_column">${city.id}-${city.name}</p>`;
    tablediv.innerHTML += `<p class ="cell"></p>`;
    for (let keys of distances) {
        const pCell = document.createElement("p");
        if (keys.city1 == city.id || keys.city2 == city.id) {
            tablediv.appendChild(pCell);
            pCell.classList.add("cell");
            pCell.textContent = keys.distance / 10 ;
        }
       
    }
  
}













