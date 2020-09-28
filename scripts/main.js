const selectingTheme = document.getElementById("theme-btn-dropdown");
const options = document.getElementById('opcion-wrapper');
const apiKey= 'iBYck0zigjzcwVSaEutjDQ2BQAm7po2I';
const url = 'https://api.giphy.com/v1/gifs/search?api_key=' + apiKey + '&q=goat&limit=4&offset=0&rating=G&lang=en';
const optionOne = document.createElement('button');
const optionTwo = document.createElement('button');
const optionThree = document.createElement('button');
const optionsContainer = document.createElement('div');
const retrievedStringsSection = document.createElement('div');
retrievedStringsSection.setAttribute('class', 'searchs-new-div');
const retrievedStrings = document.createElement('button');
const query = document.getElementById('search_value').value;

selectingTheme.addEventListener('click', ()=> {
  options.className= 'opcion_wrapper';
  document.getElementById('sailor_day').className='opcion';
  document.getElementById('sailor_night').className='opcion';
})
document.getElementById('sailor_day').addEventListener('click', ()=>{
  changeToDayMode();
  hidingThemeOptions();
})
document.getElementById('sailor_night').addEventListener('click', ()=>{
  changeToNightMode();
  hidingThemeOptions();
})

function changeToNightMode() {
  const element = document.body;
  element.classList.remove("day_mode");
  element.classList.add("night_mode");
}
function changeToDayMode() {
  const element = document.body;
  element.classList.remove("night_mode");
  element.classList.add("day_mode");
}
function hidingThemeOptions() {
  options.className= 'not_visible';
  document.getElementById('sailor_day').className='not_visible';
  document.getElementById('sailor_night').className='not_visible';
}

//Random Gifs
async function searchRandom() {
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
async function searchTrends() {
  const urlTrending = 'https://api.giphy.com/v1/gifs/trending?api_key=' + apiKey + '&limit=20&rating=G';
  const answer = await fetch(urlTrending);
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
function saveSearchedString() {
  const searchedStrings = [];
  const searchedString = document.getElementById('search_value').value;
  searchedStrings.push(searchedString);
  localStorage.setItem('input', JSON.stringify(searchedStrings));
  const retrievedString = JSON.parse(localStorage.getItem('input'));
  retrievedStrings.setAttribute('class', 'retrieved-searchs');
  retrievedStrings.setAttribute('id', 'retrieved_searchs');
  const lastItem = searchedStrings[searchedStrings.length -1];
  retrievedStrings.innerHTML = `#${lastItem}`;
  retrievedStringsSection.appendChild(retrievedStrings);
  document.getElementById('search_section').appendChild(retrievedStringsSection);
}

//

document.getElementById('search').addEventListener('click', displayingSearchResults);
document.getElementById('search').addEventListener('click', hidingElements);
function managingSearchBtn() {
  const input = document.getElementById('search_value')
  if (input.value != "") {
    document.getElementById('search').disable = true; // falta probar
  }
}

//

function displayingSearchResults() {
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
}
async function search() {
  const query = document.getElementById('search_value').value;
  const url = 'https://api.giphy.com/v1/gifs/search?api_key=' + apiKey + '&q='+ query +'&limit=20&offset=0&rating=G&lang=en';
  const answer = await fetch(url);
  const data = await answer.json();
  return data
}
retrievedStrings.addEventListener('click', scrollingToElement);
function scrollingToElement() {
  scrollToElement('.tend_text-box');
}
//predictivo comiezo
optionsContainer.setAttribute('class','hidden');
optionsContainer.setAttribute('id','options-container');
optionOne.setAttribute('class','hidden');
optionOne.setAttribute('id','option-one');
optionTwo.setAttribute('class','hidden');
optionTwo.setAttribute('id','option-two');
optionThree.setAttribute('class','hidden');
optionThree.setAttribute('id','option-three');
document.getElementById('search_section').appendChild(optionsContainer);
optionsContainer.appendChild(optionOne);
optionsContainer.appendChild(optionTwo);
optionsContainer.appendChild(optionThree);
function suggestSearch(){
  optionsContainer.className = "options_container";
  optionOne.className = "options_class";
  optionTwo.className = "options_class";
  optionThree.className = "options_class";
  optionOne.innerHTML = `funny ${document.getElementById("search_value").value}`;
  optionTwo.innerHTML = `cute ${document.getElementById("search_value").value}`;
  optionThree.innerHTML = `angry ${document.getElementById("search_value").value}`;
  if (document.getElementById("search_value").value == "") {
    hidingElements();
    }
}
optionOne.addEventListener("click",()=>{
  optionsContainer.className = "hidden";
  saveSearchedString();
  displayingSearchResults();
  search();
  scrollingToElement();
  optionsContainer.className = "hidden";
})
optionTwo.addEventListener("click",()=>{
  optionsContainer.className = "hidden";
  saveSearchedString();
  displayingSearchResults();
  search();
  scrollingToElement();
})
optionThree.addEventListener("click",()=>{
  optionsContainer.className = "hidden";
  saveSearchedString();
  displayingSearchResults();
  search();
  scrollingToElement();
})
//predictivo fin
function hidingElements(){
  optionsContainer.className = "hidden";
  optionOne.className = "hidden";
  optionTwo.className = "hidden";
  optionThree.className = "hidden";
}
document.getElementById('search_value').addEventListener("input",suggestSearch);
document.getElementById('search_value').addEventListener("keydown", (e) => {
    if (e.keyCode === 13) {
      saveSearchedString();
      displayingSearchResults();
      search();
      scrollingToElement();
      hidingElements();
    }
  });

