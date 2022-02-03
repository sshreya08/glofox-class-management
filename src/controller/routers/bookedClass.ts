// import express from 'express';

import { Router } from 'express';

import { postCreateClassBookingRequestHandler } from '../handler/bookedClass';

const router = Router();

router.post('/', postCreateClassBookingRequestHandler);

export default router;
