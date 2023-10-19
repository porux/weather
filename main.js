import { key } from './config.js';

const cityInput = document.getElementById('city-input');
const unitsSelect = document.getElementById('units-select');

function handleCityInput() {
    const selectedCity = cityInput.value;
    const selectedUnitKey = unitsSelect.value;
    
    if (selectedCity || selectedUnitKey) {
        
        fetchDataByName(selectedCity, selectedUnitKey, fetchWeatherData);   
    } else {
        console.log('Nincs város vagy egység kiválasztva.');
    }
}

function handleUnitsChange() {
    handleCityInput();
}

cityInput.addEventListener('input', handleCityInput);
unitsSelect.addEventListener('change', handleUnitsChange);

function fetchWeatherData(location, callback) {
    if (location) {
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&units=metric&appid=${key}`)
            .then(response => response.json())  
            .then(weather => {
                callback(weather);
            })
            .catch(error => {
                console.error('Error:', error);
            }); 
    }
}

function fetchDataByName(city, selectedUnitKey, callback) {
    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city},HU&limit=5&appid=${key}&units=${selectedUnitKey}`)
        .then(response => response.json())
        .then(weatherName => {
            callback(weatherName[0], processWeatherData);             
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    function processWeatherData(weather) {
        document.getElementById('city-name').innerHTML = weather.name;
        document.getElementById('celsius-min').innerHTML = `Minimum temperature: ${weather.main.temp_min} c°`;
        document.getElementById('celsius-max').innerHTML = `Maximum temperature: ${weather.main.temp_max} c°`;
        document.getElementById('actual-celsius').innerHTML = `Actual temperature: ${weather.main.temp} c°`;
    }
    
