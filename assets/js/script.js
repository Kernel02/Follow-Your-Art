//Global Variables

//Category Department Handler
//Create Elements
//Append Child
//Display Art






























































































//searchHandler, fetch API, loop through object array
function searchHandler(event) {
    event.preventDefault();
          
    var artsearchEl = document.querySelector('#search-value-input');
    var artSearch = artsearchEl.value.trim();
    var searchApiUrl = "https://collectionapi.metmuseum.org/public/collection/v1/search?q=" + artSearch;
   
    //Fetch user search for objectIDs to be passed to another endpoint
    fetch(searchApiUrl)
        .then(function(response) {
            if (!response.ok)
            return response.json();
            })
        .then(function(data) {
            checkData(data.objectIDs, artSearch);
            });
};

//Check objectIDs and display text on html elements
var checkData = function (objectIDs, artSearch) {
    
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
        var objectApiUrl = ("https://collectionapi.metmuseum.org/public/collection/v1/objects/" + objectIDs[i]);

        //Fetch data/property from endpoint and use user search from object[i] to search
        fetch(objectApiUrl)
            .then (function (response) {
                return response.json();
            })
            .then (function(data){
                console.log(data);
            })
    };
};

//Event Listeners
var searchbuttonEl = document.querySelector('#search-button');
searchbuttonEl.addEventListener("click", searchHandler);

//































