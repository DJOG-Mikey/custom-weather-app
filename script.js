document.getElementById('get-weather').addEventListener('click', function() {
    const cityName = document.getElementById('city-input').value;
    if (!cityName) {
        alert('Please enter a city name');
        return;
    }

    const apiKey = 'b434091a4492430b8be184229250901';  // Replace with your API key from WeatherAPI.com
    const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}&aqi=no`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert('City not found');
                return;
            }
            // Populate the weather info
            document.getElementById('city-name').textContent = data.location.name;
            document.getElementById('temperature').textContent = `Temperature: ${data.current.temp_c}°C`;
            document.getElementById('description').textContent = `Description: ${data.current.condition.text}`;
            document.getElementById('humidity').textContent = `Humidity: ${data.current.humidity}%`;
            document.getElementById('wind').textContent = `Wind Speed: ${data.current.wind_kph} km/h`;
            
            // Display map
            initMap(data.location.lat, data.location.lon);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Failed to load weather data');
        });
});

// Function to initialize map using Google Maps API
function initMap(lat, lon) {
    const map = new google.maps.Map(document.getElementById('weather-map'), {
        center: { lat: lat, lng: lon },
        zoom: 8,
    });

    new google.maps.Marker({
        position: { lat: lat, lng: lon },
        map: map,
        title: 'Weather Location'
    });
}
