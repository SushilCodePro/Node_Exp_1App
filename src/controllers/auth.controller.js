import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import { addUser, findUserByUsername, getUserIndex } from '../models/user.model.js';

export const homePage = (req, res) => {
  res.render('home');
};
export const renderLoginPage = (req, res) => {
  console.log('reder call');
  res.render('login', { error: null });
};

export const renderSignupPage = (req, res) => {
  res.render('signup', { errors: null });
};

export const signup = async (req, res) => {
  const errors = validationResult(req);
  console.log(`signup error: ${errors}`);
  if (!errors.isEmpty()) {
    return res.status(400).render('signup', { errors: errors.array() });
  }

  const { username, password } = req.body;
  console.log(`username: ${username},Password: ${password}`);
  try {
    const user = findUserByUsername(username);
    if (user) {
      return res.status(400).render('signup', { errors: [{ msg: 'Username already exists' }] });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    addUser(username, hashedPassword);
    res.redirect('/login');
  } catch (err) {
    res.status(500).send('Error signing up');
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = findUserByUsername(username);
    if (!user) {
      return res.status(400).render('login', { error: 'Invalid username or password' });
    }

    const match = await bcrypt.compare(password, user.passwordHash);
    if (match) {
      req.session.userId = getUserIndex(username);
      console.log(`sessionId: ${req.session.userId}`);
      res.redirect('/form');
    } else {
      res.status(400).render('login', { error: 'Invalid username or password' });
    }
  } catch (err) {
    res.status(500).send('Error logging in');
  }
};

export const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send('Error logging out');
    }
    res.redirect('/login');
  });
};
