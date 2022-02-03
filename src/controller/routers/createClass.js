"use strict";
// import express from 'express';
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const createClass_1 = require("../handler/createClass");
const router = (0, express_1.Router)();
router.post('/', createClass_1.postCreateClassRequestHandler);
router.get('/', createClass_1.getCreateClassRequestHandler);
exports.default = router;
