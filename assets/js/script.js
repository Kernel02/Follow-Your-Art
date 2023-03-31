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

//Create Elements
//Append Child
//Display Art
//Event Listeners
searchButton.on("click", searchHandler);
department.on("click", departmentHandler);











































































//Search Handler: API request, input value to fetch request, display the request
function searchHandler(event) {
    event.preventDefault();
    
    var artsearchEl = document.querySelector('#search-value-input');
    var artSearch = artsearchEl.value.trim();

    //Fetch API with a query parameter and user search terms when pressing submit button
    apiRequest(apiUrl + '?q=' + artSearch)
        .then(function (reponse) {
            if (reponse.ok) {
                reponse.json().then(function (data){
                    console.log(data.objectIDs);
                    //If response is ok, then we will call on the checkData variable that is another function
                    checkData(data, artSearch);
                })} else {
                    alert('Error: ' + reponse.statusText);
                }
            });
        };

//objectIDs is property of the data object when pulled from the API. Data and artSearch parameter gets passed down from the .then function to checkData function
var checkData = function (data, artSearch) {
    //artSearch is user search input that will have text content shown on the art-search-term html element
    var artSearchtermEl = document.querySelector('#art-search-term');
    artSearchtermEl.textContent = artSearch;
    
    //Checking to see if objectIDs exist, if no results found, return comment of "No art found" into the artcontainer html element
    var artcontainerEl = document.querySelector('#art-container');
    var objectIDs = data.objectIDs;
    if (!objectIDs || objectIDs.length === 0) {
        artcontainerEl.textContent = "No art found.";
        return;
    }

    //Limit to 10 results when fetching from data.objectIDs using user search input
    objectIDs = objectIDs.slice(0, 10);
    //Set artcontainerEl to empty string to erase any comments
    artcontainerEl.innerHTML = '';

    //Loop through data.objectIDs array
    for (var i = 0; i < data.objectIDs.length; i++) {
        console.log(data.objectIDs[i]);
    }
}





































