export const checkAuth = (req, res, next) => {
    if (req.session.userId === undefined || req.session.userId === null) {
      console.log('in checkAuth: NOT good');
      return res.redirect('/login');
    }
    console.log('in checkAuth: good');
    next();
  };
// export const attachUserToLocals = (req, res, next) => {
//   res.locals.userId = req.session.userId;
//   next();
// };
 