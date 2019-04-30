import * as express from 'express';
import * as passport from 'passport';
import * as jwt from 'jsonwebtoken';

class AuthController {
  router: express.Router;
  constructor(router: express.Router) {
    this.router = router;
    this.initialize();
  }

  initialize() {
    this.router.post(
      '/signup',
      passport.authenticate('signup', { session: false }),
      this.signup
    );
    this.router.post('/login', this.login);
  }

  async signup(req: express.Request, res: express.Response) {
    return res.json({
      message: 'Signup successful',
      //@ts-ignore
      user: req.user
    });
  }

  async login(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    passport.authenticate('login', async (err, user, info) => {
      try {
        if (err || !user) {
          const error = new Error('Username or Password incorrect');
          return next(error);
        }
        req.login(user, { session: false }, async error => {
          if (error) return next(error);
          const body = {
            id: user.id,
            email: user.email,
            username: user.username,
            role: user.role,
            isAdmin: user.role.includes('admin')
          };
          const token = jwt.sign(body, 'top_secret');
          return res.json({ token, user: body });
        });
      } catch (error) {
        return next(error);
      }
    })(req, res, next);
  }
}

export default AuthController;
