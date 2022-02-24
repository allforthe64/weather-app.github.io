document.addEventListener('DOMContentLoaded', function (event) {

    //turn off all of the items
    document.querySelector('#main-plate').style.display='none';
    document.querySelector('.container').style.display="none";
    document.querySelector('img').style.display="none";

    //get the input field and wait for the user to push the enter key
    var textField = document.querySelector('input').addEventListener('keydown', function(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            var location = document.querySelector('input').value;
            getData(location);
        };
    });


    function getData(location) {
        location1 = location.charAt(0).toUpperCase();
        location = location1 + location.slice(1);
        fetch(`https://api.weatherapi.com/v1/forecast.json?key=2057077f9009456b8c830917222302&q=${location}`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            console.log(data["current"]["temp_f"]);

            clouds = [1006, 1003, 1009, 1030, 1135, 1147];
            maybeRain = [1063, 1069, 1072, 1087, 1150];
            rain = [1153, 1168, 1171, 1180, 1183, 1186, 1189, 1192, 1195, 1198, 1201, 1240, 1243, 1246];
            snow = [1066, 1114, 1117, 1204, 1207, 1210, 1213, 1216, 1219, 1222, 1225, 1237, 1249, 1252, 1255, 1258, 1261, 1264];
            thunder = [1273, 1276, 1279, 1282];

            //set plate to visible
            mainPlate = document.querySelector('#main-plate');
            mainPlate.style.display = 'block';
            document.querySelector('img').style.display="block";

            if (clouds.includes(data["current"]["condition"]["code"])) {
                document.querySelector('#pic').src = "119.png";
            } else if (data["current"]["condition"]["code"] == 1000) {
                document.querySelector('#pic').src = "113.png";
            } else if (maybeRain.includes(data["current"]["condition"]["code"])) {
                document.querySelector('#pic').src = "299.png";
            } else if (rain.includes(data["current"]["condition"]["code"])) {
                document.querySelector('#pic').src = "308.png";
            } else if (snow.includes(data["current"]["condition"]["code"])) {
                document.querySelector('#pic').src = "338.png";
            } else if (thunder.includes(data["current"]["condition"]["code"])) {
                document.querySelector('#pic').src = "389.png";
            }

            mainPlate.innerHTML = `Current Weather for ${location}:`;

            icon = document.querySelector('#icon');

            icon.innerHTML = data["current"]["condition"]["text"];
            
            //turn on the forecast container
            document.querySelector('.forecast')

            //set the min and max temperatures
            high = document.querySelector('#high');
            high.innerHTML = `Forecasted High: ${data["forecast"]["forecastday"]["0"]["day"]["maxtemp_f"]}°F / ${data["forecast"]["forecastday"]["0"]["day"]["maxtemp_c"]}°C`;

            low = document.querySelector('#low');
            low.innerHTML = `Forecasted Low: ${data["forecast"]["forecastday"]["0"]["day"]["mintemp_f"]}°F / ${data["forecast"]["forecastday"]["0"]["day"]["mintemp_c"]}°C`;

            //turn on the container
            document.querySelector('.container').style.display = "block";

            //set current temp
            temp = document.querySelector('#temp');
            temp.innerHTML = `Current Temp: ${data["current"]["temp_f"]}°F / ${data["current"]["temp_c"]}°C`;

            //set the feels like temperature
            feels = document.querySelector('#feels');
            feels.innerHTML = `Feels Like: ${data["current"]["feelslike_f"]}°F / ${data["current"]["feelslike_c"]}°C`;

            //set the wind speed
            wind = document.querySelector('#wind');
            wind.innerHTML = `Wind Speed: ${data["current"]["wind_mph"]}mph / ${data["current"]["wind_kph"]}kph`;
            
            //set the wind gust
            windGust = document.querySelector('#wind-gust');
            windGust.innerHTML = `Gust Speed: ${data["current"]["gust_mph"]}mph / ${data["current"]["gust_kph"]}kph`;

            //set the wind direction
            windDir = document.querySelector('#wind-dir');
            windDir.innerHTML = `Wind Direction: ${data["current"]["wind_dir"]}`;
        });
    };

});