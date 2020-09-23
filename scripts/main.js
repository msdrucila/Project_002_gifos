// Select theme function
const selectingTheme = document.getElementById("select_theme");
const list = document.getElementById("list");
//Giphy Data
const apiKey= 'iBYck0zigjzcwVSaEutjDQ2BQAm7po2I';

selectingTheme.addEventListener("change", (event) => {
  console.log(selectingTheme.value);
  if(selectingTheme.value == "sailor_night"){
    changeToNightMode();
  }
  else if(selectingTheme.value == "sailor_day"){
    changeToDayMode();
  }else{
    alert("Elegi una opcion");
    changeToDayMode();
  }
});
function changeToNightMode() {
  let element = document.body;
  element.classList.remove("day_mode");
  element.classList.add("night_mode");
}
function changeToDayMode() {
  let element = document.body;
  element.classList.remove("night_mode");
  element.classList.add("day_mode");
}

//Random Gifs
async function searchRandom() {
  const url = 'https://api.giphy.com/v1/gifs/search?api_key=' + apiKey + '&q=goat&limit=4&offset=0&rating=G&lang=en';
  const answer = await fetch(url);
  const rdata = await answer.json();
  return rdata
}
const randoms = searchRandom();
randoms.then(function(resp) {
  const container = document.getElementById('suggestions_boxes');
  const newRandomDiv = document.createElement('div');
  newRandomDiv.setAttribute('class', 'images-container');
  newRandomDiv.setAttribute('id', 'div-selector');
  resp.data.forEach (gif => {
      const figure = document.createElement("figure");
      const img = document.createElement("img");
      const title = document.createElement("figcaption");
      const button = document.createElement('button');
      figure.setAttribute('class', 'sugg_figures');
      title.setAttribute('class', 'sugg_img_title');
      title.innerHTML = ('#' + gif.title);
      img.setAttribute("src", gif.images.fixed_height_downsampled.url);
      img.setAttribute('class', 'sugg_img');
      img.setAttribute('alt', gif.title);
      button.setAttribute('class', 'blue_btns');
      button.setAttribute('id', 'blue-btns');
      button.innerText="More..."
      button.addEventListener('click',()=>{
        scrollToElement('.tend_text-box');
      })
      container.appendChild(newRandomDiv);
      newRandomDiv.appendChild(figure);
      figure.appendChild(title);
      figure.appendChild(img);
      figure.appendChild(button);
  });
});
//Trends
async function searchTrends() {
  const url = 'https://api.giphy.com/v1/gifs/trending?api_key=' + apiKey + '&limit=20&rating=G';
  const answer = await fetch(url);
  const data = await answer.json();
  return data
}
const trends = searchTrends();
trends.then(function(resp) {
  const container = document.getElementById('tendencies_boxes');
  const newTrendDiv = document.createElement('div');
  newTrendDiv.setAttribute('class', 'images-container');
  newTrendDiv.setAttribute('id', 'div-selector');
  resp.data.forEach(gif => {
      const figure = document.createElement("figure");
      const img = document.createElement("img");
      const title = document.createElement("figcaption");
      img.setAttribute("id", 'trend-img');
      img.setAttribute("src", gif.images.fixed_height_downsampled.url);
      title.setAttribute('class', 'gif-tend-title');
      title.setAttribute('id', 'gif-title');
      title.innerHTML = gif.title;
      container.appendChild(newTrendDiv);
      newTrendDiv.appendChild(figure);
      figure.appendChild(img);
      figure.appendChild(title);
  });
});
document.getElementById('my-gifs-btn').addEventListener('click', () => {
  window.location.href = "createGuifos_day.html";
  scrollToElement('.my_guifos_result');
})
document.getElementById('create_guifos_btn').addEventListener('click', () => {
  window.location.href = "createGuifos_day.html";
})

function scrollToElement(name) {
  const elementPosition = document.querySelector(name).getBoundingClientRect();
  window.scrollBy(0, elementPosition.y);
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('search').addEventListener('click', saveSearchedString);
  document.getElementById('search').addEventListener('click', () => {
    scrollToElement('.tend_text-box');
  })
});

// crear div en el que se guardarán los botones creados a partir de las busquedas realizadas
let retrievedStringsSection = document.createElement('div');
retrievedStringsSection.setAttribute('class', 'searchs-new-div');
//función que guarda en el localstorage todos los valores que se ingresan en el input 
let searchedStrings = [];

let retrievedStrings = document.createElement('button');


const saveSearchedString = (ev) => {
  ev.preventDefault();
  let searchedString = document.getElementById('search_value').value;
  searchedStrings.push(searchedString);
  localStorage.setItem('input', JSON.stringify(searchedStrings));
  // Recuperando los datos del localStorage
  let retrievedString = JSON.parse(localStorage.getItem('input'));
  //creating elements
  retrievedStrings.setAttribute('class', 'retrieved-searchs');
  retrievedStrings.setAttribute('id', 'retrieved_searchs');

  const lastItem = searchedStrings[searchedStrings.length -1];
  retrievedStrings.innerHTML = `#${lastItem}`;  

  retrievedStringsSection.appendChild(retrievedStrings);
  document.getElementById('search_section').appendChild(retrievedStringsSection);  
}
//Predictivo
const predictiveText= JSON.parse(localStorage.getItem('input'));
//Busqueda input
let query = document.getElementById('search_value').value;
document.getElementById('search').addEventListener('click', () => {
  console.log(query);
  const mainQuery = search();
  mainQuery.then(function(resp) {
  console.log(resp);
  const container = document.getElementById('tendencies_boxes');
  const newTrendDiv = document.createElement('div');
  newTrendDiv.setAttribute('class', 'images-container');
  newTrendDiv.setAttribute('id', 'div-selector');
  container.innerHTML = "";
  resp.data.forEach (gif => {
      //const img = document.getElementById("trend-img");
      //const title = document.getElementById('gif-title');
      const figure = document.createElement("figure");
      const img = document.createElement("img");
      const title = document.createElement("figcaption");
      img.setAttribute("id", 'trend-img');
      img.setAttribute("src", gif.images.fixed_height_downsampled.url);
      title.setAttribute('class', 'gif-tend-title');
      title.setAttribute('id', 'gif-title');
      title.innerHTML = gif.title;
      container.appendChild(newTrendDiv);
      newTrendDiv.appendChild(figure);
      figure.appendChild(img);
      figure.appendChild(title);
    });
});
});
async function search() {
  const query = document.getElementById('search_value').value;
  const url = 'https://api.giphy.com/v1/gifs/search?api_key=' + apiKey + '&q='+ query +'&limit=20&offset=0&rating=G&lang=en';
  const answer = await fetch(url);
  const data = await answer.json();
  return data
}
// botones azules funcionales
retrievedStrings.addEventListener('click', ()=>{
  scrollToElement('.tend_text-box');
})
