import moment from 'moment'

export function convertDateToText(date) {
    const moment_date = moment(date, "MM/DD/YYYY")
    let res_date = moment_date.format("ddd MMM DD")
    
    return res_date
  }
  