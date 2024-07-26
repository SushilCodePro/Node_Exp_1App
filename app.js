
import express from 'express';
import path from 'path';
import session from 'express-session';
import authRouter from './src/routes/auth.routes.js';
import dataRouter from './src/routes/data.routes.js';
// import { attachUserToLocals } from './src/middleware/auth.middleware.js';

const app = express();
const __dirname = path.resolve();

// app.use(attachUserToLocals);
// Set up in-memory session storage
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: false
}));
console.log(`session.userID: ${session.userId}`);
// Middleware to make session data available in EJS templates
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});
// Set view engine
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, 'src', 'views'));

// Middleware to parse URL-encoded data (HTML form data)
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON data (API data)
app.use(express.json());

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'src', 'public', 'uploads')));

// Routes
app.use(authRouter);
app.use(dataRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
