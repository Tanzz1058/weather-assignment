import { useEffect, useState } from "react";
import "./App.css";
import Currency from "./Currency";
import Maps from "./Map";
import Weather from "./Weather";

function App() {
  const [userLat, setUserLat] = useState("");
  const [userLong, setUserLong] = useState("");

  useEffect(() => {
    //function to get user coords

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setUserLat(position.coords.latitude);
        setUserLong(position.coords.longitude);
        console.log(position.coords);
      }, showError);
    } else {
      alert("Geolocation not supported");
    }
  }, []);

  function showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        alert("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        alert("Location information is unavailable");
        break;
      case error.TIMEOUT:
        alert("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        alert("An unknown error occurred.");
        break;
    }
  }
  return (
    <div className="container">
      <div className="App row">
        <div className="col-lg-6 col-md-6 col-sm-12 p-2">
          <Weather userLat={userLat} userLong={userLong} />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12 p-2">
          <Maps userLat={userLat} userLong={userLong} />
          <Currency />
        </div>
      </div>
    </div>
  );
}

export default App;
