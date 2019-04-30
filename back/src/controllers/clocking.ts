import * as express from 'express';
import models from '../models';
import { checkRole } from '../auth/acl';

class ClockingController {
  router: express.Router;
  path = '/clocking';

  constructor(router: express.Router) {
    this.router = router;
    this.initialize();
  }

  initialize() {
    this.router.post(this.path + '/check', checkRole('admin'), this.checkUser);
    this.router.get(this.path + '/me', this.getReport);
  }

  async checkUser(req: express.Request, res: express.Response) {
    //@ts-ignore
    const user = req.user;
    const clockings = await models.clocking.findAll({
      where: {
        userId: user.id
      },
      limit: 1
    });
    res.json(clockings);
  }

  async getReport(req: express.Request, res: express.Response) {}
}

export default ClockingController;
