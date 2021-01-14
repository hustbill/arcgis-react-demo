import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import { DateTime } from 'luxon'

import {SIMULATION_RESPONSE, useHolidayApi} from './components/gameDetailsUtil'


const inputDate = "Thur Mar 11 2021 15:47:00 GMT-0800 (Pacific Standard Time)"
// const inputDate = "Fri Mar 12 2021 15:47:00 GMT-0800 (Pacific Standard Time)"

const convertDateTimeObject = luxonDateTimeObject => {
  if (luxonDateTimeObject.toMillis !== undefined) {
    return new Date(luxonDateTimeObject.toMillis())
  } else if (luxonDateTimeObject) {
    return luxonDateTimeObject
  }
  return ''
}



function App() {
  const [query, setQuery] = useState('redux');
  const luxonDate = convertDateTimeObject(inputDate)
  const [{ data, isError }] = useHolidayApi({ holidays: [] }, luxonDate);

  console.log('data: ', data)
  console.log('luxonDate: ', luxonDate)

  const day = luxonDate.day
  const year = luxonDate.year
  const month = luxonDate.month
  console.log('day: ', day)
 
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
        <h1>Local Holidays</h1>
        <p>Here are local holidays!</p>
        <h1> {data.holidays[0] !== undefined && data.holidays[0].name}</h1>
        </div>
    
    </Fragment>
  );
}

export default App;