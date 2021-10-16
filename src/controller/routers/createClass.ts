// import express from 'express';

import { Router } from 'express';

import {
  postCreateClassRequestHandler,
  getCreateClassRequestHandler,
} from '../handler/createClass';

const router = Router();

router.post('/', postCreateClassRequestHandler);

router.get('/', getCreateClassRequestHandler);

export default router;
