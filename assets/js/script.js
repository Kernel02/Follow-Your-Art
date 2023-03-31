//Global Variables
var apiUrl = "https://collectionapi.metmuseum.org/public/collection/v1/objects/search"


//Fetch Function
function apiRequest(apiUrl) {
    $.ajax({
        url: apiUrl,
        method: "Get"
    })
};
apiRequest(url).then(function(data) {

});



//Category Department Handler
//Loop Object
//Create Elements
//Append Child
//Display Art

//Event Listeners
var searchbuttonEl = document.querySelector('#search-button')
searchbuttonEl.addEventListener("click", searchHandler);

searchButton.on("click", searchHandler);
department.on("click", departmentHandler);











































































//searchHandler, fetch API, loop through object array
function searchHandler(event) {
    event.preventDefault();
          
    var artsearchEl = document.querySelector('#search-value-input');
    var artSearch = artsearchEl.value.trim();
    var searchApiUrl = "https://collectionapi.metmuseum.org/public/collection/v1/search?q=" + artSearch;
   
    fetch(searchApiUrl)
        .then(function(response) {
            if (!response.ok) {
            throw new Error("Network not ok");
            }
            return response.json();
            })
        .then(function(data) {
            console.log(data);
            checkData(data.objectIDs, artSearch);
            })
        .catch(function(error) {
            console.error("Error: ", error);
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

    //Limit results to 10
    // objectIDs = objectIDs.slice(0, 10);
    //Set artcontainerEl to empty string
    artcontainerEl.innerHTML = '';

    //Loop through objectIDs array
    for (var i = 0; i < 10; i++) {
        console.log(objectIDs[i].primaryImage);
    }
};





































