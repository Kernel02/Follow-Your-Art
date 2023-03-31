function searchHandler() {

};
function departmentHandler() {

};
function apiRequest(apiUrl) {
    $.ajax({
        url: apiUrl,
        method: "Get"
    })
};
apiRequest(url).then(function(data) {

});
searchButton.on("click", searchHandler);
department.on("click", departmentHandler);