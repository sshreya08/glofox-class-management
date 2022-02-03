"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateDateBetweenTwoDates = void 0;
const logger_1 = __importDefault(require("../lib/logger"));
const moment_1 = __importDefault(require("moment"));
const getvalidDate = (d) => {
    return new Date(d);
};
const validateDateBetweenTwoDates = (fromDate, toDate, givenDate) => {
    logger_1.default.info(`[validateDateBetweenTwoDates] validation`);
    // return (
    //   getvalidDate(givenDate) <= getvalidDate(toDate) &&
    //   getvalidDate(givenDate) >= getvalidDate(fromDate)
    // );
    return (0, moment_1.default)(getvalidDate(givenDate)).isBetween(getvalidDate(fromDate), getvalidDate(toDate))
        ? true
        : false;
};
exports.validateDateBetweenTwoDates = validateDateBetweenTwoDates;
