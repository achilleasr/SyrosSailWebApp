import React from 'react';
  
const ListItem2 = (props) => {
  return (
    <div >
      {/* <div>Id : {props.id}</div> */}
      <div>Lon: {props.lon} Lat: {props.lat}</div>
      <div>Time: {new Date(Date.parse(props.time)).toLocaleTimeString("it-IT")}</div>
    </div>
  );
};
  
export default ListItem2;