//Global Variables
const artSearchTermEl = document.querySelector('#art-search-term');
const artContainerEl = document.querySelector('#art-container');
const searchButtonEl = document.querySelector('#search-button');
//Category Department Handler
//Create Elements
//Append Child
//Display Art
// function fetchColorScheme() {
//     fetch("https://www.thecolorapi.com/scheme?rgb=rgb(50,50,50)&count=6") 
//         .then(function(response) {     
//             return response.json(); 
//         })
//         .then(function(data) {   
//             console.log(data)
//             let colorR = data.colors[5].rgb.r
//             let colorG = data.colors[5].rgb.g
//             let colorB = data.colors[5].rgb.b
//             let fullColor = "rgb(" + colorR + ", " + colorG + ", " + colorB + ")"
//             console.log(fullColor)
//             let colorShiftEl = document.getElementById("color");
//             // colorShiftEl.setAttribute("style", "background-color:" + fullColor)
//             colorShiftEl.style.backgroundColor = fullColor
//         }); 
// }
var url = "http://colormind.io/api/";
var data = {
	model : "default",
}

var http = new XMLHttpRequest();

http.onreadystatechange = function() {
	if(http.readyState == 4 && http.status == 200) {
		var palette = JSON.parse(http.responseText).result;
        console.log(palette[0].join())
        console.log(palette[1].join());
        let colorShiftEl = document.getElementById("color");
        console.log(palette[0][0])
        colorShiftEl.style.backgroundColor = "rgb(" + palette[0].join() + ")";
        colorShiftEl.style.color = "rgb(" + palette[2].join() + ")"
	}
}

http.open("POST", url, true);
http.send(JSON.stringify(data));


















































































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
        var artCardEl = document.createElement('div');
        artCardEl.classList.add('art-image');

        var artInfoEl = document.createElement('h3');
        artInfoEl.classList.add('art-title');
        artInfoEl.textContent = data.title;


        //Create child to display under elements
        let artAnchor = document.createElement("a");
        artAnchor.setAttribute("href", data.objectURL);
        var artImageEl = document.createElement('img');
        artImageEl.setAttribute('src', data.primaryImage);
        artImageEl.setAttribute('alt', data.title);
        artImageEl.style.width = '200px';
        artAnchor.appendChild(artImageEl);
        artCardEl.appendChild(artAnchor);
        artContainerEl.appendChild(artCardEl);
        artCardEl.appendChild(artInfoEl);
};

    //Event Listeners
    searchButtonEl.addEventListener("click", searchHandler);


















