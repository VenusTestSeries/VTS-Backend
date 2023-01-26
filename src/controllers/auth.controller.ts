import passport from 'passport';
import { NextFunction, Request, Response } from 'express';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI;

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_REDIRECT_URI,
      passReqToCallback: true,
    },
    function (req, accessToken, refreshToken, profile, done) {
      return done(null, profile);
    },
  ),
);

passport.serializeUser((user, done) => {
  console.log('serialize', user);
  done(null, user);
});

passport.deserializeUser((user, done) => {
  console.log('deserialize', user);
  done(null, user);
});

const AuthController = () => {
  const login = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('google', {
      scope: ['openid', 'profile', 'email'],
      successRedirect: '/api/google/success',
      failureRedirect: process.env.GOOGLE_REDIRECT_URI,
    })(req, res, next);
  };

  const loginSuccess = (req: Request, res: Response) => {
    if (req.user) {
      res.status(200).json({
        message: 'Login Successful',
        user: req.user,
      });
    } else {
      res.status(401).json({
        message: 'Login Failed',
      });
    }
  };

  // const loginFailure = (req: Request, res: Response) => {
  //   console.log(req.user);
  //   res.status(401).json({
  //     message: 'Login Failed',
  //   });
  // };

  // const logout = (req: Request, res: Response) => {
  //   // req.logout();
  //   res.status(200).json({
  //     message: 'Logout Successful',
  //   });
  // };

  return {
    login,
    // logout,
    loginSuccess,
    // loginFailure,
  };
};

export default AuthController;

// Google + Facebook
// Email + Password
// Whatsapp + SMS OTP
// function (accessToken, refreshToken, profile, done) {
//   return done(null, profile);
// },
// res.status(200).redirect('http://localhost:3000/integration/google');
