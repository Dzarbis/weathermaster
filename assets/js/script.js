// 17a3c0292f4ddf6ef6e1f99a55e19ef5

var search = function() {
    var citySearch = $("#citySearch").val().trim();
    var currentApi = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&Appid=17a3c0292f4ddf6ef6e1f99a55e19ef5&units=imperial";
    var forecastApi = "https://api.openweathermap.org/data/2.5/forecast?q=" + citySearch + "&Appid=17a3c0292f4ddf6ef6e1f99a55e19ef5&units=imperial";
    
    fetch(currentApi).then(function(response) {
        return response.json();
    })
    .then(function(response) {
        console.log(response);
        var location = document.querySelector("#location");
        var current = document.querySelector("#current");
        current.innerHTML = "";

        var temp = response.main.temp;
        var humidity = response.main.humidity;
        var windSpeed = response.wind.speed;

        var lon = response.coord.lon;
        var lat = response.coord.lat;
        var uvApi = "https://api.openweathermap.org/data/2.5/onecall?&lat=" + lat + "&lon=" + lon + "&Appid=17a3c0292f4ddf6ef6e1f99a55e19ef5";
        fetch(uvApi).then(function(response) {
            return response.json();
        })
        .then(function(response) {
            console.log(response);
            var uvIndex = response.current.uvi;

            var currentWeather = "Temperature: " + temp + "°F</br>" + "Humidity: " + humidity + "%</br>" + "Wind Speed: " + windSpeed + "mph</br>" + "UV Index: " + uvIndex;
            location.textContent = citySearch;
            current.innerHTML = currentWeather;
        })
    })
}