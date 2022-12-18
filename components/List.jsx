import React from 'react';
  
const ListItem1 = (props) => {
  return (
    <div >
      {/* <div>Id : {props.id}</div> */}
      <div>Value: {props.val}</div>
      <div>Field: {props.field}</div>
      <div>Time: {props.time}</div>
    </div>
  );
};
  
export default ListItem1;