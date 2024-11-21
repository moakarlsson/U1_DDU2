//Funktion för att hitta cityName
function cityContainer (targetCityName) {
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

const closestCity = getClosestCity(matchingCity);
const furthestCity = getFurthestCity(matchingCity);

 for (let city of cities) {
    const cityElement = document.createElement ("p");
    cityElement.classList.add("cityBox");
    cityElement.textContent = city.name;
    citiesDiv.appendChild(cityElement);
    if (targetCityName == city.name){
        cityElement.classList.add("target"); 
    } 
    if (closestCity && closestCity.name === city.name) {
        cityElement.classList.add("closest");
    }
    if (furthestCity && furthestCity.name === city.name) {
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
 }






//   for (let city of cities){
//     const idCell = document.createElement ("p");
//     idCell.classList.add("cell","head_row");
//     idCell.textContent = city.id;
//     tablediv.appendChild(idCell);
//   }


//     for (let city2 of cities) {
//        let classEvenCol = " ";
//        if ( city.id % 2 === 0){
//            classEvenCol = "even_col"
//        } 

    



//  }





 




















// //     const emptyDistancecell = document.createElement("p");
// //     emptyDistancecell.classList.add("cell");
// //     tablediv.appendChild(emptyDistancecell);
     
    
// //      for (let keys of distances) {
// //          if (keys.city1 == city.id || keys.city2 == city.id) {
// //              const distanceCell = document.createElement("p");
// //              distanceCell.classList.add("cell");
// //              distanceCell.textContent = keys.distance / 10;
// //              tablediv.appendChild(distanceCell);
// //          }  
// //      } 
// //     }
// //  }
 



















