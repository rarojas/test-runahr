import * as express from 'express';
import models from '../models';
import * as url from 'url';
import { Op } from 'sequelize';
import { checkRole } from '../auth/acl';
import { onlyAdmin } from '../auth/rules';

class UsersController {
  path = '/user';
  router: express.Router;

  constructor(router: express.Router) {
    this.path = '/user';
    this.router = router;
    this.initialize();
  }

  initialize() {
    this.router.get(this.path, onlyAdmin, this.getUsers);
    this.router.post(this.path, onlyAdmin, this.createUser);
    this.router.put(this.path, onlyAdmin, this.updateUser);
    this.router.get(this.path + '/search', onlyAdmin, this.searchUser);
  }

  async getUsers(req: express.Request, res: express.Response) {
    const users = await models.user.findAll();
    res.json(users);
  }

  async createUser(req: express.Request, res: express.Response) {
    let user = req.body;
    user = await models.user.create(user);
    res.status(201).json(user);
  }

  async updateUser(req: express.Request, res: express.Response) {
    const userData = req.body;
    let user = await models.user.findByPk(userData.id);
    user = await user.update(userData);
    res.json(user);
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
