"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCreateClassRequestHandler = exports.postCreateClassRequestHandler = void 0;
const crypto_1 = require("crypto");
const logger_1 = __importDefault(require("../../lib/logger"));
const validateDates_1 = require("../../utils/validateDates");
const inMemoryCreatedClassSlots = [];
const postCreateClassRequestHandler = (request, response, next) => {
    const id = (0, crypto_1.randomBytes)(4).toString('hex');
    const { className, startDate, endDate, capacity } = request.body;
    logger_1.default.info(JSON.stringify(inMemoryCreatedClassSlots));
    // Validating against the request body
    if (!className || !startDate || !endDate || !capacity) {
        logger_1.default.error(`[createClass] create class failed with validation of request body`);
        throw new Error('params validation failed');
    }
    const foundClassEntry = inMemoryCreatedClassSlots.find((oneClass) => oneClass.className === className);
    // Validating against the booked slots
    if (foundClassEntry && foundClassEntry.hasOwnProperty('className')) {
        const { className: bookedClassName, startDate: bookedStartDate, endDate: bookedEndDate, } = foundClassEntry;
        if ((0, validateDates_1.validateDateBetweenTwoDates)(bookedStartDate, bookedEndDate, startDate) ||
            (0, validateDates_1.validateDateBetweenTwoDates)(bookedStartDate, bookedEndDate, endDate)) {
            logger_1.default.error(`[CreateClass] create class booking failed on date validation`);
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
    const bookings = [...inMemoryCreatedClassSlots];
    logger_1.default.info(`[createClass] create class success`);
    response.status(200).send({ created: 'ok' });
};
exports.postCreateClassRequestHandler = postCreateClassRequestHandler;
const getCreateClassRequestHandler = (request, response, next) => {
    const bookings = [...inMemoryCreatedClassSlots];
    logger_1.default.info(`[createClass] get class information`);
    response.status(200).send({ bookings });
};
exports.getCreateClassRequestHandler = getCreateClassRequestHandler;
