import { Router } from 'express';
import passport from 'passport';
// import AuthController from '@/controllers/auth.controller';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

const router = Router();
const basePath = '/google';
// const authController = AuthController();

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
      console.log(profile);
      return done(null, profile);
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// GOOGLE LOGIN URL
router.get(
  `${basePath}`,
  passport.authenticate('google', {
    scope: ['openid', 'profile', 'email'],
  }),
);
// LOGIN SUCCESS
router.get(
  `${basePath}/callback`,
  passport.authenticate('google', { failureRedirect: `${basePath}/failure}`, successRedirect: '/integration/google' }),
);

export default router;

// router.get(`${basePath}/logout `, authController.logout);
// router.get(`${basePath}/failure`, authController.loginFailure);
// router.get(
//     `${basePath}/success`,
//     passport.authenticate('google', {
//       failureRedirect: '/integration/google',
//       successRedirect: '/integration/google/callback',
//     }),
//     (req, res) => {
//       console.log(res);
//       res.redirect('/integration/google/callback');
//     },
//   );
// router.get(`${basePath}/`, passport.authenticate('google', { scope: ['openid', 'profile', 'email'] }));
