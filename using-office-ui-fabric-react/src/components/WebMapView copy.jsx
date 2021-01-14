import React from 'react';
import {DateTime} from 'luxon';
import {getLocalHolidays} from '../utils/gameDetailsUtil'

import {
  holidaysAPIKey,
  HOLIDAYS_API_URL
} from '../config/config'

export class WebMapView extends React.Component {
  constructor(props) {
    super(props);
    this.mapRef = React.createRef();
    this.state = {
      date: new Date(),
      error: null,
      isLoaded: false,
      holidays: []
    };
  }

  

  async componentDidMount() {

    const country = 'YE' // yemen 
    const year = '2021'
    const location = 'AST'

    const selectedDate = DateTime.local(2021, 3, 11)

    getLocalHolidays(country, location, selectedDate)
      .then((data) => {
        if (data.error) {
          this.setState({error: data.error})
        } else{
          this.setState({
            isLoaded: true,
            holidays: data.response.holidays || []
          })
        }
      })

  }

  componentWillUnmount() {
    if (this.view) {
      // destroy the map view
      this.view.destroy();
    }
  }

  render() {
  const holidays = this.state.holidays
    return (
        <div>
          <div className="col">
          <h1>Local Holidays</h1>
          <p>Here are local holidays!</p>
          {holidays.map(holiday => <div>{holiday.name}  </div>)}
        </div>
        </div>
    );
  }
}


// Ref: https://github.com/commenthol/date-holidays