// Recommended: All functions declared here


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
for (let city of cities) {
    citiesDiv.innerHTML+= `<p class="cityBox">${city.name}</>`;
    if (targetCityName == city.name) {
        h2.textContent = city.name + " " + "(" + city.country + ")";
    } else {
        h2.textContent = targetCityName + "finns inte i databasen";
    }  
}
 









