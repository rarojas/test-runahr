import * as express from 'express';
import AuthController from '../controllers/auth';

const router = express.Router();
const controller = new AuthController(router);

export default router;
