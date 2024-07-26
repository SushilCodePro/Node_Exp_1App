import express from 'express';
import {homePage, renderLoginPage, renderSignupPage, signup, login, logout } from '../controllers/auth.controller.js';
import { body } from 'express-validator'; 

const router = express.Router();

router.get('/', homePage);
router.get('/login', renderLoginPage);
router.get('/signup', renderSignupPage);

router.post('/signup',
  body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
  body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
  signup);

router.post('/login', login);
router.post('/logout', logout);

export default router;
