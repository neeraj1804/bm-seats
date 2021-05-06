import React from 'react';
import "./SeatStyle.css";

const Seat = (props) => {
  const classprop = props.data.isBooked ? "booked" : "available";
  const isSelected = props.isSelected === true ? "selected" : "";
  const isExist = props.data.isExist === false ? "seatNotExist" : "";
  let clickHandler = props.handleClick;
  if(props.data.isBooked) {
    clickHandler = null;
  }
  return (
    <div className={`seat ${classprop} ${isSelected} ${isExist}`} onClick={clickHandler}>{props.label}</div>
  );
}

export default Seat;