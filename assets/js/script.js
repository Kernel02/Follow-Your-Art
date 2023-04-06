//Global Variables
const artSearchTermEl = document.querySelector('#art-search-term');
const artContainerEl = document.querySelector('#art-container');
const searchButtonEl = document.querySelector('#search-button');
//Category Department Handler

let url = "http://colormind.io/api/";
let data = {
	model : "default",
}

let http = new XMLHttpRequest();

http.onreadystatechange = function() {
	if(http.readyState == 4 && http.status == 200) {
		let palette = JSON.parse(http.responseText).result;
        let colorShiftEls = document.querySelectorAll(".color");
        console.log(colorShiftEls);
        for (i=0; i<colorShiftEls.length; i++) {
            colorShiftEls[i].style.backgroundColor = "rgb(" + palette[0].join() + ")";
            colorShiftEls[i].style.color = "rgb(" + palette[2].join() + ")"
        }
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
        artInfoEl.classList.add("color")

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


















