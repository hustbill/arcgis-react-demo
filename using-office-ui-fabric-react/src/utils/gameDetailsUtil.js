import axios from 'axios'
import { DateTime } from 'luxon'

import {useEffect, useState} from 'react'
import {
  holidaysAPIKey,
  HOLIDAYS_API_URL,
  LOCATION
} from '../config/config'

//  fetch(`${HOLIDAYS_API_URL}?api_key=${holidaysAPIKey}&country=${country}&year=${year}&location=${location}`)
const location = LOCATION

export const GetLocalHolidays = (initialData, selectedDate) => {
  const [data, setData] = useState(initialData);
  
  const utcDateStr = (new Date(selectedDate)).toUTCString();
  const formattedDate = DateTime.fromHTTP(utcDateStr)
  console.log('formattedDate: ', formattedDate)

  const day = formattedDate.day
  const year = formattedDate.year
  const month = formattedDate.month
  const country = 'ye'
  const location = 'AST'
  // const query = 
  //   `${HOLIDAYS_API_URL}?api_key=${holidaysAPIKey}&country=${country}&year=${year}&location=${location}&month=${month}&day=${day}`
  const query = 
    `${HOLIDAYS_API_URL}?api_key=${holidaysAPIKey}&country=${country}&year=${year}&location=${location}`
    
  console.log('query: ', query)

  const [isError, setIsError] = useState(false);
 
  useEffect(() => {
    const fetchData = async () => {
      setIsError(false);
 
      try {
        const result = await axios.get(query);
        // const result = SIMULATION_RESPONSE
        console.log('result: ', result)
 
        setData(result.data.response);
      } catch (error) {
        setIsError(true);
      }
    };
 
    fetchData();
  }, [query]);
 
  return [{ data, isError }];
}

export const SIMULATION_RESPONSE = {
  "data": {
    "meta": {
      "code": 200
    },
    "response": {
      "holidays": [
        {
          "name": "May Day",
          "description": "Labor Day, or May Day, is a day off for workers in many countries around the world.",
          "country": {
            "id": "ye",
            "name": "Yemen"
          },
          "date": {
            "iso": "2021-05-01",
            "datetime": {
              "year": 2021,
              "month": 5,
              "day": 1
            }
          }
        }
      ]
    }
  }
}
