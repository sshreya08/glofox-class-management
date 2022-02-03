"use strict";
// import express from 'express';
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bookedClass_1 = require("../handler/bookedClass");
const router = (0, express_1.Router)();
router.post('/', bookedClass_1.postCreateClassBookingRequestHandler);
exports.default = router;
