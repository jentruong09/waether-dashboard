
// var API_KEY = "174c27157f74315bc7f7708bb00e7190";





// let weatherSearch = {
//     var fetchWeather = function(){
//         fetch("http://api.openweathermap.org/data/2.5/weather?q=new%20york&appid=174c27157f74315bc7f7708bb00e7190")
//         .then((response) = response.json())
//         .then((data) = console.log(data))
//     }
// }


// var


var API_KEY = "174c27157f74315bc7f7708bb00e7190";
var city = document.querySelector(".form-control")

var getWeather = function () {
    var apiURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + API_KEY;

    fetch(apiURL)
        .then(function(response){
            console.log(response)
            //return response.json();
        })
        //.then(function(data)){
           // console.log()
       // }

}