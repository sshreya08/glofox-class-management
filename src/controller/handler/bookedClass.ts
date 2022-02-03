import { Request, Response, NextFunction } from 'express';
import { BookedClassSlotsMock } from '../../mocks/bookedClassSlots';
import { randomBytes } from 'crypto';
import loggers from '../../lib/logger';

export const postCreateClassBookingRequestHandler = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const id = randomBytes(4).toString('hex');
  const { className, date } = request.body;

  // Validating against the request body
  if (!className || !date) {
    loggers.error(
      `[bookClass] book class failed with validation of request body`
    );
    throw new Error('params validation failed');
  }

  // Validating just against class found
  const validateBooking = (booking: string): boolean => {
    const classFound = BookedClassSlotsMock.find((element) => {
      loggers.error(`[BookedClass] create booking failed on class validation`);
      return element.name === booking;
    });
    return classFound && classFound.name ? false : true;
  };

  if (validateBooking(className)) {
    loggers.error(`[BookedClass] create booking failed on class validation`);
    throw new Error('unable to validate class');
  }

  loggers.info(`[bookClass] book class success`);
  response.status(200).send({ created: 'ok' });
};
