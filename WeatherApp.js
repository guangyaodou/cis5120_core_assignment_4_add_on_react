const { useState } = React;

const weatherData = {
  temperatureF: 68,
  humidity: '60%',
  windSpeed: '12 km/h',
  uvIndex: 0,
};

const explanations = {
  humidity: 'Humidity measures the amount of moisture in the air.',
  wind: 'Wind speed is measured in km/h and affects weather conditions.',
  uv: 'A UV index of 0 means no risk of sunburn.',
};

function WeatherApp() {
  const [isFahrenheit, setIsFahrenheit] = useState(true);
  const [modules, setModules] = useState({
    humidity: false,
    wind: false,
    uv: false,
  });

  const toggleTemperature = () => {
    setIsFahrenheit(prev => !prev);
  };

  const toggleModule = (name) => {
    setModules(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const getTemperature = () => {
    if (isFahrenheit) return `${weatherData.temperatureF} °F`;
    const celsius = ((weatherData.temperatureF - 32) * 5 / 9).toFixed(2);
    return `${celsius} °C`;
  };

  return (
    <div className="container">
      <h2>Weather App</h2>

      <div className="toggle-container">
        <label>Temperature Unit:</label>
        <button onClick={toggleTemperature}>
          Switch to {isFahrenheit ? 'Celsius' : 'Fahrenheit'}
        </button>
      </div>

      <p>Temperature: {getTemperature()}</p>

      <h3>Customize Display</h3>
      <label>
        <input
          type="checkbox"
          checked={modules.humidity}
          onChange={() => toggleModule('humidity')}
        />
        Humidity
      </label><br />
      <label>
        <input
          type="checkbox"
          checked={modules.wind}
          onChange={() => toggleModule('wind')}
        />
        Wind Speed
      </label><br />
      <label>
        <input
          type="checkbox"
          checked={modules.uv}
          onChange={() => toggleModule('uv')}
        />
        UV Index
      </label>

      <div className="weather-info">
        {modules.humidity && (
          <p>
            Humidity: {weatherData.humidity}
            <span className="info-icon">⚠️
              <span className="tooltip">{explanations.humidity}</span>
            </span>
          </p>
        )}
        {modules.wind && (
          <p>
            Wind Speed: {weatherData.windSpeed}
            <span className="info-icon">⚠️
              <span className="tooltip">{explanations.wind}</span>
            </span>
          </p>
        )}
        {modules.uv && (
          <p>
            UV Index: {weatherData.uvIndex}
            <span className="info-icon">⚠️
              <span className="tooltip">{explanations.uv}</span>
            </span>
          </p>
        )}
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<WeatherApp />);
