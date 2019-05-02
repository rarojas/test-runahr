import * as passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import models from '../models';
import { Strategy as JWTstrategy } from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';

passport.use(
  'signup',
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true
    },
    async (req, username: string, password: string, done: Function) => {
      try {
        const User = models.user;
        const { email } = req.body;
        const user = await User.create({ username, password, email });
        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'username',
      passwordField: 'password'
    },
    async (username: string, password: string, done: Function) => {
      try {
        const User = models.user;
        const user = await User.findByLogin(username);

        if (!user) {
          return done(null, false, { message: 'User not found' });
        }
        const validate = await user.validPassword(password);
        if (validate) {
          return done(null, user, { message: 'Logged in Successfully' });
        }
        return done(null, false, { message: 'User or password incorrect' });
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.use(
  new JWTstrategy(
    {
      secretOrKey: 'top_secret',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    },
    async (token, done) => {
      try {        
        return done(null, token);
      } catch (error) {
        done(error);
      }
    }
  )
);
