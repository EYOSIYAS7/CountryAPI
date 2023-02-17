const countryEL = document.getElementById("input");
const btnEl = document.getElementById("btn");
const display = document.getElementById("country");
const detail = document.getElementById("detail");
const result = document.getElementById("result");
let html = [];
let matches = [];
countryEL.addEventListener("input", () => {
  search(countryEL.value);
  console.log(countryEL.value);
});

async function search(text) {
  const response1 = await fetch("countries.json");
  const data1 = await response1.json();

  let matches = data1.filter((element) => {
    let input = new RegExp(`^${text}`, "gi");
    return element.name.common.match(input);
  });
  if (text === "") {
    matches = [];
    display.innerHTML = "";

    detail.innerHTML = " country's Information";
  }
  data1.forEach((element) => {
    if (countryEL.value === element.name.common) {
    }
  });
  output(matches);
  return data1;
}
//
btnEl.addEventListener("click", () => {
  search(countryEL.value);
});

function output(mactharr) {
  mactharr.forEach((element) => {
    html.push(
      `
      <button class= " btn border-0 text-white btn-lg m-2 " style="background-color: rgba(0, 0, 0, 0.87)"  onclick ="cuontryfunc('${element.name.common}')"  >${element.name.common} </div>`
    );
  });

  display.innerHTML = html.join("");

  html = [];
}

function cuontryfunc(name) {
  search().then((data) => {
    countryEL.value = name;

    data.forEach((element) => {
      if (name === element.name.common) {
        detail.innerHTML = ` 
        <p class=" lead fw-bold fs-4"> Country's Information </p>
       common name: ${element.name.common} <br>
        official name: ${element.name.official} 
          
         <span class="fs-3">${element.flag} </span> 
          <br> 
         capital city: ${element.capital[0]} 
           <br>
         subregion: ${element.subregion}
         <br>
         
         Continent: ${element.continents[0]}
         <br>
         lat: ${element.latlng[0]} 
         <br>
         lng: ${element.latlng[1]}
         <br>
         map: <a href='${element.maps.googleMaps}' target='blank'>${element.maps.openStreetMaps}</a>
         <br>
         Population: ${element.population}
         
         <br>
         landlocked: ${element.landlocked}
         <br>
         unMember: ${element.unMember}
         <br>
         timezones: ${element.timezones}  
         <br>
         
         car side: ${element.car.side}  
         <br>
         <br>
         <p class="float-end">If you want to get more information click <a href="http://here">here</a></p>
         `;
      }
    });
  });
}
