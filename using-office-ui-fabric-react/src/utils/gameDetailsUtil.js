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
        // const result = await axios.get(query);
        // console.log('result: ', result)
        // setData(result.data.response);
        const holidays = SIMULATION_RESPONSE
        setData(holidays)
      } catch (error) {
        setIsError(true);
      }
    };
 
    fetchData();
  }, [query]);
 
  return [{ data, isError }];
}

export const SIMULATION_RESPONSE = {
  "holidays": [
      {
          "name": "Isra and Mi'raj",
          "description": "Isra and Mi'raj (Isra Me'raj, Israa and Mi'raaj, Laylat Al-Isra wa Al-Miraj, Lailat al Miraj, Night Journey and Ascension to Heaven) marks the night that the Prophet Mohammad traveled from Mecca to Jerusalem, ascended to heaven and returned.",
          "country": {
              "id": "ye",
              "name": "Yemen"
          },
          "date": {
              "iso": "2021-03-11",
              "datetime": {
                  "year": 2021,
                  "month": 3,
                  "day": 11
              }
          },
          "type": [
              "Observance"
          ],
          "locations": "All",
          "states": "All"
      },
      {
          "name": "March Equinox",
          "description": "March Equinox in Yemen (Sana)",
          "country": {
              "id": "ye",
              "name": "Yemen"
          },
          "date": {
              "iso": "2021-03-20T12:37:30+03:00",
              "datetime": {
                  "year": 2021,
                  "month": 3,
                  "day": 20,
                  "hour": 12,
                  "minute": 37,
                  "second": 30
              },
              "timezone": {
                  "offset": "+03:00",
                  "zoneabb": "AST",
                  "zoneoffset": 10800,
                  "zonedst": 0,
                  "zonetotaloffset": 10800
              }
          },
          "type": [
              "Season"
          ],
          "locations": "All",
          "states": "All"
      },
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
          },
          "type": [
              "National holiday"
          ],
          "locations": "All",
          "states": "All"
      },
      {
          "name": "Eid al-Fitr holiday",
          "description": "Eid al-Fitr holiday is a public holiday in Yemen",
          "country": {
              "id": "ye",
              "name": "Yemen"
          },
          "date": {
              "iso": "2021-05-11",
              "datetime": {
                  "year": 2021,
                  "month": 5,
                  "day": 11
              }
          },
          "type": [
              "National holiday"
          ],
          "locations": "All",
          "states": "All"
      },
      {
          "name": "Eid al-Fitr Eve",
          "description": "Eid al-Fitr Eve is a public holiday in Yemen",
          "country": {
              "id": "ye",
              "name": "Yemen"
          },
          "date": {
              "iso": "2021-05-12",
              "datetime": {
                  "year": 2021,
                  "month": 5,
                  "day": 12
              }
          },
          "type": [
              "National holiday"
          ],
          "locations": "All",
          "states": "All"
      },
      {
          "name": "Eid al-Fitr",
          "description": "Eid-al-Fitr is a holiday to mark the end of the Islamic month of Ramadan, during which Muslims fast during the hours of daylight.",
          "country": {
              "id": "ye",
              "name": "Yemen"
          },
          "date": {
              "iso": "2021-05-13",
              "datetime": {
                  "year": 2021,
                  "month": 5,
                  "day": 13
              }
          },
          "type": [
              "National holiday"
          ],
          "locations": "All",
          "states": "All"
      },
      {
          "name": "Eid al-Fitr holiday",
          "description": "Eid al-Fitr holiday is a public holiday in Yemen",
          "country": {
              "id": "ye",
              "name": "Yemen"
          },
          "date": {
              "iso": "2021-05-14",
              "datetime": {
                  "year": 2021,
                  "month": 5,
                  "day": 14
              }
          },
          "type": [
              "National holiday"
          ],
          "locations": "All",
          "states": "All"
      },
      {
          "name": "Unity Day",
          "description": "Unity Day is a public holiday in Yemen",
          "country": {
              "id": "ye",
              "name": "Yemen"
          },
          "date": {
              "iso": "2021-05-22",
              "datetime": {
                  "year": 2021,
                  "month": 5,
                  "day": 22
              }
          },
          "type": [
              "National holiday"
          ],
          "locations": "All",
          "states": "All"
      },
      {
          "name": "June Solstice",
          "description": "June Solstice in Yemen (Sana)",
          "country": {
              "id": "ye",
              "name": "Yemen"
          },
          "date": {
              "iso": "2021-06-21T06:32:08+03:00",
              "datetime": {
                  "year": 2021,
                  "month": 6,
                  "day": 21,
                  "hour": 6,
                  "minute": 32,
                  "second": 8
              },
              "timezone": {
                  "offset": "+03:00",
                  "zoneabb": "AST",
                  "zoneoffset": 10800,
                  "zonedst": 0,
                  "zonetotaloffset": 10800
              }
          },
          "type": [
              "Season"
          ],
          "locations": "All",
          "states": "All"
      },
      {
          "name": "July 7th Anniversary",
          "description": "July 7th Anniversary is a observance in Yemen",
          "country": {
              "id": "ye",
              "name": "Yemen"
          },
          "date": {
              "iso": "2021-07-07",
              "datetime": {
                  "year": 2021,
                  "month": 7,
                  "day": 7
              }
          },
          "type": [
              "Observance"
          ],
          "locations": "All",
          "states": "All"
      },
      {
          "name": "Eid al-Adha Eve",
          "description": "Eid al-Adha Eve is a public holiday in Yemen",
          "country": {
              "id": "ye",
              "name": "Yemen"
          },
          "date": {
              "iso": "2021-07-19",
              "datetime": {
                  "year": 2021,
                  "month": 7,
                  "day": 19
              }
          },
          "type": [
              "National holiday"
          ],
          "locations": "All",
          "states": "All"
      },
      {
          "name": "Eid al-Adha",
          "description": "Eid al-Adha (Id ul-Adha) is an Islamic festival falling on the 10th day of the month of Dhul Hijja (Thou al-Hijja) to commemorate the willingness of Ibrahim (Abraham) to sacrifice his son.",
          "country": {
              "id": "ye",
              "name": "Yemen"
          },
          "date": {
              "iso": "2021-07-20",
              "datetime": {
                  "year": 2021,
                  "month": 7,
                  "day": 20
              }
          },
          "type": [
              "National holiday"
          ],
          "locations": "All",
          "states": "All"
      },
      {
          "name": "Eid al-Adha holiday",
          "description": "Eid al-Adha holiday is a public holiday in Yemen",
          "country": {
              "id": "ye",
              "name": "Yemen"
          },
          "date": {
              "iso": "2021-07-21",
              "datetime": {
                  "year": 2021,
                  "month": 7,
                  "day": 21
              }
          },
          "type": [
              "National holiday"
          ],
          "locations": "All",
          "states": "All"
      },
      {
          "name": "Eid al-Adha holiday",
          "description": "Eid al-Adha holiday is a public holiday in Yemen",
          "country": {
              "id": "ye",
              "name": "Yemen"
          },
          "date": {
              "iso": "2021-07-22",
              "datetime": {
                  "year": 2021,
                  "month": 7,
                  "day": 22
              }
          },
          "type": [
              "National holiday"
          ],
          "locations": "All",
          "states": "All"
      },
      {
          "name": "Eid al-Adha holiday",
          "description": "Eid al-Adha holiday is a public holiday in Yemen",
          "country": {
              "id": "ye",
              "name": "Yemen"
          },
          "date": {
              "iso": "2021-07-23",
              "datetime": {
                  "year": 2021,
                  "month": 7,
                  "day": 23
              }
          },
          "type": [
              "National holiday"
          ],
          "locations": "All",
          "states": "All"
      },
      {
          "name": "Muharram",
          "description": "Muharram is the first month of the Islamic calendar and a time of remembrance or mourning.",
          "country": {
              "id": "ye",
              "name": "Yemen"
          },
          "date": {
              "iso": "2021-08-10",
              "datetime": {
                  "year": 2021,
                  "month": 8,
                  "day": 10
              }
          },
          "type": [
              "National holiday"
          ],
          "locations": "All",
          "states": "All"
      },
      {
          "name": "September Equinox",
          "description": "September Equinox in Yemen (Sana)",
          "country": {
              "id": "ye",
              "name": "Yemen"
          },
          "date": {
              "iso": "2021-09-22T22:21:10+03:00",
              "datetime": {
                  "year": 2021,
                  "month": 9,
                  "day": 22,
                  "hour": 22,
                  "minute": 21,
                  "second": 10
              },
              "timezone": {
                  "offset": "+03:00",
                  "zoneabb": "AST",
                  "zoneoffset": 10800,
                  "zonedst": 0,
                  "zonetotaloffset": 10800
              }
          },
          "type": [
              "Season"
          ],
          "locations": "All",
          "states": "All"
      },
      {
          "name": "Revolution Day",
          "description": "Revolution Day is a public holiday in Yemen",
          "country": {
              "id": "ye",
              "name": "Yemen"
          },
          "date": {
              "iso": "2021-09-26",
              "datetime": {
                  "year": 2021,
                  "month": 9,
                  "day": 26
              }
          },
          "type": [
              "National holiday"
          ],
          "locations": "All",
          "states": "All"
      },
      {
          "name": "Liberation Day",
          "description": "Liberation Day is a public holiday in Yemen",
          "country": {
              "id": "ye",
              "name": "Yemen"
          },
          "date": {
              "iso": "2021-10-14",
              "datetime": {
                  "year": 2021,
                  "month": 10,
                  "day": 14
              }
          },
          "type": [
              "National holiday"
          ],
          "locations": "All",
          "states": "All"
      },
      {
          "name": "The Prophet's Birthday",
          "description": "Mawlid, or Milad, marks the birth of the Islamic prophet Muhammed, or Mohamed, in the year 570 of the Gregorian calendar.",
          "country": {
              "id": "ye",
              "name": "Yemen"
          },
          "date": {
              "iso": "2021-10-19",
              "datetime": {
                  "year": 2021,
                  "month": 10,
                  "day": 19
              }
          },
          "type": [
              "Observance"
          ],
          "locations": "All",
          "states": "All"
      },
      {
          "name": "Independence Day",
          "description": "Independence Day is a public holiday in Yemen",
          "country": {
              "id": "ye",
              "name": "Yemen"
          },
          "date": {
              "iso": "2021-11-30",
              "datetime": {
                  "year": 2021,
                  "month": 11,
                  "day": 30
              }
          },
          "type": [
              "National holiday"
          ],
          "locations": "All",
          "states": "All"
      },
      {
          "name": "December Solstice",
          "description": "December Solstice in Yemen (Sana)",
          "country": {
              "id": "ye",
              "name": "Yemen"
          },
          "date": {
              "iso": "2021-12-21T18:59:17+03:00",
              "datetime": {
                  "year": 2021,
                  "month": 12,
                  "day": 21,
                  "hour": 18,
                  "minute": 59,
                  "second": 17
              },
              "timezone": {
                  "offset": "+03:00",
                  "zoneabb": "AST",
                  "zoneoffset": 10800,
                  "zonedst": 0,
                  "zonetotaloffset": 10800
              }
          },
          "type": [
              "Season"
          ],
          "locations": "All",
          "states": "All"
      }
  ]
}