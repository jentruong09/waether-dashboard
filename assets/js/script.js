
// var API_KEY = "174c27157f74315bc7f7708bb00e7190";





// let weatherSearch = {
//     var fetchWeather = function(){
//         fetch("http://api.openweathermap.org/data/2.5/weather?q=new%20york&appid=174c27157f74315bc7f7708bb00e7190")
//         .then((response) = response.json())
//         .then((data) = console.log(data))
//     }
// }


// var

//get new api key?
var API_KEY = "ed5364c18831aa760172c5c93330a21e";
//var cityInput = document.querySelector(".form-control")
//var searchBtn = document.getElementById("#button-addon2")

searchCity = $(".form-control").val();
//console.log(cityInput)

var getWeather = function () {
    var apiURL = "http://api.openweathermap.org/data/2.5/weather?q="+ searchCity + "&units=imperial" +"&appid=" + API_KEY;

    fetch(apiURL)
        .then(function(response){
            console.log(response);
            return response.json();
        })
        .then(function(data){
           console.log(data)
        })
        
}; console.log(getWeather)



//Look into this, cannot get more than one to save
$('button').on("click", function(event){
    event.preventDefault();
    searchCity = $(".form-control").val().trim();
    getWeather();
    

    var searchContent = $(this).siblings("input").val();
    var storeArray = [];
    storeArray.push(searchContent)
    localStorage.setItem("storedCityName", JSON.stringify(storeArray))

    getStoredItem()
});

//Look into this
function getStoredItem() {
    var pastSearch = JSON.parse(localStorage.getItem("storedCityName"))
    var showPastSearch = document.createElement("li")
    showPastSearch.textContent = storedCityName[i]
    $("list-group list-group-flush mb-3").append(showPastSearch)


}