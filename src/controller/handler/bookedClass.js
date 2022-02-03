"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postCreateClassBookingRequestHandler = void 0;
const bookedClassSlots_1 = require("../../mocks/bookedClassSlots");
const crypto_1 = require("crypto");
const logger_1 = __importDefault(require("../../lib/logger"));
const postCreateClassBookingRequestHandler = (request, response, next) => {
    const id = (0, crypto_1.randomBytes)(4).toString('hex');
    const { className, date } = request.body;
    // Validating against the request body
    if (!className || !date) {
        logger_1.default.error(`[bookClass] book class failed with validation of request body`);
        throw new Error('params validation failed');
    }
    // Validating just against class found
    const validateBooking = (booking) => {
        const classFound = bookedClassSlots_1.BookedClassSlotsMock.find((element) => {
            logger_1.default.error(`[BookedClass] create booking failed on class validation`);
            return element.name === booking;
        });
        return classFound && classFound.name ? false : true;
    };
    if (validateBooking(className)) {
        logger_1.default.error(`[BookedClass] create booking failed on class validation`);
        throw new Error('unable to validate class');
    }
    logger_1.default.info(`[bookClass] book class success`);
    response.status(200).send({ created: 'ok' });
};
exports.postCreateClassBookingRequestHandler = postCreateClassBookingRequestHandler;
