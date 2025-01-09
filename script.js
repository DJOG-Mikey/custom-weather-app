document.getElementById('get-weather').addEventListener('click', function() {
    const cityName = document.getElementById('city-input').value;
    if (!cityName) {
        alert('Please enter a city name');
        return;
    }

    const apiUrl = `/weather?city=${cityName}`;

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
