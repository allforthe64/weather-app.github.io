document.addEventListener('DOMContentLoaded', function (event) {

    //turn off all of the items
    document.querySelector('#main-plate').style.display='none';
    document.querySelector('.container').style.display="none";

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

            //set plate to visible
            mainPlate = document.querySelector('#main-plate');
            mainPlate.style.display = 'block';

            mainPlate.innerHTML = `Current Weather for ${location}:`;

            icon = document.querySelector('#icon');

            if (data["current"]["condition"]["code"] == "1009") {
                icon.innerHTML = "Condition: Overcast";
            } else if (data["current"]["condition"]["code"] == "1003") {
                icon.innerHTML = "Condition: Partially Cloud";
            } else if (data["current"]["condition"]["code"] == "1000") {
                icon.innerHTML = "Condition: Sunny";
            }

            //turn on the forecast container
            document.querySelector('.forecast')

            //set the min and max temperatures
            high = document.querySelector('#high');
            high.innerHTML = `Forecasted High: ${data["forecast"]["forecastday"]["0"]["day"]["maxtemp_f"]}°F / ${data["forecast"]["forecastday"]["0"]["day"]["maxtemp_c"]}°C`;

            low = document.querySelector('#low');
            low.innerHTML = `Forecasted High: ${data["forecast"]["forecastday"]["0"]["day"]["mintemp_f"]}°F / ${data["forecast"]["forecastday"]["0"]["day"]["mintemp_c"]}°C`;

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