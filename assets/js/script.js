
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
var data;
//console.log(cityInput)


// Using one api to search via city to get lat and lon for second api that requires lat and lon for 7 day weather with uv
var getWeather = function () {
    var apiURL = "https://api.openweathermap.org/data/2.5/weather?q="+ searchCity + "&units=imperial&appid=" + API_KEY;
    
    fetch(apiURL)
        .then(function(response){
            console.log(response);
            return response.json();
        })
        .then(function(data){
            console.log(data)
        //    data[data.coord.lat] = lat
        //    data[data.coord.lon] = lon
            var lat = data.coord.lat
            var lon = data.coord.lon
            
           var uvURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + API_KEY;
            fetch(uvURL) 
                .then(function(response){
                    console.log(response);
                    return response.json();
                })
                .then(function(uvData){
                    console.log(uvData)
                    // Current Day weather grab from APIs
                    $(".current-city").empty(); // Empty outs whatever was previously in the tags
                    $(".current-city").append(data.name); // Then appends the new info
                    $(".current-date").empty();
                    $(".current-date").append(moment().format("dddd, MMMM Do"));
                    $(".current-temp").empty();
                    $(".current-temp").append("Temp: " + uvData.daily[0].temp.day + "°F");
                    $(".current-wind").empty();
                    $(".current-wind").append("Wind: " + uvData.daily[0].wind_speed + " MPH");
                    $(".current-humidity").empty()
                    $(".current-humidity").append("Humidity: " + uvData.daily[0].humidity + "%");
                    $(".current-uv").empty()
                    $(".current-uv").append("UV Index: " + uvData.daily[0].uvi);
                    
                    // Circle back to this Jen! For the little image to pop up!
                    // $(".current-icon").empty()
                    // var currentIcon = uvData.daily[0].weather[0].icon
                    // $("<img>").attr("href", "http://openweathermap.org/img/wn/" + currentIcon + "@2x.png") //try ${currentIcon}
                    // console.log(uvData.daily[0].weather[0].icon)


                    //Day 2 weather grab from APIs
                    $(".day2date").empty()
                    $(".day2date").append(moment().add(1, "days").format("dddd, MMMM Do"))
                    //<img></img> 
                    $(".day2temp").empty()
                    $(".day2temp").append("Temp: " + uvData.daily[1].temp.day + "°F");
                    $(".day2wind").empty()
                    $(".day2wind").append("Wind: " + uvData.daily[1].wind_speed + " MPH");
                    $(".day2humidity").empty()
                    $(".day2humidity").append("Humidity: " + uvData.daily[1].humidity + "%");
                    $(".day2uv").empty()
                    $(".day2uv").append("UV Index: " + uvData.daily[1].uvi);


                    //Day 3 weather grab from APIs
                    $(".day3date").empty()
                    $(".day3date").append(moment().add(2, "days").format("dddd, MMMM Do"))
                    //<img></img> 
                    $(".day3temp").empty()
                    $(".day3temp").append("Temp: " + uvData.daily[2].temp.day + "°F");
                    $(".day3wind").empty()
                    $(".day3wind").append("Wind: " + uvData.daily[2].wind_speed + " MPH");
                    $(".day3humidity").empty()
                    $(".day3humidity").append("Humidity: " + uvData.daily[2].humidity + "%");
                    $(".day3uv").empty()
                    $(".day3uv").append("UV Index: " + uvData.daily[2].uvi);


                    //Day 4 weather grab from APIs
                    $(".day4date").empty()
                    $(".day4date").append(moment().add(3, "days").format("dddd, MMMM Do"))
                    //<img></img> 
                    $(".day4temp").empty()
                    $(".day4temp").append("Temp: " + uvData.daily[3].temp.day + "°F");
                    $(".day4wind").empty()
                    $(".day4wind").append("Wind: " + uvData.daily[3].wind_speed + " MPH");
                    $(".day4humidity").empty()
                    $(".day4humidity").append("Humidity: " + uvData.daily[3].humidity + "%");
                    $(".day4uv").empty()
                    $(".day4uv").append("UV Index: " + uvData.daily[3].uvi);


                    //Day 5 weather grab from APIs
                    $(".day5date").empty()
                    $(".day5date").append(moment().add(4, "days").format("dddd, MMMM Do"))
                    //<img></img> 
                    $(".day5temp").empty()
                    $(".day5temp").append("Temp: " + uvData.daily[4].temp.day + "°F");
                    $(".day5wind").empty()
                    $(".day5wind").append("Wind: " + uvData.daily[4].wind_speed + " MPH");
                    $(".day5humidity").empty()
                    $(".day5humidity").append("Humidity: " + uvData.daily[4].humidity + "%");
                    $(".day5uv").empty()
                    $(".day5uv").append("UV Index: " + uvData.daily[4].uvi);


                    //Day 6 weather grab from APIs
                    $(".day6date").empty()
                    $(".day6date").append(moment().add(5, "days").format("dddd, MMMM Do"))
                    //<img></img> 
                    $(".day6temp").empty()
                    $(".day6temp").append("Temp: " + uvData.daily[5].temp.day + "°F");
                    $(".day6wind").empty()
                    $(".day6wind").append("Wind: " + uvData.daily[5].wind_speed + " MPH");
                    $(".day6humidity").empty()
                    $(".day6humidity").append("Humidity: " + uvData.daily[5].humidity + "%");
                    $(".day6uv").empty()
                    $(".day6uv").append("UV Index: " + uvData.daily[5].uvi);


                }) 
       }); 
       
}; console.log(getWeather)




var storeArray = [];

//Look into this, cannot get more than one to save
$('button').on("click", function(event){
    event.preventDefault();
    searchCity = $(".form-control").val().trim();
    getWeather();
    

    var searchContent = $(this).siblings("input").val();
    var storeArray =[];
    storeArray.push(searchContent)
    localStorage.setItem("storedCityName", JSON.stringify(storeArray))

    //Add new button
    var newButton = $("<button>")
    newButton.text(searchContent)
    newButton.addClass("btn btn-primary btn-lg btn-block")
    $("#searchHistory").append(newButton)
    $(".form-control").empty("")

    //getStoredItem()
});




// What to add
// UV Index - color for different serverities 
//search history to stay in local storage
//make the form empty out on it's own
//weather icon?



















// //Look into this
// function getStoredItem() {
//     $("#searchHistory").empty();
//     storeArray.forEach(function(city){
//         var everyCity = document.createElement("button")
//         $("#searchHistory").appendChild(storeArray)
//         console.log(storeArray)
//     })
// }



// var pastSearch = JSON.parse(localStorage.getItem("storedCityName"))
//     var showPastSearch = document.createElement("li")
//     showPastSearch.textContent = storedCityName[i]
//     $("list-group list-group-flush mb-3").append(showPastSearch)