const { DateTime } = require('luxon')

const inputDate = "Thur Mar 11 2021 15:47:00 GMT-0800 (Pacific Standard Time)"

const convertDateTimeObject = luxonDateTimeObject => {
  if (luxonDateTimeObject.toMillis !== undefined) {
    return new Date(luxonDateTimeObject.toMillis())
  } else if (luxonDateTimeObject) {
    return luxonDateTimeObject
  }
  return ''
}


const convertThroughUTC = (inputDate) => {
    const utcDateStr = (new Date(inputDate)).toUTCString();
    console.log(utcDateStr)
    const formattedDate = DateTime.fromHTTP(utcDateStr)
    console.log('formattedDate', formattedDate)

    const day = formattedDate.day
    const year = formattedDate.year
    const month = formattedDate.month

    console.log('year, month, day: ', year, month, day)
}


convertThroughUTC(inputDate)

const formattedDate = convertDateTimeObject(inputDate)
console.log('formattedDate: ', formattedDate)
// formattedDate:  Thur Mar 11 2021 15:47:00 GMT-0800 (Pacific Standard Time)

const day = formattedDate.day
const year = formattedDate.year
const month = formattedDate.month

console.log('year, month, day: ', year, month, day)
