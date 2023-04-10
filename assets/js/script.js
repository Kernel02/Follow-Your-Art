//Global Variables
const previousSearchTermEl = document.querySelector("#previous-search-terms");
const artContainerEl = document.querySelector("#art-container");
const searchButtonEl = document.querySelector("#search-button");
var searchValueEl = document.querySelector("#search-value-input");
//Local Storage Array
let searchTerms = JSON.parse(localStorage.getItem("searches")) || [];

//Send a request to the Colormind API
function getPalette() {
  const url = "https://colormind.io/api/";
  const data = {
    model: "default",
  };
  const http = new XMLHttpRequest();

  http.onreadystatechange = function () {
    //Use the response, if it returns properly, to change the background and text colors(color scheme) of elements based on their class name
    if (http.readyState == 4 && http.status == 200) {
      const palette = JSON.parse(http.responseText).result;
      const color0 = document.querySelectorAll(".color-0");
      const color1 = document.querySelectorAll(".color-1");
      const color2 = document.querySelectorAll(".color-2");
      const color3 = document.querySelectorAll(".color-3");
      const color4 = document.querySelectorAll(".color-4");
      for (i = 0; i < color0.length; i++) {
        color0[i].style.backgroundColor = "rgb(" + palette[0].join() + ")";
      }
      for (i = 0; i < color1.length; i++) {
        color1[i].style.backgroundColor = "rgb(" + palette[1].join() + ")";
      }
      for (i = 0; i < color2.length; i++) {
        color2[i].style.color = "rgb(" + palette[2].join() + ")";
      }
      for (i = 0; i < color3.length; i++) {
        color3[i].style.backgroundColor = "rgb(" + palette[3].join() + ")";
      }
      for (i = 0; i < color4.length; i++) {
        color4[i].style.color = "rgb(" + palette[4].join() + ")";
      }
    }
  };

  http.open("POST", url, true);
  http.send(JSON.stringify(data));
}
//searchHandler, fetch API, loop through object array
function searchHandler(event) {
  event.preventDefault();

  const artSearchEl = document.querySelector("#search-value-input");
  const artSearch = artSearchEl.value.trim();
  const searchApiUrl =
    "https://collectionapi.metmuseum.org/public/collection/v1/search?q=" +
    artSearch;

  // Add search to the beginning of the searches array
  searchTerms.unshift(artSearch);

  // Save searches to local storage
  localStorage.setItem("searches", JSON.stringify(searchTerms));

  //Fetch user search for objectIDs to be passed to another endpoint
  fetch(searchApiUrl)
    .then(function (response) {
      if (!response.ok) {
        //return error response
        console.error(response);
      }
      return response.json();
    })
    .then(function (data) {
      fetchData(data.objectIDs, artSearch);
    });
}

//Check objectIDs and display text on html elements
function fetchData(objectIDs) {
  //Check to see if objectIDs exist from search
  if (!objectIDs || objectIDs.length === 0) {
    artContainerEl.textContent = "No art found.";
    return;
  }

  //Set artContainerEl to empty string
  artContainerEl.innerHTML = "";

  //Loop through objectIDs array
  for (let i = 0; i < 30; i++) {
    if (!objectIDs[i]) break;

    const objectApiUrl =
      "https://collectionapi.metmuseum.org/public/collection/v1/objects/" +
      objectIDs[i];

    //Fetch data/property from endpoint and use user search from object[i] to search
    fetch(objectApiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        createElements(data);
      })
      .then(function () {
        if (i === 29) {
          getPalette();
        }
      });
  }
}

//Create elements using the format for cards from the CSS framework, Bulma
function createElements(data) {
  //Create all of the elements required and give them the proper Bulma class names, as well as the classes to change colors based on the palette
  const cardDiv = document.createElement("div");
  cardDiv.classList.add(
    "card",
    "color-3",
    "is-flex",
    "is-flex-direction-column",
    "is-justify-content-center",
    "is-justify-content-space-evenly"
  );
  cardDiv.setAttribute("style", "max-width: fit-content; margin: 20px;");
  const cardHeader = document.createElement("header");
  cardHeader.classList.add("card-header", "color-3");
  const cardHeaderText = document.createElement("p");
  cardHeaderText.classList.add("card-header-title", "color-4");
  cardHeaderText.textContent = data.title;
  const cardImageDiv = document.createElement("div");
  cardImageDiv.classList.add("card-image", "color-3");
  const cardImageFigure = document.createElement("figure");
  cardImageFigure.classList.add("image", "is-4by3");
  const anchorContainer = document.createElement("a");
  anchorContainer.href = data.objectURL;
  const cardImage = document.createElement("img");
  if (data.primaryImage) {
    cardImage.src = data.primaryImage;
  } else {
    cardImage.src = "https://placehold.co/200x200?text=Image+failed+to+load.";
  }
  cardImage.alt = data.title;
  const cardContentDiv = document.createElement("div");
  cardContentDiv.classList.add("card-content", "color-3");
  const cardContent = document.createElement("div");
  cardContent.classList.add("content", "color-4");
  cardContent.textContent = "Art Department: " + data.department;

  //Append elements in proper order so that it matches the Bulma format
  cardHeader.appendChild(cardHeaderText);
  cardDiv.appendChild(cardHeader);
  anchorContainer.appendChild(cardImage);
  cardImageFigure.appendChild(anchorContainer);
  cardImageDiv.appendChild(cardImageFigure);
  cardDiv.appendChild(cardImageDiv);
  cardContentDiv.appendChild(cardContent);
  cardDiv.appendChild(cardContentDiv);
  artContainerEl.appendChild(cardDiv);
}

//For loop of localstorage search terms and create buttons
for (let x = 0; x < searchTerms.length; x++) {
  // Limit the number of searches to 3
  if (searchTerms.length > 3) {
    searchTerms.pop();
  }
  //Create buttons for previous searches
  const searchTermBtn = document.createElement("button");
  searchTermBtn.textContent = searchTerms[x];
  searchTermBtn.classList.add(
    "button",
    "previous-button",
    "is-small",
    "is-rounded",
    "color-4",
    "color-3"
  );
  previousSearchTermEl.appendChild(searchTermBtn);

  // Add click event listener to each button
  searchTermBtn.addEventListener("click", function () {
    // Set the value of the user form to the search term string
    const userInput = document.getElementById("search-value-input");
    userInput.value = searchTerms[x];
    const searchValueEl = document.querySelector("#search-value-input");
    searchValueEl.innerHTML = searchTerms[x];
    searchButtonEl.click();
    userInput.focus();
  });
}

// Add keyup event listener to searchValueEl
searchValueEl.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    searchButtonEl.click();
  }
});

//Event Listeners
searchButtonEl.addEventListener("click", searchHandler);
