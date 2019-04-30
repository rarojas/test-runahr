import * as express from 'express';
import models from '../models';
import * as url from 'url';
import { Op } from 'sequelize';
import { checkRole } from '../auth/acl';

class UsersController {
  path = '/user';
  router: express.Router;

  constructor(router: express.Router) {
    this.path = '/user';
    this.router = router;
    this.initialize();
  }

  initialize() {
    this.router.get(this.path, checkRole('admin'), this.getUsers);
    this.router.post(this.path, checkRole('admin'), this.createUser);
    this.router.put(this.path, checkRole('admin'), this.updateUser);
    this.router.get(this.path + '/search', checkRole('admin'), this.searchUser);
  }

  async getUsers(req: express.Request, res: express.Response) {
    const users = await models.user.findAll();
    res.json(users);
  }

  async createUser(req: express.Request, res: express.Response) {
    const user = req.body;
    await models.user.create(user);
    res.sendStatus(201);
  }

  async updateUser(req: express.Request, res: express.Response) {
    const user = req.body;
    await models.user.update(user, {
      where: { id: user.id }
    });
    res.sendStatus(201);
  }

  async searchUser(req: express.Request, res: express.Response) {
    const url_parts = url.parse(req.url, true);
    const query = url_parts.query;

    const users = await models.user.findAll({
      where: {
        username: {
          [Op.like]: `%${query.search}%`
        }
      },
      limit: 10
    });
    res.json(users);
  }
}

export default UsersController;
