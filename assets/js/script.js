// search function on home page - to store search and re-route to search page
var searchCity = $("#place").val();
var searchButton = $("#searchButton")

searchButton.on('click',function(event){
    event.preventDefault();
    searchCity= $("#place").val();
    localStorage.setItem("searchCity",JSON.stringify(searchCity))
    console.log(searchCity)
    window.location.assign(href="search.html")
});