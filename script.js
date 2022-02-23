document.addEventListener('DOMContentLoaded', function (event) {

    //turn off all of the items
    document.querySelector('#main-plate').style.display='none';
    document.querySelector('#temp').style.display="none";

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

            //set current temp
            temp = document.querySelector('#temp');
            temp.style.display = "block";
            temp.innerHTML = `Current Temp: ${data["current"]["temp_f"]}°F / ${data["current"]["temp_c"]}°C`;
            
        });
    };

});