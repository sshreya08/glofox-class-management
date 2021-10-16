import { Request, Response, NextFunction } from 'express';
import { CreateClass } from '../../interfaces/createClass';
import { randomBytes } from 'crypto';
import loggers from '../../lib/logger';
import { validateDateBetweenTwoDates } from '../../utils/validateDates';

const inMemoryCreatedClassSlots: CreateClass[] = [];

export const postCreateClassRequestHandler = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const id = randomBytes(4).toString('hex');
  const { className, startDate, endDate, capacity } = request.body;
  loggers.info(JSON.stringify(inMemoryCreatedClassSlots));

  // Validating against the request body
  if (!className || !startDate || !endDate || !capacity) {
    loggers.error(
      `[createClass] create class failed with validation of request body`
    );
    throw new Error('params validation failed');
  }

  const foundClassEntry = inMemoryCreatedClassSlots.find(
    (oneClass) => oneClass.className === className
  );

  // Validating against the booked slots
  if (foundClassEntry && foundClassEntry.hasOwnProperty('className')) {
    const {
      className: bookedClassName,
      startDate: bookedStartDate,
      endDate: bookedEndDate,
    } = foundClassEntry;
    if (
      validateDateBetweenTwoDates(bookedStartDate, bookedEndDate, startDate) ||
      validateDateBetweenTwoDates(bookedStartDate, bookedEndDate, endDate)
    ) {
      loggers.error(
        `[CreateClass] create class booking failed on date validation`
      );
      throw new Error('date already occupied');
    }
  }

  inMemoryCreatedClassSlots.push({
    id,
    className,
    startDate,
    endDate,
    capacity,
  });
  const bookings: CreateClass[] = [...inMemoryCreatedClassSlots];
  loggers.info(`[createClass] create class success`);
  response.status(200).send({ created: 'ok' });
};

export const getCreateClassRequestHandler = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const bookings: CreateClass[] = [...inMemoryCreatedClassSlots];
  loggers.info(`[createClass] get class information`);
  response.status(200).send({ bookings });
};
