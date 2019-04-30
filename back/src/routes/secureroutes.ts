import * as express from 'express';
import UserController from '../controllers/users';
import ClockingController from '../controllers/clocking';

const router = express.Router();

const userController = new UserController(router);
const clockingController = new ClockingController(router);

export default router;
