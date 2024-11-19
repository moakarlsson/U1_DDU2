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
const changeTabName = document.querySelector("title");
const citiesDiv = document.getElementById("cities");
const main = document.querySelector("main");
const h1 = document.querySelector("h1");
const h2 = document.querySelector("h2");
const h3 = document.querySelector("h3");
const p = document.querySelector("p");
const div = document.querySelector("div");
// Recommended: Ask for the city name and then the rest of the code

const targetCityName = prompt ("Vilken stad?");

if (cityContainer(targetCityName) == null) {
    h2.textContent = targetCityName + " finns inte i databasen! ";
} else {
    h2.textContent = targetCityName + " (" + cityContainer(targetCityName).country + ")";
}
for (let city of cities) {
    citiesDiv.innerHTML+= `<p class="cityBox">${city.name}</p>`;
    
}


 









