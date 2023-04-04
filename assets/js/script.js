//Global Variables
const artSearchTermEl = document.querySelector('#art-search-term');
const artContainerEl = document.querySelector('#art-container');

//Category Department Handler
//Create Elements
//Append Child
//Display Art






























































































//searchHandler, fetch API, loop through object array
function searchHandler(event) {
    event.preventDefault();

    var artSearchEl = document.querySelector('#search-value-input');
    var artSearch = artSearchEl.value.trim();
    var searchApiUrl = "https://collectionapi.metmuseum.org/public/collection/v1/search?q=" + artSearch;

    //Fetch user search for objectIDs to be passed to another endpoint
    fetch(searchApiUrl)
        .then(function (response) {
            if (!response.ok);
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            fetchData(data.objectIDs, artSearch);
            console.log(data.objectIDs);
        });
};

//Check objectIDs and display text on html elements
var fetchData = function (objectIDs, artSearch) {

    var artSearchtermEl = document.querySelector('#art-search-term');
    artSearchtermEl.textContent = artSearch;

    //Check to see if objectIDs exist from search
    var artcontainerEl = document.querySelector('#art-container');

    if (!objectIDs || objectIDs.length === 0) {
        artcontainerEl.textContent = "No art found.";
        return;
    }

    //Set artcontainerEl to empty string
    artcontainerEl.innerHTML = '';

    //Loop through objectIDs array
    for (var i = 0; i < 10; i++) {
        if (!objectIDs[i]) break;
        //Break
        // if (i = 10) break;

        var objectApiUrl = ("https://collectionapi.metmuseum.org/public/collection/v1/objects/" + objectIDs[i]);
        console.log(objectApiUrl);

        //Fetch data/property from endpoint and use user search from object[i] to search
        fetch(objectApiUrl)
            .then (function (response) {
                return response.json();
            })
            .then (function(data){
                createElement(data)
            });

    };
};

    //Create Elements
    function createElement(data) {
        console.log(data);
        var artcardEl = document.createElement('div');
        artcardEl.classList.add('art-image');

        var artinfoEl = document.createElement('h3');
        artinfoEl.classList.add('art-title');
        artinfoEl.textContent = data.title;


        //Create child to display under elements
        var artImageEl = document.createElement('img');
        artImageEl.setAttribute('src', data.primaryImage);
        artImageEl.setAttribute('alt', data.title);
        artImageEl.style.width = '200px';
        artcardEl.appendChild(artImageEl);
        artContainerEl.appendChild(artcardEl);
        artcardEl.appendChild(artinfoEl);

        
        
    };


    //Event Listeners
    var searchButtonEl = document.querySelector('#search-button');
    searchButtonEl.addEventListener("click", searchHandler);


















