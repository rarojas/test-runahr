import 'dotenv/config';
import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import db from './models';
import routes from './routes/routes';
import secureroutes from './routes/secureroutes';
import * as passport from 'passport';
import './auth/auth';

class App {
  app: express.Express = express();

  constructor() {
    this.config();
    this.configSequelize();
  }

  config() {
    this.app.use(cors());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use('/', routes);
    this.app.use(
      '/api',
      passport.authenticate('jwt', { session: false }),
      secureroutes
    );
    this.app.use((err, req, res, next) => {
      res.status(err.status || 500);
      if (err.errors) {
        res.json({ errors: err.errors });
      } else {
        res.json({ error: err.message });
      }
    });
  }

  configSequelize() {
    db.sequelize.sync({ force: false });
  }
}

export default new App().app;
