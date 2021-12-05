import axios from "axios";
import { useEffect, useState } from "react";

export default function Weather(props) {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [data, setData] = useState([]);
  const [showData, setShowData] = useState(false);

  const date = new Date().toDateString();

  useEffect(() => {
    if (props.userLong && props.userLat) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${props.userLat}&lon=${props.userLong}&appid=${process.env.REACT_APP_WEATHER_API}`
        )
        .then((r) => {
          console.log(r);
          setCity(r.data.city.name);
          setCountry(r.data.city.country);
        })
        .catch((e) => {
          alert(e.message);
        });
    }
  }, [props.userLat, props.userLong]);

  useEffect(() => {
    if (props.userLat && props.userLong) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5//onecall?lat=${props.userLat}&lon=${props.userLong}&appid=${process.env.REACT_APP_WEATHER_API}&exclude=hourly,minutely`
        )
        .then((r) => {
          console.log(r.data.daily);
          // setCity(r.data.city.name);
          // setCountry(r.data.city.country);
          setData(r.data.daily);
        })
        .catch((e) => {
          alert(e.message);
        });
    }
  }, [props.userLat, props.userLong]);

  return (
    <div className="row align-items-center justify-content-between">
      <h3 className="red">{date}</h3>
      <h1>
        {city},{country}
      </h1>

      {data.length > 0 && (
        <h1>
          <img
            alt="icon"
            src={`http://openweathermap.org/img/wn/${data[0].weather[0].icon}@2x.png`}
          />
          {(data[0].temp.day - 273.15).toFixed(1)}°C
        </h1>
      )}
      <button className="forecast-btn" onClick={() => setShowData(!showData)}>
        Next 3 days forecast
      </button>
      <div className="weather-table-container pt-4 pb-4">
        {data.length > 0 &&
          showData &&
          data.slice(0, 3).map((res) => (
            <div className="row d-flex align-items-center" key={res.dt}>
              <div className="col-4">
                {new Date(res.dt * 1000).toDateString().slice(0, 10)}
              </div>
              <div className="col-4">
                <img
                  alt="icon"
                  src={`http://openweathermap.org/img/wn/${res.weather[0].icon}.png`}
                />
                {(res.temp.max - 273.15).toFixed(1)}/
                {(res.temp.min - 273.15).toFixed(1)}°C
              </div>
              <div className="col-4">{res.weather[0].description}</div>
            </div>
          ))}
      </div>
    </div>
  );
}
