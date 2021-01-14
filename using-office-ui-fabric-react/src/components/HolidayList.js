import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import { DateTime } from 'luxon'

import {SIMULATION_RESPONSE, GetLocalHolidays} from '../utils/gameDetailsUtil'

const inputDate = "Thur Mar 11 2021 15:47:00 GMT-0800 (Pacific Standard Time)"

/**
 * https://stackoverflow.com/questions/53449406/write-to-a-text-or-json-file-in-react-with-node/53449590
 * Write json date to a JSON file in react with node
 * */
const handleSaveToPC = jsonData => {
    const fileData = JSON.stringify(jsonData);
    const blob = new Blob([fileData], {type: "text/plain"});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = 'filename.json';
    link.href = url;
    link.click();
  }

export const HolidayList = () => {
  const [query, setQuery] = useState('redux');

  const [{ data, isError }] = GetLocalHolidays({ holidays: [] }, inputDate);

  console.log('data: ', data)

//   handleSaveToPC(data)

  return (
    <Fragment>
        <input
          type="text"
          value={query}
          onChange={event => setQuery(event.target.value)}
        />
        <button type="submit">Search</button>

      {isError && <div>Request to the Calendarific Global Holidays API failed ...</div>}
        <div className="col">
        {/* <h1>{data.holidays[0].country.name} Local Holidays</h1> */}
        </div>
        <div>
        <ul>
            {data.holidays.map(item => (
              <li key={item.name}>
                <p>{item.date.iso} {item.name}</p>
                
              </li>
            ))}
          </ul>
        </div>
    
    </Fragment>
  )
}