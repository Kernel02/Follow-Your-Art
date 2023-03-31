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
//Loop ObjectIDs
//Create Elements
//Append Child
//Display Art
//Event Listeners
searchButton.on("click", searchHandler);
department.on("click", departmentHandler);











































































//Search Handler: API request, input value to fetch request, display the request
function searchHandler(event) {
    event.preventDefault();

    var artSearch = artSearchEl.value.trim();

    apiRequest(apiUrl + '?q=' + artSearch);
    console.log(apiRequest);
  
  }

apiRequest(apiUrl + '?q=' + artSearch);
console.log(apiUrl + '?q=' + artSearch);





































