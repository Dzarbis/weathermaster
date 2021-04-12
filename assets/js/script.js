var search = function() {
    var currentDate = moment().format("MM/DD/YYYY");
    var citySearch = $("#citySearch").val().trim();
    var currentApi = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&Appid=17a3c0292f4ddf6ef6e1f99a55e19ef5&units=imperial";
    var forecastApi = "https://api.openweathermap.org/data/2.5/forecast?q=" + citySearch + "&Appid=17a3c0292f4ddf6ef6e1f99a55e19ef5&units=imperial";
    
    fetch(currentApi).then(function(response) {
        return response.json();
    })
    .then(function(response) {
        var location = document.querySelector("#location");
        var current = document.querySelector("#current");
        var citySave = document.querySelector("#city-save");

        current.innerHTML = "";

        var temp = response.main.temp;
        var humidity = response.main.humidity;
        var windSpeed = response.wind.speed;
        var lon = response.coord.lon;
        var lat = response.coord.lat;
        var icon = response.weather[0].icon;
        var uvApi = "https://api.openweathermap.org/data/2.5/onecall?&lat=" + lat + "&lon=" + lon + "&Appid=17a3c0292f4ddf6ef6e1f99a55e19ef5";
        fetch(uvApi).then(function(response) {
            return response.json();
        })
        .then(function(response) {
            var uvIndex = response.current.uvi;

            var currentWeather = "Temperature: " + temp + "°F</br>" + "Humidity: " + humidity + "%</br>" + "Wind Speed: " + windSpeed + "mph</br>" + "UV Index: " + uvIndex;
            location.innerHTML = citySearch + "<img src='https://openweathermap.org/img/wn/" + icon + "@2x.png'></br>" + currentDate;
            current.innerHTML = currentWeather;
            
            var searched = document.createElement("li");
            searched.setAttribute("id", "searched");
            searched.setAttribute("class", "searched");
            searched.textContent = citySearch;
            citySave.appendChild(searched);
        })
    })

    fetch(forecastApi).then(function(response) {
        return response.json();
    })
    .then(function(response) {
        for (var i = 1; i < 6; i++) {
            var futureTemp = response.list[i].main.temp;
            var futureHumid = response.list[i].main.humidity;
            var futureWind = response.list[i].wind.speed;
            var futureIcon = response.list[i].weather[0].icon;
            var futureDate = moment().add(i, "day").format("MM/DD/YYYY");

            var fiveDay = document.querySelector("#fiveDay");
            var futureWeather = document.createElement("div");
            futureWeather.setAttribute("class", "bg-info");
            futureWeather.innerHTML = futureDate + ":<img src='https://openweathermap.org/img/wn/" + futureIcon + "@2x.png'></br>" + "Temperature: " + futureTemp + "°F</br>" + "Humidity: " + futureHumid + "%</br>" + "Wind Speed: " + futureWind + "mph";
            fiveDay.appendChild(futureWeather);
        }
    })
}