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
    const userId = req.body.userId;
    const clocking = await models.clocking.findOne({
      where: {
        userId: userId
      },
      limit: 1,
      order: [['time', 'DESC']]
    });
    if (clocking) {
      await models.clocking.create({
        time: new Date(),
        type: clocking.type.includes('IN') ? 'OUT' : 'IN',
        userId: userId
      });
    } else {
      await models.clocking.create({
        time: new Date(),
        type: 'IN',
        userId: userId
      });
    }
    res.json(clocking);
  }

  async getReport(req: express.Request, res: express.Response) {
    const user = req.user;
    const clockings = await models.clocking.findAll({
      where: {
        userId: user.id
      },
      limit: 50
    });
    res.json(clockings);
  }
}

export default ClockingController;
