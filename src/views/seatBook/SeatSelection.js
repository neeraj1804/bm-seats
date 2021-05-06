import React from 'react';
import Seat from './Seat';
import "./SeatSelectionStyle.css";


const SeatSelection = (props) => {
  let rowCount = -1;
  return (
    <div>
      {
        props.seatData.seatsLayout.map((seatTypeData, seatTypeDataIndex) => {
          
          return(
            <div key={seatTypeData.id}>
              <label>{seatTypeData.type}</label>
              <div>
                {
                  seatTypeData.seats.map((rowData, rowIndex) => {
                    rowCount++;
                    const rowLabel = String.fromCharCode(65+rowCount);
                    return (
                      <div key={rowLabel} className="row">
                        <label>{rowLabel}</label>
                        {
                          rowData.map((columnData, columnIndex) => {
                            return (
                              <Seat isSelected={props.selectedSeats[`${rowLabel}${columnIndex+1}`] === true ? true : false} label={columnIndex+1} data={columnData} key={`${rowLabel}-${columnIndex+1}`} handleClick={(event) => props.clickHandler(event, rowLabel, columnIndex+1, seatTypeDataIndex, rowIndex)} />
                            );
                          })
                        }
                      </div>
                    );
                  })
                }
              </div>
            </div>
          );
        })
      }
    </div>
    
  );
}

/*
<div className="seatRow">
      <Seat isBooked={false} label="1" />
      <Seat isBooked={false} label="2" />
    </div>
*/

export default SeatSelection;