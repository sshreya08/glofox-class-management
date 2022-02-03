import loggers from '../lib/logger';
import moment from 'moment';

const getvalidDate = (d) => {
  return new Date(d);
};

export const validateDateBetweenTwoDates = (fromDate, toDate, givenDate) => {
  loggers.info(`[validateDateBetweenTwoDates] validation`);

  // return (
  //   getvalidDate(givenDate) <= getvalidDate(toDate) &&
  //   getvalidDate(givenDate) >= getvalidDate(fromDate)
  // );

  return moment(getvalidDate(givenDate)).isBetween(
    getvalidDate(fromDate),
    getvalidDate(toDate)
  )
    ? true
    : false;
};
