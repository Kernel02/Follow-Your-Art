//Global Variables
const artSearchTermEl = document.querySelector('#art-search-term');
const artContainerEl = document.querySelector('#art-container');
const searchButtonEl = document.querySelector('#search-button');
console.log(searchButtonEl)
//Category Department Handler
//Create Elements
//Append Child
//Display Art
function pullArticles(data) {
    let department = data.department; console.log(department) 
    fetch("https://api.si.edu/openaccess/api/v1.0/content?id=ld1-1646149545906-1646150468379-0&api_key=faRECqFv2PqD8hhKffRGnJ7MIo3ZnYi42X5v7jla") 
        .then(function(response) { return response.json(); 
        })
        .then(function(newData) { console.log(newData.response) 
        }); 
}



















































































//searchHandler, fetch API, loop through object array
function searchHandler(event) {
    event.preventDefault();

    var artSearchEl = document.querySelector('#search-value-input');
    var artSearch = artSearchEl.value.trim();
    var searchApiUrl = "https://collectionapi.metmuseum.org/public/collection/v1/search?q=" + artSearch;

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
};

//Check objectIDs and display text on html elements
var fetchData = function (objectIDs, artSearch) {

    var artSearchtermEl = document.querySelector('#art-search-term');
    artSearchtermEl.textContent = artSearch;

    //Check to see if objectIDs exist from search
    var artContainerEl = document.querySelector('#art-container');

    if (!objectIDs || objectIDs.length === 0) {
        artContainerEl.textContent = "No art found.";
        return;
    }

    //Set artContainerEl to empty string
    artContainerEl.innerHTML = '';

    //Loop through objectIDs array
    for (var i = 0; i < 10; i++) {
        if (!objectIDs[i]) break;

        var objectApiUrl = ("https://collectionapi.metmuseum.org/public/collection/v1/objects/" + objectIDs[i]);

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
        var artCardEl = document.createElement('div');
        artCardEl.classList.add('art-image');

        var artInfoEl = document.createElement('h3');
        artInfoEl.classList.add('art-title');
        artInfoEl.textContent = data.title;


        //Create child to display under elements
        var artImageEl = document.createElement('img');
        artImageEl.setAttribute('src', data.primaryImage);
        artImageEl.setAttribute('alt', data.title);
        artImageEl.style.width = '200px';
        artCardEl.appendChild(artImageEl);
        artContainerEl.appendChild(artCardEl);
        artCardEl.appendChild(artInfoEl);
};

    //Event Listeners
    searchButtonEl.addEventListener("click", searchHandler);


















