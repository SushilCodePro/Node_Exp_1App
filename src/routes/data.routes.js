// // src/routes/data.routes.js

import express from 'express';
import { renderForm, uploadData, displayData } from '../controllers/data.controller.js';
import upload from '../middleware/upload.middleware.js';
import { checkAuth } from '../middleware/auth.middleware.js';

const router = express.Router();

console.log(`In DataRoutes checkAuth:${checkAuth}`);
// console.log('In DataRoutes');
router.get('/form', checkAuth, renderForm);
router.post('/upload', checkAuth, upload.single('image'), uploadData);
router.get('/display', checkAuth, displayData);

export default router;
