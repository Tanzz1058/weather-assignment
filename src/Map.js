import React, { useEffect } from "react";

function Maps(props) {
  let userInfo = {
    center: {
      lat: props.userLat,
      lng: props.userLong,
    },
    zoom: 10,
  };

  return (
    <div>
      {userInfo.center.lat && userInfo.center.lng ? (
        <img
          src={`https://maps.googleapis.com/maps/api/staticmap?center=${userInfo.center.lat},${userInfo.center.lng}&zoom=14&size=500x300&sensor=false&markers=color:red%7C${userInfo.center.lat},${userInfo.center.lng}&key=${process.env.REACT_APP_MAP_API}`}
        />
      ) : null}
    </div>
  );
}

export default Maps;
