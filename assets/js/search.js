var API_KEY = "ed5364c18831aa760172c5c93330a21e";

var searchCity=JSON.parse(localStorage.getItem("searchCity"))
getWeather(searchCity)
//searchCity = $("#place").val();
var data;

// Using one api to search via city to get lat and lon for second api that requires lat and lon for 7 day weather with uv
function getWeather(searchCity) {
    var apiURL = "https://api.openweathermap.org/data/2.5/weather?q="+ searchCity + "&units=imperial&appid=" + API_KEY;
    
    fetch(apiURL)
        .then(function(response){
            console.log(response);
            if (response.status === 404) {
                console.log("error")
                window.location.assign(href="searchError.html")
            } else {
                return response.json();
            }
        })
        .then(function(data){
            
        //    data[data.coord.lat] = lat
        //    data[data.coord.lon] = lon
            var lat = data.coord.lat
            var lon = data.coord.lon
            console.log(data)

           var uvURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + API_KEY;
            fetch(uvURL) 
                .then(function(response){
                    console.log(response);
                    return response.json();
                })
                .then(function(uvData){
                    console.log(uvData)


                    var image = uvData.daily[0].weather[0].icon
                    var city = data.name
                    var date = moment().format("dddd, MMMM Do")
                    var temp = uvData.daily[0].temp.day.toFixed()
                    var wind = uvData.daily[0].wind_speed.toFixed()
                    var humidity = uvData.daily[0].humidity
                    var uvIndex = uvData.daily[0].uvi
                    var description = uvData.daily[0].weather[0].description.split(" ")

                    for (let i = 0; i < description.length; i++) {
                        description[i] = description[i][0].toUpperCase() + description[i].substr(1);
                    }
                    
                    var newDescription = description.join(" ")
                    console.log(newDescription)

                    var high = uvData.daily[0].temp.max.toFixed()
                    var low = uvData.daily[0].temp.min.toFixed()
                    var feels = uvData.daily[0].feels_like.day.toFixed()
                    var pressure = uvData.daily[0].pressure //hPa
                    var rise = new Date(uvData.daily[0].sunrise*1000)
                    var sunrise = moment(rise).local().format('h:mm A')
                    console.log(sunrise)
                    var set = new Date(uvData.daily[0].sunset*1000)
                    var sunset = moment(set).local().format('h:mm A')
                    console.log(sunset)


                    $(`
                        <p class="today">Now</p>
                    <div class="card-body">
                            
                            <h1 class="temp" data-temp="${temp}">${temp}°F 
                            <img class="image" data-img=${image} src="http://openweathermap.org/img/wn/${image}@2x.png"">
                            </h1>
                            <p class="description" data-description"${newDescription}}">${newDescription}</p>
                            
                            <p class="date" data-date="${date}"><i class='bx bx-calendar-alt'></i> ${date}</p>
                            <p class="city" data-city="${city}"><i class='bx bx-location-plus'></i> ${city}</p>
                    </div>`).appendTo("#card1")

                    $(`
                        <p class="today">Today's Highlights</p>
                        <div class="continer flex-wrap justify-content-between">
                        <div class="card-group d-flex flex-wrap border-0 bg-dark">
                            <div class="card d-inline-flex border-0 bg-dark">
                                <div class="card-body highlight">
                                    <p class="title">Wind</p>
                                    <i class='bx bx-wind'></i>
                                    <p class="wind" data-wind="${wind}">${wind}MPH</p>
                                </div>
                            </div>

                            <div class="card d-inline-flex border-0 bg-dark">
                                <div class="card-body highlight">
                                    <p class="title">Humidity</p>
                                    <i class='bx bxs-flame' ></i>
                                    <p class="humidity" data-humidity="${humidity}">${humidity}%</p>
                                </div>
                            </div>

                            <div class="card d-inline-flex border-0 bg-dark">
                                <div class="card-body highlight">
                                    <p class="title">Highest</p>
                                    <i class='bx bx-chevrons-up'></i>
                                    <p class="high" data-high="${high}">${high}°F</p>
                                </div>
                            </div>

                            <div class="card d-inline-flex border-0 bg-dark">
                                <div class="card-body highlight">
                                    <p class="title">Lowest</p>
                                    <i class='bx bx-chevrons-down' ></i>
                                    <p class="low" data-low="${low}">${low}°F</p>
                                </div>
                            </div>
                        </div>
                        </div>
                        <div class="continer flex-wrap justify-content-between">
                        <div class="card-group border-0 bg-dark">
                            <div class="card d-inline-flex border-0 bg-dark">
                                <div class="card-body highlight">
                                    <p class="title">Sunrise</p>
                                    <i class='bx bx-sun' ></i>
                                    <p class="sunrise" data-sunrise="${sunrise}">${sunrise}</p>
                                </div>
                            </div>

                            <div class="card d-inline-flex border-0 bg-dark">
                                <div class="card-body highlight">
                                    <p class="title">Sunset</p>
                                    <i class='bx bx-moon' ></i>
                                    <p class="sunrise" data-sunrise="${sunset}">${sunset}</p>
                                </div>
                            </div>

                            <div class="card d-inline-flex border-0 bg-dark">
                                <div class="card-body highlight">
                                    <p class="title">Pressure</p>
                                    <i class='bx bx-line-chart' ></i>
                                    <p class="pressure" data-pressure="${pressure}">${pressure} hPa</p>
                                </div>
                            </div>

                            <div class="card d-inline-flex border-0 bg-dark">
                                <div class="card-body highlight">
                                    <p class="title">Feels</p>
                                    <i class='bx bxs-hand'></i>
                                    <p class="feels" feels="${feels}">${feels}°F</p>
                                </div>
                            </div>
                        </div>
                        </div>
                    `).appendTo("#card2")

                    $(".card-headers").show()
                    $("#card2").show()

                    // hourly forecast
                    for (let i = 1; i <14; i++) {
                    var day = new Date(uvData.hourly[i].dt*1000)
                    var hour = moment(day).local().format('h A')
                    var hourlyTemp = uvData.hourly[i].temp.toFixed()
                    var hourlyImage = uvData.hourly[i].weather[0].icon

                        $(`
                            <div class="card border-0 bg-dark" id="hourlycard">
                                <div class="card-body" >
                                    <p class="hour" data-hour="${hour}">${hour}</p>
                                    <img class="hourlyImage" data-image="${hourlyImage}"src="http://openweathermap.org/img/wn/${hourlyImage}@2x.png"> 
                                    <p class="hourlyTemp" data-temp="${hourlyTemp}">${hourlyTemp}°F</p>
                                </div>
                             </div>
                        `).appendTo("#hourlyForecast")

                    }

                    
                    // <p class="uvIndex" data-unIndex"${uvIndex}">UV Index:${uvIndex}</p>
                    
                    for (let i = 1; i < uvData.daily.length; i++) {
                    var image = uvData.daily[i].weather[0].icon
                    var date = moment().add(i, "days").format("dddd, MMMM Do")
                    var temp = uvData.daily[i].temp.day.toFixed()
                    var wind = uvData.daily[i].wind_speed.toFixed()
                    var humidity = uvData.daily[i].humidity

                    $(`
                    <div class="card border-0 bg-dark dailyWeather">
                        <div class="card-body">
                            <p class="date" data-date="${date}">${date}</p>
                            <img class="image" data-img=${image} src="http://openweathermap.org/img/wn/${image}@2x.png"> 
                            <p class="temp" data-temp="${temp}">${temp}°F</p>
                            <p class="wind" data-wind="${wind}">Wind: ${wind}MPH</p>
                            <p class="humidity" data-humidity="${humidity}">Humidity: ${humidity}%</p>
                        </div>
                    </div>`).appendTo("#weeklyForecast")
                }


                } 
                
            )
       } 
       ); 
       
} 



var storeArray = [];

// clicking the search button will store info and get weather 
$('.search').on("click", function(event){
    event.preventDefault();
    
    $("#card1").empty()
    $("#card2").empty()
    $("#hourlyForecast").empty()
    $("#weeklyForecast").empty()
    //searchCity = $("#place").val();
    localStorage.setItem("searchCity",JSON.stringify(searchCity))
    // creates a the location for the api to know which city the user wants
    searchCity = $(".form-control").val().trim();
    // empty search bar
    $("#place").val('')
    getWeather(searchCity);

    
    // var searchContent = $(this).siblings("input").val();
    // storeArray.push(searchCity),
    // localStorage.setItem("storedCityName", JSON.stringify(storeArray));
    // console.log(storeArray)

    // to create new button after click
    // var newButton = $("<button>")
    // newButton.text(searchCity)
    // newButton.addClass("btn btn-primary btn-lg btn-block")
    // newButton.attr("id","new-button")
    // $("#searchHistory").append(newButton)
});

// Creating the buttons for previous searches
// var oldCities = JSON.parse(localStorage.getItem("storedCityName"));
// console.log(oldCities)

// for (var i = 0; i < oldCities.length; i++) {
//     var newButton = $("<button>")
//     newButton.addClass("saved-city btn btn-primary btn-lg btn-block card-old")
//     newButton.attr("id","new-button")
//     newButton.text(oldCities[i])
//     newButton.val(oldCities[i])
//     $("#searchHistory").append(newButton)
        
// }


// // To get previous searches to pull data - not sure how to make this work
// $('.saved-city').on("click", function(event){
//     event.preventDefault();
//     var history = $(this).val()
//     console.log(history)
    
//     var apiURL = "https://api.openweathermap.org/data/2.5/weather?q="+ history + "&units=imperial&appid=" + API_KEY;
    
//     fetch(apiURL)
//         .then(function(response){
//             console.log(response);
//             return response.json();
//         })
//         .then(function(data){
//             console.log(data)
//         //    data[data.coord.lat] = lat
//         //    data[data.coord.lon] = lon
//             var lat = data.coord.lat
//             var lon = data.coord.lon
            
//            var uvURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + API_KEY;
//             fetch(uvURL) 
//                 .then(function(response){
//                     console.log(response);
//                     return response.json();
//                 })
//                 .then(function(uvData){
//                     console.log(uvData)
//                     // Current Day weather grab from APIs
//                     $(".current-city").empty(); // Empty outs whatever was previously in the tags
//                     $(".current-city").append(data.name); // Then appends the new info
//                     $(".current-date").empty();
//                     $(".current-date").append(moment().format("dddd, MMMM Do"));
//                     $(".current-temp").empty();
//                     $(".current-temp").append("Temp: " + uvData.daily[0].temp.day + "°F");
//                     $(".current-wind").empty();
//                     $(".current-wind").append("Wind: " + uvData.daily[0].wind_speed + " MPH");
//                     $(".current-humidity").empty()
//                     $(".current-humidity").append("Humidity: " + uvData.daily[0].humidity + "%");
//                     $(".current-uv").empty()
//                     $(".current-uv").append("UV Index: " + uvData.daily[0].uvi);
                    
//                     // //For image to pop up for Day 1
//                     $(".current-image").empty()
//                     $(".current-image").attr("src", "http://openweathermap.org/img/wn/" + uvData.daily[0].weather[0].icon+ "@2x.png") //try ${currentIcon}
//                     console.log(uvData.daily[0].weather[0].icon)

//                     $(".current-uv").removeClass("favorable")
//                     $(".current-uv").removeClass("moderate")
//                     $(".current-uv").removeClass("severe")
//                     //Color coding the UV Index for Day 1
//                     //$(".current-uv").removeAttr("style")
//                     $(".current-uv").each(function(){
//                         if (uvData.daily[0].uvi <= 2.99) {
//                             $(this).addClass("favorable")
//                         }
//                         else if (uvData.daily[0].uvi >= 3 && uvData.daily[0].uvi <= 5.99) {
//                             $(this).addClass("moderate")
//                         }
//                         else if (uvData.daily[0].uvi >= 6) {
//                             $(this).addClass("severe")
//                         }
//                     })



//                     //Day 2 weather grab from APIs
//                     $(".day2date").empty()
//                     $(".day2date").append(moment().add(1, "days").format("dddd, MMMM Do"))
//                     $(".day2temp").empty()
//                     $(".day2temp").append("Temp: " + uvData.daily[1].temp.day + "°F");
//                     $(".day2wind").empty()
//                     $(".day2wind").append("Wind: " + uvData.daily[1].wind_speed + " MPH");
//                     $(".day2humidity").empty()
//                     $(".day2humidity").append("Humidity: " + uvData.daily[1].humidity + "%");
//                     $(".day2uv").empty()
//                     $(".day2uv").append("UV Index: " + uvData.daily[1].uvi);


//                     // //For image to pop up for Day 2
//                     $(".day2icon").empty()
//                     $(".day2icon").attr("src", "http://openweathermap.org/img/wn/" + uvData.daily[1].weather[0].icon + "@2x.png") 

//                     $(".day2uv").removeClass("favorable")
//                     $(".day2uv").removeClass("moderate")
//                     $(".day2uv").removeClass("severe")
//                     //Color coding the UV Index for Day 2
//                     $(".day2uv").each(function(){
//                         if (uvData.daily[1].uvi <= 2.99) {
//                             $(this).addClass("favorable")
//                         }
//                         else if (uvData.daily[1].uvi >= 3 && uvData.daily[1].uvi <= 5.99) {
//                             $(this).addClass("moderate")
//                         }
//                         else if (uvData.daily[1].uvi >= 6) {
//                             $(this).addClass("severe")
//                         }
//                     })


//                     //Day 3 weather grab from APIs
//                     $(".day3date").empty()
//                     $(".day3date").append(moment().add(2, "days").format("dddd, MMMM Do"))
//                     //<img></img> 
//                     $(".day3temp").empty()
//                     $(".day3temp").append("Temp: " + uvData.daily[2].temp.day + "°F");
//                     $(".day3wind").empty()
//                     $(".day3wind").append("Wind: " + uvData.daily[2].wind_speed + " MPH");
//                     $(".day3humidity").empty()
//                     $(".day3humidity").append("Humidity: " + uvData.daily[2].humidity + "%");
//                     $(".day3uv").empty()
//                     $(".day3uv").append("UV Index: " + uvData.daily[2].uvi);


//                     // //For image to pop up for Day 3
//                     $(".day3icon").empty()
//                     $(".day3icon").attr("src", "http://openweathermap.org/img/wn/" + uvData.daily[2].weather[0].icon + "@2x.png")

//                     $(".day3uv").removeClass("favorable")
//                     $(".day3uv").removeClass("moderate")
//                     $(".day3uv").removeClass("severe")
//                     //Color coding the UV Index for Day 3
//                     $(".day3uv").each(function(){
//                         if (uvData.daily[2].uvi <= 2.99) {
//                             $(this).addClass("favorable")
//                         }
//                         else if (uvData.daily[2].uvi >= 3 && uvData.daily[2].uvi <= 5.99) {
//                             $(this).addClass("moderate")
//                         }
//                         if (uvData.daily[2].uvi >= 6) {
//                             $(this).addClass("severe")
//                         }
//                     })


//                     //Day 4 weather grab from APIs
//                     $(".day4date").empty()
//                     $(".day4date").append(moment().add(3, "days").format("dddd, MMMM Do"))
//                     //<img></img> 
//                     $(".day4temp").empty()
//                     $(".day4temp").append("Temp: " + uvData.daily[3].temp.day + "°F");
//                     $(".day4wind").empty()
//                     $(".day4wind").append("Wind: " + uvData.daily[3].wind_speed + " MPH");
//                     $(".day4humidity").empty()
//                     $(".day4humidity").append("Humidity: " + uvData.daily[3].humidity + "%");
//                     $(".day4uv").empty()
//                     $(".day4uv").append("UV Index: " + uvData.daily[3].uvi);

//                     // //For image to pop up for Day 4
//                     $(".day4icon").empty()
//                     $(".day4icon").attr("src", "http://openweathermap.org/img/wn/" + uvData.daily[3].weather[0].icon + "@2x.png")

//                     $(".day4uv").removeClass("favorable")
//                     $(".day4uv").removeClass("moderate")
//                     $(".day4uv").removeClass("severe")
//                     //Color coding the UV Index for Day 4
//                     $(".day4uv").each(function(){
//                         if (uvData.daily[3].uvi <= 2.99) {
//                             $(this).addClass("favorable")
//                         }
//                         else if (uvData.daily[3].uvi >= 3 && uvData.daily[3].uvi <= 5.99) {
//                             $(this).addClass("moderate")
//                         }
//                         else if (uvData.daily[3].uvi >= 6) {
//                             $(this).addClass("severe")
//                         }
//                     })


//                     //Day 5 weather grab from APIs
//                     $(".day5date").empty()
//                     $(".day5date").append(moment().add(4, "days").format("dddd, MMMM Do"))
//                     //<img></img> 
//                     $(".day5temp").empty()
//                     $(".day5temp").append("Temp: " + uvData.daily[4].temp.day + "°F");
//                     $(".day5wind").empty()
//                     $(".day5wind").append("Wind: " + uvData.daily[4].wind_speed + " MPH");
//                     $(".day5humidity").empty()
//                     $(".day5humidity").append("Humidity: " + uvData.daily[4].humidity + "%");
//                     $(".day5uv").empty()
//                     $(".day5uv").append("UV Index: " + uvData.daily[4].uvi);

//                     // //For image to pop up for Day 5
//                     $(".day5icon").empty()
//                     $(".day5icon").attr("src", "http://openweathermap.org/img/wn/" + uvData.daily[4].weather[0].icon + "@2x.png")

//                     $(".day5uv").removeClass("favorable")
//                     $(".day5uv").removeClass("moderate")
//                     $(".day5uv").removeClass("severe")
//                     //Color coding the UV Index for Day 5
//                     $(".day5uv").each(function(){
//                         if (uvData.daily[4].uvi <= 2.99) {
//                             $(this).addClass("favorable")
//                         }
//                         else if (uvData.daily[4].uvi >= 3 && uvData.daily[4].uvi <= 5.99) {
//                             $(this).addClass("moderate")
//                         }
//                         else if (uvData.daily[4].uvi >= 6) {
//                             $(this).addClass("severe")
//                         }
//                     })


//                     //Day 6 weather grab from APIs
//                     $(".day6date").empty()
//                     $(".day6date").append(moment().add(5, "days").format("dddd, MMMM Do"))
//                     //<img></img> 
//                     $(".day6temp").empty()
//                     $(".day6temp").append("Temp: " + uvData.daily[5].temp.day + "°F");
//                     $(".day6wind").empty()
//                     $(".day6wind").append("Wind: " + uvData.daily[5].wind_speed + " MPH");
//                     $(".day6humidity").empty()
//                     $(".day6humidity").append("Humidity: " + uvData.daily[5].humidity + "%");
//                     $(".day6uv").empty()
//                     $(".day6uv").append("UV Index: " + uvData.daily[5].uvi);

//                     // //For image to pop up for Day 6
//                     $(".day6icon").empty()
//                     $(".day6icon").attr("src", "http://openweathermap.org/img/wn/" + uvData.daily[5].weather[0].icon + "@2x.png")
                    
//                     $(".day6uv").removeClass("favorable")
//                     $(".day6uv").removeClass("moderate")
//                     $(".day6uv").removeClass("severe")
//                     //Color coding the UV Index for Day 6
//                     $(".day6uv").each(function(){
//                         if (uvData.daily[5].uvi <= 2.99) {
//                             $(this).addClass("favorable")
//                         }
//                         else if (uvData.daily[5].uvi >= 3 && uvData.daily[5].uvi <= 5.99) {
//                             $(this).addClass("moderate")
//                         }
//                         else if (uvData.daily[5].uvi >= 6) {
//                             $(this).addClass("severe")
//                         }
//                     })


//                 }) 
//        }); 
       
// })




// What to add
// UV Index - color for different serverities 
//search history to stay in local storage
//make the form empty out on it's own
//weather icon?




