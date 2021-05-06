import React, {useState} from 'react';
import SeatSelection from './SeatSelection';

const data = {
  noOfColumns: 5,
  noOfSeats: 2,
  seatsLayout: [
    {
      id: 1,
      type: "Club",
      price: 236,
      seats: [[
        {
          isExist: true,
          isBooked: false
        },
        {
          isExist: true,
          isBooked: false
        },
        {
          isExist: true,
          isBooked: false
        },
        {
          isExist: true,
          isBooked: false
        },
        {
          isExist: true,
          isBooked: false
        }
      ]]
    },{
      id: 2,
      type: "Executive",
      price: 236,
      seats: [[
        {
          isExist: false,
          isBooked: false
        },
        {
          isExist: false,
          isBooked: true
        },
        {
          isExist: true,
          isBooked: false
        },
        {
          isExist: true,
          isBooked: true
        },
        {
          isExist: true,
          isBooked: false
        }
      ]]
    }
  ]
}


const SeatBooking = (props) => {
  const [selectedSeats, setSelectedSeats] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);

  const clickHandler = (event, rowLabel, columnIndex, seatTypeDataIndex, rowIndex) => {
    event.stopPropagation();
    const selectedSeatsCopy = {...selectedSeats};
    if(selectedSeats[`${rowLabel}${columnIndex}`] === true) {
      delete selectedSeatsCopy[`${rowLabel}${columnIndex}`];
    }else {
      selectedSeatsCopy[`${rowLabel}${columnIndex}`] = true;
      const curNoOfSeats = Object.keys(selectedSeatsCopy).length;
      const requiredSeats = data.noOfSeats-curNoOfSeats;
      if(curNoOfSeats < data.noOfSeats) {
        let isPossible = true;
        let leftChecked = false;
        if(columnIndex-requiredSeats > 0) {
          leftChecked = true;
          for(let i=columnIndex-requiredSeats-1;i<columnIndex-1;i++) {
            if(data.seatsLayout[seatTypeDataIndex].seats[rowIndex][i].isBooked === true || selectedSeats[`${rowLabel}${i+1}`]) {
              isPossible = false;
              break;
            }
          }
          if(isPossible) {
            for(let i=columnIndex-requiredSeats-1;i<columnIndex-1;i++) {
              selectedSeatsCopy[`${rowLabel}${i+1}`] = true;
            }
          }
        }
        if((!leftChecked || !isPossible) && (data.noOfColumns - columnIndex) > requiredSeats) {
          isPossible = true;
          for(let i=columnIndex;i<columnIndex+requiredSeats;i++) {
            if(data.seatsLayout[seatTypeDataIndex].seats[rowIndex][i].isBooked === true || selectedSeats[`${rowLabel}${i+1}`]) {
              isPossible = false;
              break;
            }
          }
          if(isPossible) {
            for(let i=columnIndex;i<columnIndex+requiredSeats;i++) {
              selectedSeatsCopy[`${rowLabel}${i+1}`] = true;
            }
          }
        }
      }
    }
    setSelectedSeats(selectedSeatsCopy);
  }

  return (
    <SeatSelection seatData={data} clickHandler={clickHandler} selectedSeats={selectedSeats} />
  );
};

export default SeatBooking;