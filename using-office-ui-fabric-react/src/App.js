import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import { DateTime } from 'luxon'

import {
  Stack
} from 'office-ui-fabric-react'


import {HolidayList} from './components/HolidayList'
import {HookForm} from './components/HookForm'
import {DropdownBasicExample} from './components/DataRangeDropdown'
import {DataRangeTextField} from './components/DateRangeTextField'

import {SIMULATION_RESPONSE, GetLocalHolidays} from './utils/gameDetailsUtil'

import {
  holidaysAPIKey,
  HOLIDAYS_API_URL
} from './config/config'


const inputDate = "Thur Mar 11 2021 15:47:00 GMT-0800 (Pacific Standard Time)"
// const inputDate = "Fri Mar 12 2021 15:47:00 GMT-0800 (Pacific Standard Time)"

function App() {
  const [query, setQuery] = useState('redux');

  const [{ data, isError }] = GetLocalHolidays({ holidays: [] }, inputDate);


  console.log('data: ', data)
  let missionDurationFromProps = undefined
  
  const [missionDuration, setMissionDuration] = useState(
    missionDurationFromProps,
  )

  return (
    <>
    <Stack>
      <Stack.Item>
        <HookForm/>
      </Stack.Item>
      <Stack.Item>
        <HolidayList/>
      </Stack.Item>
      <Stack.Item>
        <DataRangeTextField
           missionDuration={missionDuration}
           setMissionDuration={setMissionDuration}
        />
      </Stack.Item>
    </Stack>
    </>
  )
}

export default App;